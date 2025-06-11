<?php

namespace App\Http\Controllers\Dashboard\Turnos\Get;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Turnos\Turnos;
use App\Models\Shift\ShiftUser;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GetTurnosByIdController extends Controller
{

    public function getTurnoById(Request $request, $id)
    {

        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userCompany = $decoded->company_id;

        $turno = Turnos::where('id', $id)
            ->where('company_id', $userCompany)
            ->first();

        if (!$turno) {
            return response()->json(['message' => 'Turno no encontrado.'], 404);
        }

        // if updated_at is equal to created_at, set updated_at to null
        if ($turno->created_at == $turno->updated_at) {
            $turno->updated_at = null;
        }

        // Format time fields to HH:MM
        if ($turno->start_time) {
            $turno->start_time = date('H:i', strtotime($turno->start_time));
        }
        if ($turno->lunch_time) {
            $turno->lunch_time = date('H:i', strtotime($turno->lunch_time));
        }
        if ($turno->end_time) {
            $turno->end_time = date('H:i', strtotime($turno->end_time));
        }

        $assignedUsersCount = Shiftuser::where('shift_id', $id)->count();

        $turnoArray = $turno->toArray();
        $turnoArray['assigned_users_count'] = $assignedUsersCount;

        return response()->json($turnoArray);
    }
}
