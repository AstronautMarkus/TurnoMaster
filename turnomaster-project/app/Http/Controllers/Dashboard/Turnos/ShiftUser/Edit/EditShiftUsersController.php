<?php

namespace App\Http\Controllers\Dashboard\Turnos\ShiftUser\Edit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift\ShiftUser;
use App\Models\Users\DashboardUser;
use App\Models\Turnos\Turnos;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class EditShiftUsersController extends Controller
{
    public function editShiftUser(Request $request, $id, $shiftUserId)
    {
        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $companyId = $decoded->company_id;

        $validator = \Validator::make($request->all(), [
            'days' => 'present|array',
            'is_active' => 'required|boolean',
        ], [
            'days.present' => 'El campo days debe estar presente (puede ser vacío).',
            'days.array' => 'El campo days debe ser un array.',
            'is_active.required' => 'El campo is_active es obligatorio.',
            'is_active.boolean' => 'El campo is_active debe ser verdadero o falso.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'La validación ha fallado.',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Validate days
        $allowedDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        $daysInput = $request->days;
        $invalidDays = [];

        // Si days está vacío, no validar días inválidos
        if (!empty($daysInput)) {
            if (is_string($daysInput[0] ?? null)) {
                foreach ($daysInput as $day) {
                    if (!in_array($day, $allowedDays)) {
                        $invalidDays[] = $day;
                    }
                }
            } else {
                foreach ($daysInput as $dayObj) {
                    if (!isset($dayObj['day']) || !in_array($dayObj['day'], $allowedDays)) {
                        $invalidDays[] = $dayObj['day'] ?? json_encode($dayObj);
                    }
                }
            }

            if (!empty($invalidDays)) {
                return response()->json([
                    'message' => 'Día(s) inválido(s) detectado(s).',
                    'errors' => [
                        'days' => ['Los siguientes días no son válidos: ' . implode(', ', $invalidDays) . '. Deben ser: ' . implode(', ', $allowedDays)]
                    ]
                ], 400);
            }
        }

        // Search ShiftUser by user_id and shift_id
        
        $shiftUser = ShiftUser::where('user_id', $id)
            ->where('shift_id', $shiftUserId)
            ->first();

        if (!$shiftUser) {
            return response()->json([
                'message' => 'No se encontró la asignación de turno.',
                'errors' => [
                    'shift_user_id' => ['No se encontró la asignación de turno para este usuario y turno.']
                ]
            ], 404);
        }

        // Check user and turno belongs to the company
        $employee = DashboardUser::where('id', $shiftUser->user_id)
            ->where('company_id', $companyId)
            ->first();
        $turno = Turnos::where('id', $shiftUser->shift_id)
            ->where('company_id', $companyId)
            ->first();

        if (!$employee) {
            return response()->json([
                'message' => 'El empleado no pertenece a la empresa o no existe.',
                'errors' => [
                    'employee_id' => ['El empleado no pertenece a la empresa o no existe.']
                ]
            ], 422);
        }
        if (!$turno) {
            return response()->json([
                'message' => 'El turno no pertenece a la empresa o no existe.',
                'errors' => [
                    'shift_id' => ['El turno no pertenece a la empresa o no existe.']
                ]
            ], 422);
        }

        $newDays = $request->days;

        // Check overlaps with other shift users
        $otherShiftUsers = ShiftUser::where('user_id', $shiftUser->user_id)
            ->where('id', '!=', $shiftUser->id)
            ->get();

        $orderedDaysOfWeek = [
            'Lunes', 'Martes', 'Miércoles', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Sabado', 'Domingo'
        ];

        // If days is empty, don't check overlaps
        if (!empty($daysInput)) {
            foreach ($otherShiftUsers as $otherShiftUser) {
                $existingDays = json_decode($otherShiftUser->days, true);
                $overlapTurn = Turnos::find($otherShiftUser->shift_id);
                $overlapDays = [];
                if (is_string($existingDays[0] ?? null)) {
                    foreach ($existingDays as $existingDay) {
                        foreach ($daysInput as $newDay) {
                            if ($existingDay === $newDay) {
                                $overlapDays[] = $newDay;
                            }
                        }
                    }
                    if (!empty($overlapDays)) {
                        return response()->json([
                            'message' => 'Error editando el turno del usuario. Solapamiento detectado con el turno "' . ($overlapTurn->name ?? 'Desconocido') . '".',
                            'errors' => [
                                'days' => ['Solapamiento detectado en: ' . implode(', ', $overlapDays) . '.']
                            ]
                        ], 422);
                    }
                } else {
                    foreach ($existingDays as $existingDay) {
                        foreach ($daysInput as $newDay) {
                            if (
                                isset($existingDay['day'], $newDay['day']) &&
                                $existingDay['day'] === $newDay['day']
                            ) {
                                if (
                                    ($newDay['start_time'] < $existingDay['end_time']) &&
                                    ($newDay['end_time'] > $existingDay['start_time'])
                                ) {
                                    $overlapDays[] = $newDay['day'] . ' (' . $newDay['start_time'] . '-' . $newDay['end_time'] . ')';
                                }
                            }
                        }
                    }
                    if (!empty($overlapDays)) {
                        return response()->json([
                            'message' => 'Solapamiento en los siguientes días y horarios con el turno "' . ($overlapTurn->name ?? 'Desconocido') . '": ' . implode(', ', $overlapDays),
                            'errors' => [
                                'days' => ['Solapamiento detectado en: ' . implode(', ', $overlapDays) . '.']
                            ]
                        ], 422);
                    }
                }
            }
        }

        // Sort days before saving
        if (!empty($daysInput)) {
            if (is_string($daysInput[0] ?? null)) {
                usort($daysInput, function ($a, $b) use ($orderedDaysOfWeek) {
                    $posA = array_search($a, $orderedDaysOfWeek);
                    $posB = array_search($b, $orderedDaysOfWeek);
                    return ($posA === false ? 99 : $posA) <=> ($posB === false ? 99 : $posB);
                });
            } else {
                usort($daysInput, function ($a, $b) use ($orderedDaysOfWeek) {
                    $posA = array_search($a['day'], $orderedDaysOfWeek);
                    $posB = array_search($b['day'], $orderedDaysOfWeek);
                    return ($posA === false ? 99 : $posA) <=> ($posB === false ? 99 : $posB);
                });
            }
        }

        $shiftUser->days = json_encode($daysInput);
        $shiftUser->is_active = $request->is_active;
        $shiftUser->save();

        return response()->json([
            'message' => 'Turno del usuario actualizado exitosamente.',
            'shift_user' => $shiftUser,
        ], 200);
    }
}
