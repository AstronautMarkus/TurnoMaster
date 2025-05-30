<?php

namespace App\Http\Controllers\Auth\Login;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\DashboardUser;
use App\Models\RefreshTokens\DashboardUserRefreshToken;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cookie;

class LoginEmployeesController extends Controller
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

        $user = DashboardUser::where('email', $request->email)->first();

        if (!$user || !\Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Usuario o contraseña incorrectos.'], 401);
        }

        // Generate JWT token
        $accessPayload = [
            'iss' => config('app.url'),
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + 3600, // 1 hour
            'nbf' => time(),
            'role_id' => $user->role_id,
            'company_id' => $user->company_id,
            'is_trial' => false,
            'user_type' => 'employee',
            'user_id' => $user->id,
        ];

        try {
            $accessToken = JWT::encode($accessPayload, env('JWT_SECRET'), 'HS256');
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error generando el token'], 500);
        }

        // Generate refresh token
        $refreshToken = Str::random(64);
        DashboardUserRefreshToken::create([
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
                'profile_photo' => $user->profile_photo 
                    ? url("api/assets/{$user->profile_photo}") 
                    : null,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ],
        ])->cookie($cookie);
    }
}
