<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $errors = [];

        if (!$request->has('email')) {
            $errors['email'] = 'El campo "email" es obligatorio.';
        }

        if (!$request->has('password')) {
            $errors['password'] = 'El campo "password" es obligatorio.';
        }

        if (!empty($errors)) {
            return response()->json(['errors' => $errors], 422);
        }

        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !\Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        $payload = [
            'iss' => config('app.url'),
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + 3600,
            'nbf' => time(),
        ];

        try {
            $jwt = JWT::encode($payload, env('JWT_SECRET'), 'HS256');
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error generando el token'], 500);
        }

        return response()->json([
            'message' => 'Iniciado sesión correctamente.',
            'token' => $jwt,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'company_id' => $user->company_id,
                'role_id' => $user->role_id,
                'is_trial' => $user->is_trial,
                'expires_at' => $user->expires_at,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ],
        ]);
    }
}
