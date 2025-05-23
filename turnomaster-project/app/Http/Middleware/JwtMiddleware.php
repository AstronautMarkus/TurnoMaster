<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\Users\User;
use App\Models\Users\DashboardUser;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $authHeader = $request->header('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['message' => 'Token no proporcionado'], 401);
        }

        $token = substr($authHeader, 7);

        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

            // Determine the user model based on user_type
            
            $userModel = $decoded->user_type === 'company' ? User::class : DashboardUser::class;
            $user = $userModel::find($decoded->sub);

            if (!$user) {
                return response()->json(['message' => 'Usuario no encontrado'], 401);
            }

            $request->merge(['auth_user' => $user]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Token inválido o expirado'], 401);
        }

        return $next($request);
    }
}
