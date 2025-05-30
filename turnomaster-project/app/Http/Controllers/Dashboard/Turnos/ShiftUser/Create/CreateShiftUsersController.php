<?php

namespace App\Http\Controllers\Dashboard\Turnos\ShiftUser\Create;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift\ShiftUser;
use App\Models\Users\DashboardUser;
use App\Models\Turnos\Turnos;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class CreateShiftUsersController extends Controller
{
    public function createShiftUser(Request $request)
    {
        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userId = $decoded->user_id;
        $companyId = $decoded->company_id;

        $validator = \Validator::make($request->all(), [
            'shift_id' => 'required|integer',
            'days' => 'required|array',
            'is_active' => 'required|boolean',
            'employee_id' => 'required|integer',
        ], [
            'employee_id.required' => 'El campo employee_id es obligatorio.',
            'employee_id.integer' => 'El campo employee_id debe ser un número entero.',
            'shift_id.exists' => 'El campo shift_id no existe en los registros.',
            'shift_id.required' => 'El campo shift_id es obligatorio.',
            'shift_id.integer' => 'El campo shift_id debe ser un número entero.',
            'days.required' => 'El campo days es obligatorio.',
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

        $employee = DashboardUser::where('id', $request->employee_id)
            ->where('company_id', $companyId)
            ->first();

        $turno = Turnos::where('id', $request->shift_id)
            ->where('company_id', $companyId)
            ->first();

        if (!$turno) {
            return response()->json([
                'message' => 'El turno no pertenece a la empresa o no existe.',
                'errors' => [
                    'shift_id' => ['El turno no pertenece a la empresa o no existe.']
                ]
            ], 422);
        }

        if (!$employee) {
            return response()->json([
                'message' => 'El empleado no pertenece a la empresa o no existe.',
                'errors' => [
                    'employee_id' => ['El empleado no pertenece a la empresa o no existe.']
                ]
            ], 422);
        }

        $newDays = $request->days;

        $existingShiftUser = ShiftUser::where('user_id', $request->employee_id)
            ->where('shift_id', $request->shift_id)
            ->first();

        if ($existingShiftUser) {
           
            // Check for overlapping days with other shifts for the same user

            $otherShiftUsers = ShiftUser::where('user_id', $request->employee_id)
                ->where('shift_id', '!=', $request->shift_id)
                ->get();

            $orderedDaysOfWeek = [
                'Lunes', 'Martes', 'Miércoles', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Sabado', 'Domingo'
            ];

            foreach ($otherShiftUsers as $shiftUser) {
                $existingDays = json_decode($shiftUser->days, true);

                // Get turno name for overlap message
                $overlapTurn = Turnos::find($shiftUser->shift_id);

                $overlapDays = [];
                if (is_string($existingDays[0] ?? null)) {
                    foreach ($existingDays as $existingDay) {
                        foreach ($newDays as $newDay) {
                            if ($existingDay === $newDay) {
                                $overlapDays[] = $newDay;
                            }
                        }
                    }
                    if (!empty($overlapDays)) {
                        return response()->json([
                            'message' => 'Error asignando el turno al usuario. Solapamiento detectado con el turno "' . ($overlapTurn->name ?? 'Desconocido') . '".',
                            'errors' => [
                                'days' => ['Solapamiento detectado en: ' . implode(', ', $overlapDays) . '.']
                            ]
                        ], 422);
                    }
                } else {
                    foreach ($existingDays as $existingDay) {
                        foreach ($newDays as $newDay) {
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


            $existingDays = json_decode($existingShiftUser->days, true) ?? [];
            $orderedDaysOfWeek = [
                'Lunes', 'Martes', 'Miércoles', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Sabado', 'Domingo'
            ];
            if (is_string($existingDays[0] ?? null)) {
                $mergedDays = array_unique(array_merge($existingDays, $newDays));
                usort($mergedDays, function ($a, $b) use ($orderedDaysOfWeek) {
                    $posA = array_search($a, $orderedDaysOfWeek);
                    $posB = array_search($b, $orderedDaysOfWeek);
                    return ($posA === false ? 99 : $posA) <=> ($posB === false ? 99 : $posB);
                });
            } else {
                $daysByKey = [];
                foreach ($existingDays as $d) {
                    if (isset($d['day'])) $daysByKey[$d['day'] . ($d['start_time'] ?? '') . ($d['end_time'] ?? '')] = $d;
                }
                foreach ($newDays as $d) {
                    if (isset($d['day'])) $daysByKey[$d['day'] . ($d['start_time'] ?? '') . ($d['end_time'] ?? '')] = $d;
                }
                $mergedDays = array_values($daysByKey);
                usort($mergedDays, function ($a, $b) use ($orderedDaysOfWeek) {
                    $posA = array_search($a['day'], $orderedDaysOfWeek);
                    $posB = array_search($b['day'], $orderedDaysOfWeek);
                    return ($posA === false ? 99 : $posA) <=> ($posB === false ? 99 : $posB);
                });
            }
            $existingShiftUser->days = json_encode($mergedDays);
            $existingShiftUser->is_active = $request->is_active;
            $existingShiftUser->save();

            return response()->json([
                'message' => 'Usuario asignado al turno exitosamente (actualizado).',
                'user_id' => $request->employee_id,
                'shift' => $existingShiftUser,
            ], 200);
        }

        $existingShiftUsers = ShiftUser::where('user_id', $request->employee_id)->get();

        foreach ($existingShiftUsers as $shiftUser) {
            $existingDays = json_decode($shiftUser->days, true);

            // Get turno name for overlap message
            $overlapTurn = Turnos::find($shiftUser->shift_id);

            $overlapDays = [];
            if (is_string($existingDays[0] ?? null)) {
                foreach ($existingDays as $existingDay) {
                    foreach ($newDays as $newDay) {
                        if ($existingDay === $newDay) {
                            $overlapDays[] = $newDay;
                        }
                    }
                }
                if (!empty($overlapDays)) {
                    return response()->json([
                        'message' => 'Error asignando el turno al usuario. Solapamiento detectado con el turno "' . ($overlapTurn->name ?? 'Desconocido') . '".',
                        'errors' => [
                            'days' => ['Solapamiento detectado en: ' . implode(', ', $overlapDays) . '.']
                        ]
                    ], 422);
                }
            } else {
                foreach ($existingDays as $existingDay) {
                    foreach ($newDays as $newDay) {
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

        $shift = ShiftUser::Create([
            'shift_id' => $request->shift_id,
            'user_id' => $request->employee_id,

            'days' => (function($days) {
                $orderedDaysOfWeek = [
                    'Lunes', 'Martes', 'Miércoles', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Sabado', 'Domingo'
                ];
                if (is_string($days[0] ?? null)) {
                    usort($days, function ($a, $b) use ($orderedDaysOfWeek) {
                        $posA = array_search($a, $orderedDaysOfWeek);
                        $posB = array_search($b, $orderedDaysOfWeek);
                        return ($posA === false ? 99 : $posA) <=> ($posB === false ? 99 : $posB);
                    });
                } else {
                    usort($days, function ($a, $b) use ($orderedDaysOfWeek) {
                        $posA = array_search($a['day'], $orderedDaysOfWeek);
                        $posB = array_search($b['day'], $orderedDaysOfWeek);
                        return ($posA === false ? 99 : $posA) <=> ($posB === false ? 99 : $posB);
                    });
                }
                return json_encode($days);
            })($request->days),
            'is_active' => $request->is_active
        ]);

        return response()->json([
            'message' => 'Usuario asignado al turno exitosamente.',
            'user_id' => $request->employee_id,
            'shift' => $shift,
        ], 201);
    }
}