<?php

namespace App\Http\Controllers\Dashboard\Turnos\Get;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Turnos\Turnos;
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
            return $item;
        });

        return response()->json($turnos);
    }
}
