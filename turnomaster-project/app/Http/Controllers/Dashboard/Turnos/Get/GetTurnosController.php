<?php

namespace App\Http\Controllers\Dashboard\Turnos\Get;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Turnos\Turnos;
use App\Models\Shift\ShiftUser;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GetTurnosController extends Controller
{
    public function getTurnos(Request $request)
    {
        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userCompany = $decoded->company_id;

        $perPage = $request->query('per_page', 10);

        $query = Turnos::where('company_id', $userCompany);

        if ($request->has('name')) {
            $name = $request->query('name');
            $query->where(function ($q) use ($name) {
            $q->where('name', 'like', '%' . $name . '%')
              ->orWhere('description', 'like', '%' . $name . '%');
            });
        }

        $turnos = $query->paginate($perPage);

        // if updated_at is equal to created_at, set updated_at to null
        $turnos->getCollection()->transform(function ($item) {
            if ($item->created_at == $item->updated_at) {
                $item->updated_at = null;
            }
            // Format time fields to HH:MM
            if ($item->start_time) {
                $item->start_time = date('H:i', strtotime($item->start_time));
            }
            if ($item->lunch_time) {
                $item->lunch_time = date('H:i', strtotime($item->lunch_time));
            }
            if ($item->end_time) {
                $item->end_time = date('H:i', strtotime($item->end_time));
            }
            $item->assigned_users_count = ShiftUser::where('shift_id', $item->id)->count();
            return $item;
        });

        return response()->json($turnos);
    }
}
