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

            if (is_string($existingDays[0] ?? null)) {
                foreach ($existingDays as $existingDay) {
                    foreach ($newDays as $newDay) {
                        if ($existingDay === $newDay) {
                            return response()->json([
                                'message' => 'El usuario ya tiene un turno asignado en el día: ' . $newDay . '.',
                                'errors' => [
                                    'days' => ['Solapamiento detectado en el día: ' . $newDay . '.']
                                ]
                            ], 422);
                        }
                    }
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
                                return response()->json([
                                    'message' => 'Solapamiento en ' . $newDay['day'] . ' entre ' . $newDay['start_time'] . '-' . $newDay['end_time'],
                                    'errors' => [
                                        'days' => ['Solapamiento detectado en ' . $newDay['day'] . '.']
                                    ]
                                ], 422);
                            }
                        }
                    }
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

    public function createShiftUsers(Request $request)
    {
        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userId = $decoded->user_id;
        $companyId = $decoded->company_id;

        $validator = \Validator::make($request->all(), [
            'shift_id' => 'required|integer',
            'days' => 'required|array',
            'is_active' => 'required|boolean',
            'employee_ids' => 'required|array|min:1',
            'employee_ids.*' => 'integer',
        ], [
            'employee_ids.required' => 'El campo employee_ids es obligatorio.',
            'employee_ids.array' => 'El campo employee_ids debe ser un array.',
            'employee_ids.*.integer' => 'Cada employee_id debe ser un número entero.',
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

        $problematicUsers = [];
        $createdShifts = [];

        foreach ($request->employee_ids as $employee_id) {
            $employee = DashboardUser::where('id', $employee_id)
                ->where('company_id', $companyId)
                ->first();

            if (!$employee) {
                $problematicUsers[$employee_id][] = 'El empleado no pertenece a la empresa o no existe.';
                continue;
            }

            $newDays = $request->days;
            $orderedDaysOfWeek = [
                'Lunes', 'Martes', 'Miércoles', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Sabado', 'Domingo'
            ];


            $existingShiftUser = ShiftUser::where('user_id', $employee_id)
                ->where('shift_id', $request->shift_id)
                ->first();

            if ($existingShiftUser) {
                $existingDays = json_decode($existingShiftUser->days, true) ?? [];
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
                $createdShifts[] = [
                    'user_id' => $employee_id,
                    'shift' => $existingShiftUser,
                    'updated' => true,
                ];
                continue;
            }

            $existingShiftUsers = ShiftUser::where('user_id', $employee_id)->get();
            $hasOverlap = false;

            foreach ($existingShiftUsers as $shiftUser) {
                $existingDays = json_decode($shiftUser->days, true);

                if (is_string($existingDays[0] ?? null)) {
                    foreach ($existingDays as $existingDay) {
                        foreach ($newDays as $newDay) {
                            if ($existingDay === $newDay) {
                                $problematicUsers[$employee_id][] = 'Solapamiento detectado en el día: ' . $newDay . '.';
                                $hasOverlap = true;
                            }
                        }
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
                                    $problematicUsers[$employee_id][] = 'Solapamiento detectado en ' . $newDay['day'] . '.';
                                    $hasOverlap = true;
                                }
                            }
                        }
                    }
                }
            }

            if (!$hasOverlap) {

                $orderedDays = $newDays;
                if (is_string($orderedDays[0] ?? null)) {
                    usort($orderedDays, function ($a, $b) use ($orderedDaysOfWeek) {
                        $posA = array_search($a, $orderedDaysOfWeek);
                        $posB = array_search($b, $orderedDaysOfWeek);
                        return ($posA === false ? 99 : $posA) <=> ($posB === false ? 99 : $posB);
                    });
                } else {
                    usort($orderedDays, function ($a, $b) use ($orderedDaysOfWeek) {
                        $posA = array_search($a['day'], $orderedDaysOfWeek);
                        $posB = array_search($b['day'], $orderedDaysOfWeek);
                        return ($posA === false ? 99 : $posA) <=> ($posB === false ? 99 : $posB);
                    });
                }
                $shift = ShiftUser::Create([
                    'shift_id' => $request->shift_id,
                    'user_id' => $employee_id,
                    'days' => json_encode($orderedDays),
                    'is_active' => $request->is_active,
                ]);
                $createdShifts[] = [
                    'user_id' => $employee_id,
                    'shift' => $shift,
                ];
            }
        }

        if (!empty($problematicUsers)) {
            return response()->json([
                'message' => 'Algunos usuarios tienen solapamientos o errores.',
                'errors' => $problematicUsers,
                'created' => $createdShifts,
            ], 422);
        }

        return response()->json([
            'message' => 'Usuarios asignados exitosamente.',
            'created' => $createdShifts,
        ], 201);
    }
}