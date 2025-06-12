<?php

namespace App\Http\Controllers\Dashboard\Turnos\ShiftUser\Delete\Personal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift\ShiftUser;
use App\Models\Users\DashboardUser;
use App\Models\Turnos\Turnos;
use App\Models\Shift\UserShiftAttendance;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class DeletePersonalShiftIdByIdController extends Controller
{
    public function deletePersonalShiftById(Request $request, $userId, $shiftId)
    {
        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $companyId = $decoded->company_id;

        // Find the shift assignment
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

        // Verify that the user and the shift belong to the company
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

        // Delete attendances and shift assignment only for this user and shift
        UserShiftAttendance::where('user_id', $userId)
            ->where('shift_id', $shiftId)
            ->delete();
        ShiftUser::where('user_id', $userId)
            ->where('shift_id', $shiftId)
            ->delete();

        return response()->json([
            'message' => 'Turno eliminado correctamente para el empleado.',
        ], 200);
    }
}
