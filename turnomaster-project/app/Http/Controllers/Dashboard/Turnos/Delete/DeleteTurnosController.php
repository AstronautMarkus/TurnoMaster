<?php

namespace App\Http\Controllers\Dashboard\Turnos\Delete;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Turnos\Turnos;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class DeleteTurnosController extends Controller
{
    public function deleteTurnos(Request $request, $id)
    {
        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userCompany = $decoded->company_id;
        $turno = Turnos::where('id', $id)->where('company_id', $userCompany)->first();

        if (!$turno) {
            return response()->json([
                'message' => 'El turno no existe o no pertenece a esta empresa.',
            ], 404);
        }
        $turno->delete();

        return response()->json([
            'message' => 'Turno eliminado correctamente.',
        ], 200);
    }
}
