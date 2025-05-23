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

        $validator = \Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'start_time' => 'required|string|max:5',
            'lunch_time' => 'required|string|max:5',
            'end_time' => 'required|string|max:5',
        ],[
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no puede tener más de 255 caracteres.',
            'description.required' => 'La descripción es obligatoria.',
            'description.string' => 'La descripción debe ser una cadena de texto.',
            'description.max' => 'La descripción no puede tener más de 255 caracteres.',
            'start_time.required' => 'La hora de inicio es obligatoria.',
            'start_time.string' => 'La hora de inicio debe ser una cadena de texto.',
            'start_time.max' => 'La hora de inicio no puede tener más de 5 caracteres.',
            'lunch_time.required' => 'La hora de almuerzo es obligatoria.',
            'lunch_time.string' => 'La hora de almuerzo debe ser una cadena de texto.',
            'lunch_time.max' => 'La hora de almuerzo no puede tener más de 5 caracteres.',
            'end_time.required' => 'La hora de fin es obligatoria.',
            'end_time.string' => 'La hora de fin debe ser una cadena de texto.',
            'end_time.max' => 'La hora de fin no puede tener más de 5 caracteres.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'La validación ha fallado.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $start = $request->start_time;
        $lunch = $request->lunch_time;
        $end = $request->end_time;


        $timePattern = '/^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/';
        $logicErrors = [];

        if (!preg_match($timePattern, $start)) {
            $logicErrors['start_time'][] = 'El formato de la hora de inicio es inválido.';
        }
        if (!preg_match($timePattern, $lunch)) {
            $logicErrors['lunch_time'][] = 'El formato de la hora de almuerzo es inválido.';
        }
        if (!preg_match($timePattern, $end)) {
            $logicErrors['end_time'][] = 'El formato de la hora de fin es inválido.';
        }


        if (empty($logicErrors)) {
            $startMinutes = (int)substr($start,0,2)*60 + (int)substr($start,3,2);
            $lunchMinutes = (int)substr($lunch,0,2)*60 + (int)substr($lunch,3,2);
            $endMinutes = (int)substr($end,0,2)*60 + (int)substr($end,3,2);

            if ($startMinutes >= $lunchMinutes) {
                $logicErrors['lunch_time'][] = 'La hora de almuerzo debe ser después de la hora de inicio.';
            }
            if ($lunchMinutes >= $endMinutes) {
                $logicErrors['end_time'][] = 'La hora de fin debe ser después de la hora de almuerzo.';
            }
            if ($startMinutes >= $endMinutes) {
                $logicErrors['end_time'][] = 'La hora de fin debe ser después de la hora de inicio.';
            }
        }

        if (!empty($logicErrors)) {
            return response()->json([
                'message' => 'La validación de los horarios ha fallado.',
                'errors' => $logicErrors,
            ], 422);
        }

        // Calculate total hours -1 lunch work

        $startDateTime = \DateTime::createFromFormat('H:i', $start);
        $endDateTime = \DateTime::createFromFormat('H:i', $end);

        // Difference between start and end time
        $totalMinutes = ($endDateTime->format('H') * 60 + $endDateTime->format('i')) - ($startDateTime->format('H') * 60 + $startDateTime->format('i'));

        // Minus 60 minutes for lunch
        $totalWorkedMinutes = $totalMinutes - 60;

        // Convert to hours
        $totalWorkedHours = intdiv($totalWorkedMinutes, 60);


        $turno = Turnos::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_time' => $request->start_time,
            'lunch_time' => $request->lunch_time,
            'end_time' => $request->end_time,
            'company_id' => $userCompany,
            'total_hours' => $totalWorkedHours,
        ]);

        return response()->json([
            'message' => 'Turno creado exitosamente.',
            'turno' => $turno,
        ], 201);

    }
}
