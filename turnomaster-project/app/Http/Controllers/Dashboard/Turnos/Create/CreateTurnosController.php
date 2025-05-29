<?php

namespace App\Http\Controllers\Dashboard\Turnos\Create;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Turnos\Turnos;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class CreateTurnosController extends Controller
{
    public function createTurnos(Request $request){
    $token = $request->bearerToken();
    $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
    $userCompany = $decoded->company_id;

    $hasLunch = $request->has_lunch;

    $validator = \Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'description' => 'required|string|max:255',
        'start_time' => 'required|string|max:5',
        'has_lunch' => 'required|boolean',
        'lunch_time' => $hasLunch ? 'required|string|max:5' : 'nullable|string|max:5',
        'end_time' => 'required|string|max:5',
    ],[
        'lunch_time.required' => 'Debe especificar una hora de almuerzo si el turno incluye almuerzo.',
        'lunch_time.string' => 'La hora de almuerzo debe ser una cadena de texto.',
        'lunch_time.max' => 'La hora de almuerzo no puede tener más de 5 caracteres.',
        
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'La validación ha fallado.',
            'errors' => $validator->errors(),
        ], 422);
    }

    $start = $request->start_time;
    $end = $request->end_time;
    $lunch = $request->lunch_time;
    $logicErrors = [];

    $timePattern = '/^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/';

    if (!preg_match($timePattern, $start)) {
        $logicErrors['start_time'][] = 'El formato de la hora de inicio es inválido.';
    }
    if (!preg_match($timePattern, $end)) {
        $logicErrors['end_time'][] = 'El formato de la hora de fin es inválido.';
    }

    if ($hasLunch) {
        if (!preg_match($timePattern, $lunch)) {
            $logicErrors['lunch_time'][] = 'El formato de la hora de almuerzo es inválido.';
        }
    }

    // Validate time logic
    if (empty($logicErrors)) {
        $startMinutes = (int)substr($start,0,2)*60 + (int)substr($start,3,2);
        $endMinutes = (int)substr($end,0,2)*60 + (int)substr($end,3,2);

        if ($startMinutes >= $endMinutes) {
            $logicErrors['end_time'][] = 'La hora de fin debe ser después de la hora de inicio.';
        }

        if ($hasLunch) {
            $lunchMinutes = (int)substr($lunch,0,2)*60 + (int)substr($lunch,3,2);

            if ($startMinutes >= $lunchMinutes) {
                $logicErrors['lunch_time'][] = 'La hora de almuerzo debe ser después de la hora de inicio.';
            }
            if ($lunchMinutes >= $endMinutes) {
                $logicErrors['end_time'][] = 'La hora de fin debe ser después de la hora de almuerzo.';
            }
        }
    }

    if (!empty($logicErrors)) {
        return response()->json([
            'message' => 'La validación de los horarios ha fallado.',
            'errors' => $logicErrors,
        ], 422);
    }

    // Hours worked calc
    $startDateTime = \DateTime::createFromFormat('H:i', $start);
    $endDateTime = \DateTime::createFromFormat('H:i', $end);

    $totalMinutes = ($endDateTime->format('H') * 60 + $endDateTime->format('i')) - ($startDateTime->format('H') * 60 + $startDateTime->format('i'));
    $totalWorkedMinutes = $hasLunch ? $totalMinutes - 60 : $totalMinutes;
    $totalWorkedHours = intdiv($totalWorkedMinutes, 60);

    // Save validated Turno
    $turno = Turnos::create([
        'name' => $request->name,
        'description' => $request->description,
        'start_time' => $start,
        'has_lunch' => $hasLunch,
        'lunch_time' => $hasLunch ? $lunch : null,
        'end_time' => $end,
        'company_id' => $userCompany,
        'total_hours' => $totalWorkedHours,
    ]);

    return response()->json([
        'message' => 'Turno creado exitosamente.',
        'turno' => $turno,
    ], 201);
}

}
