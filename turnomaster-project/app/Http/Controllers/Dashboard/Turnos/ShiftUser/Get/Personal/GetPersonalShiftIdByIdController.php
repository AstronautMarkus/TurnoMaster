<?php

namespace App\Http\Controllers\Dashboard\Turnos\ShiftUser\Get\Personal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift\ShiftUser;
use App\Models\Users\DashboardUser;
use App\Models\Turnos\Turnos;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GetPersonalShiftIdByIdController extends Controller
{
    public function getPersonalShiftById(Request $request, $userId, $shiftId)
    {
        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $companyId = $decoded->company_id;

        // Search specific shift user by user ID and shift ID
        $shiftUser = ShiftUser::where('user_id', $userId)
            ->where('shift_id', $shiftId)
            ->first();

        if (!$shiftUser) {
            return response()->json([
                'message' => 'No se encontró la asignación de turno.',
                'errors' => [
                    'shift_user_id' => ['No se encontró la asignación de turno para este usuario y turno.']
                ]
            ], 404);
        }

        // Check user and turno belongs to the same company
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

        return response()->json([
            'message' => 'Asignación de turno encontrada.',
            'shift_user' => $shiftUser,
        ], 200);
    }
}
