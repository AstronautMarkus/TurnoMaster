<?php

namespace App\Http\Controllers\Dashboard\Turnos\Edit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Turnos\Turnos;
use App\Models\Shift\ShiftUser;
use App\Models\Users\DashboardUser;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class EditTurnosController extends Controller
{
    public function updateTurnos(Request $request, $id)
    {
        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userCompany = $decoded->company_id;

        // Transform HH:MM to HH:MM:SS if necessary
        $hourFields = ['start_time', 'lunch_time', 'end_time'];
        foreach ($hourFields as $field) {
            if ($request->has($field)) {
                $value = $request->input($field);
                // if format is HH:MM:SS, do nothing
                if (preg_match('/^\d{2}:\d{2}$/', $value)) {
                    $request->merge([$field => $value . ':00']);
                }
            }
        }

        $rules = [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:255',
            'start_time' => 'sometimes|required|string|max:8',
            'lunch_time' => 'sometimes|required|string|max:8',
            'end_time' => 'sometimes|required|string|max:8',
            'has_lunch' => 'sometimes|boolean',
        ];
        $messages = [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no puede tener más de 255 caracteres.',
            'description.required' => 'La descripción es obligatoria.',
            'description.string' => 'La descripción debe ser una cadena de texto.',
            'description.max' => 'La descripción no puede tener más de 255 caracteres.',
            'start_time.required' => 'La hora de inicio es obligatoria.',
            'start_time.string' => 'La hora de inicio debe ser una cadena de texto.',
            'start_time.max' => 'La hora de inicio no puede tener más de 8 caracteres.',
            'lunch_time.required' => 'La hora de almuerzo es obligatoria.',
            'lunch_time.string' => 'La hora de almuerzo debe ser una cadena de texto.',
            'lunch_time.max' => 'La hora de almuerzo no puede tener más de 8 caracteres.',
            'end_time.required' => 'La hora de fin es obligatoria.',
            'end_time.string' => 'La hora de fin debe ser una cadena de texto.',
            'end_time.max' => 'La hora de fin no puede tener más de 8 caracteres.'
        ];

        $validator = \Validator::make($request->all(), $rules, $messages);

        // if has_lunch true, lunch_time is required
        if (
            $request->has('has_lunch') &&
            filter_var($request->has_lunch, FILTER_VALIDATE_BOOLEAN) === true &&
            !$request->filled('lunch_time')
        ) {
            return response()->json([
                'message' => 'La validación ha fallado.',
                'errors' => [
                    'lunch_time' => ['Debe especificar el horario de almuerzo si se especificó que el turno tiene horario de almuerzo.']
                ],
            ], 422);
        }

        if ($validator->fails()) {
            return response()->json([
                'message' => 'La validación ha fallado.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $hasLunch = $request->has('has_lunch') ? filter_var($request->has_lunch, FILTER_VALIDATE_BOOLEAN) : true;

        // Get First Turno
        $turno = Turnos::where('id', $id)->where('company_id', $userCompany)->first();

        if (!$turno) {
            return response()->json([
                'message' => 'Turno no encontrado o no autorizado.',
            ], 404);
        }

        // Use default Turno values if not provided in the request
        $start = $request->has('start_time') ? $request->start_time : $turno->start_time;
        $lunch = $request->has('lunch_time') ? $request->lunch_time : $turno->lunch_time;
        $end = $request->has('end_time') ? $request->end_time : $turno->end_time;

        // Validate format
        $timePattern = '/^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/';
        $logicErrors = [];

        if ($start !== null && !preg_match($timePattern, $start)) {
            $logicErrors['start_time'][] = 'El formato de la hora de inicio es inválido.';
        }
        if ($lunch !== null && !preg_match($timePattern, $lunch)) {
            $logicErrors['lunch_time'][] = 'El formato de la hora de almuerzo es inválido.';
        }
        if ($end !== null && !preg_match($timePattern, $end)) {
            $logicErrors['end_time'][] = 'El formato de la hora de fin es inválido.';
        }

        if (empty($logicErrors)) {
            // Convert times to minutes for easier comparison
            $startMinutes = $start !== null ? (int)substr($start, 0, 2) * 60 + (int)substr($start, 3, 2) : null;
            $lunchMinutes = $lunch !== null ? (int)substr($lunch, 0, 2) * 60 + (int)substr($lunch, 3, 2) : null;
            $endMinutes = $end !== null ? (int)substr($end, 0, 2) * 60 + (int)substr($end, 3, 2) : null;

            if ($hasLunch && $lunchMinutes !== null) {
                if ($startMinutes !== null && $startMinutes >= $lunchMinutes) {
                    $logicErrors['lunch_time'][] = 'La hora de almuerzo debe ser después de la hora de inicio.';
                }
                if ($endMinutes !== null && $lunchMinutes >= $endMinutes) {
                    $logicErrors['lunch_time'][] = 'La hora de almuerzo debe ser antes de la hora de fin.';
                }
            }

            if ($startMinutes !== null && $endMinutes !== null && $startMinutes >= $endMinutes) {
                $logicErrors['end_time'][] = 'La hora de fin debe ser después de la hora de inicio.';
            }
        }

        if (!empty($logicErrors)) {
            return response()->json([
                'message' => 'La validación de los horarios ha fallado.',
                'errors' => $logicErrors,
            ], 422);
        }

        $data = $request->only(['name', 'description', 'start_time', 'lunch_time', 'end_time']);

        if (empty($data)) {
            return response()->json([
                'message' => 'No se enviaron datos para actualizar.',
            ], 400);
        }

        //--- START: Validation of overlaps for assigned users ---
        $assignedUsers = ShiftUser::where('shift_id', $turno->id)->get();
        $overlapConflicts = [];
        $newDays = [];
        // Get days from Turno
        foreach ($assignedUsers as $shiftUser) {
            $userId = $shiftUser->user_id;
            $userDays = json_decode($shiftUser->days, true);

            $isSimpleDays = is_string($userDays[0] ?? null);

            if ($isSimpleDays) {
                $editedDays = $userDays;
            } else {
                $editedDays = [];
                foreach ($userDays as $d) {
                    $editedDays[] = [
                        'day' => $d['day'],
                        'start_time' => $start,
                        'end_time' => $end
                    ];
                }
            }

            // Find other active Turnos of the user (excluding the edited shift)
            $otherShifts = ShiftUser::where('user_id', $userId)
                ->where('shift_id', '!=', $turno->id)
                ->get();

            foreach ($otherShifts as $otherShift) {
                $otherTurno = Turnos::find($otherShift->shift_id);
                $otherDays = json_decode($otherShift->days, true);
                $otherIsSimple = is_string($otherDays[0] ?? null);

                if ($isSimpleDays && $otherIsSimple) {
                    // Both are simple (just days)
                    $overlapDays = array_intersect($editedDays, $otherDays);
                    if (!empty($overlapDays)) {
                        // For each matching day, compare time ranges
                        foreach ($overlapDays as $day) {
                            // Get hours of the edited shift
                            $editedStart = $start;
                            $editedEnd = $end;
                            // Get hours from the other shift
                            $otherStart = $otherTurno ? $otherTurno->start_time : '00:00:00';
                            $otherEnd = $otherTurno ? $otherTurno->end_time : '23:59:59';

                            // Compare overlapping hours
                            if (
                                ($editedStart < $otherEnd) &&
                                ($editedEnd > $otherStart)
                            ) {
                                $overlapConflicts[] = [
                                    'user_id' => $userId,
                                    'user_name' => optional(DashboardUser::find($userId))->first_name . ' ' . optional(DashboardUser::find($userId))->last_name,
                                    'conflict_with_turno' => $otherTurno ? $otherTurno->name : 'Desconocido',
                                    'days' => [$day . ' (' . $editedStart . '-' . $editedEnd . ')'],
                                    'type' => 'horario'
                                ];
                            }
                        }
                    }
                } else {
                    // At least one has a schedule
                    $edited = $isSimpleDays ? array_map(function($d) use ($start, $end) {
                        return ['day' => $d, 'start_time' => $start, 'end_time' => $end];
                    }, $editedDays) : $editedDays;
                    $other = $otherIsSimple ? array_map(function($d) use ($otherTurno) {
                        return [
                            'day' => $d,
                            'start_time' => $otherTurno ? $otherTurno->start_time : '00:00:00',
                            'end_time' => $otherTurno ? $otherTurno->end_time : '23:59:59'
                        ];
                    }, $otherDays) : $otherDays;

                    foreach ($edited as $ed) {
                        foreach ($other as $od) {
                            if (
                                isset($ed['day'], $od['day']) &&
                                $ed['day'] === $od['day']
                            ) {
                                // Compare overlapping schedules
                                if (
                                    ($ed['start_time'] < $od['end_time']) &&
                                    ($ed['end_time'] > $od['start_time'])
                                ) {
                                    $overlapConflicts[] = [
                                        'user_id' => $userId,
                                        'user_name' => optional(DashboardUser::find($userId))->name,
                                        'conflict_with_turno' => $otherTurno ? $otherTurno->name : 'Desconocido',
                                        'days' => [$ed['day'] . ' (' . $ed['start_time'] . '-' . $ed['end_time'] . ')'],
                                        'type' => 'horario'
                                    ];
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!empty($overlapConflicts)) {
            // Group conflicts by user
            $errors = [];
            foreach ($overlapConflicts as $conflict) {
                $userId = $conflict['user_id'];
                $userName = $conflict['user_name'] ?? null;
                $key = $userId;
                if (!isset($errors[$key])) {
                    $errors[$key] = [
                        'user_id' => $userId,
                        'user_name' => $userName,
                        'conflicts' => [],
                    ];
                }
                $errors[$key]['conflicts'][] = [
                    'conflict_with_turno' => $conflict['conflict_with_turno'],
                    'days' => $conflict['days'],
                    'type' => $conflict['type'],
                ];
            }
            return response()->json([
                'message' => 'Solapamiento detectado para usuarios asignados al turno.',
                'errors' => [
                    'users' => array_values($errors)
                ]
            ], 422);
        }
        // --- END: Validation of overlaps for assigned users ---



        if ($request->has('has_lunch')) {
            $data['has_lunch'] = $hasLunch ? 1 : 0;
            if (!$hasLunch) {
                $data['lunch_time'] = null;
            }
        }


        // Calculate total_hours if start_time and end_time are provided
        $startFinal = $request->has('start_time') ? $request->start_time : $turno->start_time;
        $endFinal = $request->has('end_time') ? $request->end_time : $turno->end_time;

        if ($startFinal && $endFinal) {
            $startDateTime = \DateTime::createFromFormat('H:i:s', $startFinal);
            $endDateTime = \DateTime::createFromFormat('H:i:s', $endFinal);
            $totalMinutes = ($endDateTime->format('H') * 60 + $endDateTime->format('i')) - ($startDateTime->format('H') * 60 + $startDateTime->format('i'));

            $totalWorkedMinutes = $hasLunch ? $totalMinutes - 60 : $totalMinutes;
            $totalWorkedHours = intdiv($totalWorkedMinutes, 60);
            $data['total_hours'] = $totalWorkedHours;
        }

        $turno->update($data);

        return response()->json([
            'message' => 'Turno actualizado exitosamente.',
            'turno' => $turno,
        ], 200);
    }
}
