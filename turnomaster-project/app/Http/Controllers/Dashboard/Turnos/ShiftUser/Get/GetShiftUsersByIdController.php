<?php

namespace App\Http\Controllers\Dashboard\Turnos\ShiftUser\Get;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift\ShiftUser;
use App\Models\Users\DashboardUser;
use App\Models\Turnos\Turnos;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class GetShiftUsersByIdController extends Controller
{
    public function getShiftUserById(Request $request, $id)
    {

        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userId = $decoded->user_id;
        $companyId = $decoded->company_id;

        $turno = Turnos::where('id', $id)
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

        $shiftUsers = ShiftUser::where('shift_id', $id)
            ->get(['id', 'user_id', 'shift_id', 'days', 'is_active', 'created_by', 'created_at', 'updated_at']);

        // Get dashboard users data
        $shiftUsersWithUserData = $shiftUsers->map(function ($shiftUser) {
            $dashboardUser = DashboardUser::where('id', $shiftUser->user_id)
                ->select('first_name', 'last_name', 'rut', 'rut_dv', 'email', 'role_id')
                ->first();

            return [
                'shift_user' => $shiftUser,
                'user' => $dashboardUser
            ];
        });

        return response()->json([
            'message' => 'Usuarios obtenidos correctamente.',
            'data' => $shiftUsersWithUserData
        ], 200);

    }
}
