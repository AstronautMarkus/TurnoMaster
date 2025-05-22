<?php

namespace App\Http\Controllers\Dashboard\Turnos\Edit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Turnos\Turnos;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class EditTurnosController extends Controller
{
    public function updateTurnos(Request $request, $id)
    {
        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userCompany = $decoded->company_id;

        
        $rules = [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:255',
            'start_time' => 'sometimes|required|string|max:5',
            'lunch_time' => 'sometimes|required|string|max:5',
            'end_time' => 'sometimes|required|string|max:5',
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
            'start_time.max' => 'La hora de inicio no puede tener más de 5 caracteres.',
            'lunch_time.required' => 'La hora de almuerzo es obligatoria.',
            'lunch_time.string' => 'La hora de almuerzo debe ser una cadena de texto.',
            'lunch_time.max' => 'La hora de almuerzo no puede tener más de 5 caracteres.',
            'end_time.required' => 'La hora de fin es obligatoria.',
            'end_time.string' => 'La hora de fin debe ser una cadena de texto.',
            'end_time.max' => 'La hora de fin no puede tener más de 5 caracteres.'
        ];

        $validator = \Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'La validación ha fallado.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $turno = Turnos::where('id', $id)->where('company_id', $userCompany)->first();

        if (!$turno) {
            return response()->json([
                'message' => 'Turno no encontrado o no autorizado.',
            ], 404);
        }

        $data = $request->only(['name', 'description', 'start_time', 'lunch_time', 'end_time']);
        if (empty($data)) {
            return response()->json([
                'message' => 'No se enviaron datos para actualizar.',
            ], 400);
        }
        $turno->update($data);

        return response()->json([
            'message' => 'Turno actualizado exitosamente.',
            'turno' => $turno,
        ], 200);
    }
}
