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
            'employee_id' => 'required|integer',
        ],[
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

        $shift = ShiftUser::Create([
            'shift_id' => $request->shift_id,
            'user_id' => $request->employee_id,
            'days' => json_encode($request->days),
            'is_active' => $request->is_active,
            'created_by' => $userId,
        ]);

        return response()->json([
            'message' => 'Usuario asignado al turno exitosamente.',
            'user_id' => $request->employee_id,
            'shift' => $shift,
        ], 201);

    }
}
