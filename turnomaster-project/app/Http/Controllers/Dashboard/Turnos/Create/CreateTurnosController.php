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

        $turno = Turnos::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_time' => $request->start_time,
            'lunch_time' => $request->lunch_time,
            'end_time' => $request->end_time,
            'company_id' => $userCompany
        ]);

        return response()->json([
            'message' => 'Turno creado exitosamente.',
            'turno' => $turno,
        ], 201);

    }
}
