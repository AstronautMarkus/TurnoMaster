<?php

namespace App\Http\Controllers\Auth\Login;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\User;
use App\Models\RefreshToken;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cookie;

class LoginCompaniesController extends Controller
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
            return response()->json(['message' => 'Usuario o contraseña incorrectos.'], 401);
        }

        // Check if the account has expired
        if ($user->expires_at && now()->greaterThan($user->expires_at)) {
            return response()->json([
                'message' => 'Esta cuenta de pruebas ha superado su tiempo de demostración. Por favor, considere adquirir una cuenta de nuestras suscripciones.',
                'url' => url('/prices')
            ], 403);
        }

        // Generate JWT token
        $accessPayload = [
            'iss' => config('app.url'),
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + 3600, // 1 hour
            'nbf' => time(),
            'role_id' => 1, // Role 1 is for Owners
            'is_trial' => $user->is_trial,
            'company_id' => $user->company_id,
        ];

        try {
            $accessToken = JWT::encode($accessPayload, env('JWT_SECRET'), 'HS256');
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error generando el token'], 500);
        }

        // Generate refresh token
        $refreshToken = Str::random(64);
        RefreshToken::create([
            'user_id' => $user->id,
            'token' => hash('sha256', $refreshToken),
            'expires_at' => now()->addDays(15),
        ]);

        // HttpOnly cookie
        $cookie = Cookie::make(
            'refresh_token',       // Name
            $refreshToken,         // Value (without hash)
            60 * 24 * 15,          // 15 days
            '/',                   // Path
            null,                  // Domain
            true,                  // Secure
            true,                  // HttpOnly
            false,                 // Raw
            'Strict'               // SameSite
        );

        return response()->json([
            'message' => 'Iniciado sesión correctamente.',
            'token' => $accessToken,
            'user' => [
                'name' => $user->first_name . ' ' . $user->last_name,
                'email' => $user->email,
                'expires_at' => $user->expires_at,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ],
        ])->cookie($cookie);
    }
}
