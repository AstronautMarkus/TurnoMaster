<?php

namespace App\Http\Controllers\Dashboard\Employees\Shifts\Get;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift\ShiftUser;
use App\Models\Users\DashboardUser;
use App\Models\Turnos\Turnos;
use App\Models\Role;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GetEmployeesShiftsController extends Controller
{
    public function getEmployeeShiftsById(Request $request, $id)
    {
        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $companyId = $decoded->company_id;

        $dashboardUser = DashboardUser::where('id', $id)
            ->where('company_id', $companyId)
            ->select('id', 'first_name', 'last_name', 'rut', 'rut_dv', 'email', 'role_id')
            ->first();

        if (!$dashboardUser) {
            return response()->json([
                'message' => 'El usuario no pertenece a la empresa o no existe.',
                'errors' => [
                    'user_id' => ['El usuario no pertenece a la empresa o no existe.']
                ]
            ], 422);
        }


        $role = null;
        if ($dashboardUser && $dashboardUser->role_id) {
            $role = Role::where('id', $dashboardUser->role_id)->first(['id', 'name', 'description']);
        }

        $userWithRole = [
            'id' => $dashboardUser->id,
            'first_name' => $dashboardUser->first_name,
            'last_name' => $dashboardUser->last_name,
            'rut' => $dashboardUser->rut,
            'rut_dv' => $dashboardUser->rut_dv,
            'email' => $dashboardUser->email,
            'role' => $role
        ];

        $perPage = $request->input('per_page', 10);

        
        $shiftUsers = ShiftUser::where('user_id', $id)
            ->paginate($perPage, ['id', 'user_id', 'shift_id', 'days', 'is_active', 'created_at', 'updated_at']);

        
        $shiftUsersWithShiftData = $shiftUsers->getCollection()->map(function ($shiftUser) use ($companyId) {
            $turno = Turnos::where('id', $shiftUser->shift_id)
                ->where('company_id', $companyId)
                ->select('id', 'name', 'description', 'start_time', 'lunch_time', 'end_time')
                ->first();

            // Format to HH:MM
            if ($turno) {
                foreach (['start_time', 'lunch_time', 'end_time'] as $field) {
                    if (!empty($turno->$field)) {
                        $turno->$field = date('H:i', strtotime($turno->$field));
                    }
                }
            }

            $daysMap = [
                'monday' => 'Lunes',
                'tuesday' => 'Martes',
                'wednesday' => 'Miércoles',
                'thursday' => 'Jueves',
                'friday' => 'Viernes',
                'saturday' => 'Sábado',
                'sunday' => 'Domingo'
            ];

            $days = json_decode($shiftUser->days, true);
            if (is_array($days)) {
                $days = array_map(function($day) use ($daysMap) {
                    return $daysMap[strtolower($day)] ?? $day;
                }, $days);
                $shiftUser->days = json_encode($days, JSON_UNESCAPED_UNICODE);
            }

            return [
                'shift_user' => $shiftUser,
                'shift' => $turno
            ];
        });

        $paginated = $shiftUsers->toArray();
        $paginated['data'] = $shiftUsersWithShiftData;

        return response()->json([
            'message' => 'Turnos del usuario obtenidos correctamente.',
            'data' => $paginated,
            'user' => $userWithRole
        ], 200);
    }
}
