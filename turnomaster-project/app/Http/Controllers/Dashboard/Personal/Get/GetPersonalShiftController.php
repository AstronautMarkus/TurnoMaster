<?php

namespace App\Http\Controllers\Dashboard\Personal\Get;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\DashboardUser;
use App\Models\Companies;
use App\Models\Role;
use App\Models\Shift\ShiftUser;
use App\Models\Turnos\Turnos;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Carbon\Carbon;

class GetPersonalShiftController extends Controller
{
    public function getPersonalShift(Request $request)
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['error' => 'Token no proporcionado.'], 401);
        }

        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userId = $decoded->user_id;
        $companyId = $decoded->company_id;

        $user = DashboardUser::where('id', $userId)->first();
        if (!$user) {
            return response()->json(['error' => 'Empleado no encontrado.'], 404);
        }

        $company = Companies::where('id', $companyId)->first();
        if (!$company) {
            return response()->json(['error' => 'Compañía no encontrada.'], 404);
        }

        $role = Role::where('id', $user->role_id)->first();
        if (!$role) {
            return response()->json(['error' => 'Rol no encontrado.'], 404);
        }

        
        $shiftUsers = ShiftUser::where('user_id', $userId)
            ->where('is_active', true)
            ->get();

        $closestShift = null;
        $minDiff = null;
        $now = Carbon::now();

        foreach ($shiftUsers as $shiftUser) {
            $shift = Turnos::where('id', $shiftUser->shift_id)
                ->where('company_id', $companyId)
                ->first();

            if ($shift && $shift->start_time) {
                $shiftStart = Carbon::createFromFormat('H:i:s', $shift->start_time);
                $diff = abs($now->diffInSeconds($shiftStart, false));
                if ($minDiff === null || $diff < $minDiff) {
                    $minDiff = $diff;
                    $closestShift = $shift;
                }
            }
        }

        if (!$closestShift) {
            return response()->json(['error' => 'No hay un shift asignado.'], 404);
        }

        $shift = [
            'id' => $closestShift->id,
            'name' => $closestShift->name,
            'description' => $closestShift->description,
            'start_time' => $closestShift->start_time ? date('H:i', strtotime($closestShift->start_time)) : null,
            'lunch_time' => $closestShift->lunch_time ? date('H:i', strtotime($closestShift->lunch_time)) : null,
            'end_time' => $closestShift->end_time ? date('H:i', strtotime($closestShift->end_time)) : null,
        ];

        return response()->json(['shift' => $shift]);
    }
}
