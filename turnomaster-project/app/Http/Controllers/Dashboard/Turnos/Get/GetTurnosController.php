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

        $turnos = $query->paginate($perPage);

        return response()->json($turnos);
    }
}
