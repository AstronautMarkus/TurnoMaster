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

        $perPage = $request->input('per_page', 10);
        $shiftUsers = ShiftUser::where('shift_id', $id)
            ->paginate($perPage, ['id', 'user_id', 'shift_id', 'days', 'is_active', 'created_at', 'updated_at']);

        // Get dashboard users data
        $shiftUsersWithUserData = $shiftUsers->getCollection()->map(function ($shiftUser) {
            $dashboardUser = DashboardUser::where('id', $shiftUser->user_id)
                ->select('first_name', 'last_name', 'rut', 'rut_dv', 'email', 'role_id')
                ->first();

            return [
                'shift_user' => $shiftUser,
                'user' => $dashboardUser
            ];
        });

        // Get Turno details
        $turnoDetails = Turnos::where('id', $id)
            ->where('company_id', $companyId)
            ->select('name', 'description', 'start_time', 'lunch_time', 'end_time')
            ->first();
        
        if (!$turnoDetails) {
            return response()->json([
                'message' => 'El turno no pertenece a la empresa o no existe.',
                'errors' => [
                    'shift_id' => ['El turno no pertenece a la empresa o no existe.']
                ]
            ], 422);
        }

        // Format time fields to HH:MM
        if ($turnoDetails->start_time) {
            $turnoDetails->start_time = date('H:i', strtotime($turnoDetails->start_time));
        }
        if ($turnoDetails->lunch_time) {
            $turnoDetails->lunch_time = date('H:i', strtotime($turnoDetails->lunch_time));
        }
        if ($turnoDetails->end_time) {
            $turnoDetails->end_time = date('H:i', strtotime($turnoDetails->end_time));
        }

        $paginated = $shiftUsers->toArray();
        $paginated['data'] = $shiftUsersWithUserData;

        return response()->json([
            'message' => 'Usuarios obtenidos correctamente.',
            'data' => $paginated,
            'shift' => $turnoDetails
        ], 200);

    }
}
