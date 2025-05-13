<?php

namespace App\Http\Controllers\Auth\Token;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RefreshTokens\DashboardUserRefreshToken;
use App\Models\RefreshToken;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cookie;

class GenericTokenController extends Controller
{
    public function refresh(Request $request)
    {
        $refreshToken = $request->cookie('refresh_token');

        if (!$refreshToken) {
            return response()->json(['message' => 'Refresh token no proporcionado.'], 401);
        }

        $hashedToken = hash('sha256', $refreshToken);


        $dashboardUserToken = DashboardUserRefreshToken::where('token', $hashedToken)->first();
        $companyUserToken = RefreshToken::where('token', $hashedToken)->first();

        $tokenModel = $dashboardUserToken ?? $companyUserToken;

        if (!$tokenModel || $tokenModel->expires_at->isPast()) {
            return response()->json(['message' => 'Refresh token inválido o expirado.'], 401);
        }

        $user = $tokenModel->user;


        $accessPayload = [
            'iss' => config('app.url'),
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + 3600, // 1 hour
            'nbf' => time(),
            'role_id' => $user->role_id ?? 1, // Default role for companies
            'company_id' => $user->company_id ?? null,
            'is_trial' => $user->is_trial ?? false,
            'user_type' => $dashboardUserToken ? 'employee' : 'company',
            'user_id' => $user->id,
        ];

        try {
            $accessToken = JWT::encode($accessPayload, env('JWT_SECRET'), 'HS256');
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error generando el token'], 500);
        }


        $newRefreshToken = Str::random(64);
        $tokenModel->update([
            'token' => hash('sha256', $newRefreshToken),
            'expires_at' => now()->addDays(15),
        ]);

        // HttpOnly cookie
        $cookie = Cookie::make(
            'refresh_token',
            $newRefreshToken,
            60 * 24 * 15,
            '/',
            null,
            true,
            true,
            false,
            'Strict'
        );

        return response()->json([
            'message' => 'Token renovado correctamente.',
            'token' => $accessToken,
        ])->cookie($cookie);
    }
}
