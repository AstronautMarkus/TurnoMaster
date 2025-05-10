<?php

namespace App\Http\Controllers\Auth\Token;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;

use App\Models\Users\User;
use App\Models\Users\DashboardUser;
use App\Models\RefreshToken;

use Illuminate\Support\Str;

class TokenController extends Controller
{
    public function refresh(Request $request)
    {
        $rawToken = $request->cookie('refresh_token');

        if (!$rawToken) {
            return response()->json(['message' => 'No se encontró el refresh token.'], 401);
        }

        $hashedToken = hash('sha256', $rawToken);

        $refreshToken = RefreshToken::where('token', $hashedToken)
            ->where('revoked', false)
            ->where('expires_at', '>', now())
            ->first();

        if (!$refreshToken) {
            return response()->json(['message' => 'Refresh token inválido o expirado.'], 401);
        }

        $user = $refreshToken->user;

        // Detect user type dynamically
        $userType = $user instanceof \App\Models\Users\User ? 'company' : 'employee';

        // Set role_id to 1 for company users
        $roleId = $userType === 'company' ? 1 : $user->role_id;

        // Generate new access token
        $accessPayload = [
            'iss' => config('app.url'),
            'sub' => $user->id,
            'iat' => time(),
            'exp' => time() + 3600, // 1 hour
            'nbf' => time(),
            'role_id' => $roleId,
            'is_trial' => $user->is_trial ?? false,
            'company_id' => $user->company_id,
            'user_type' => $userType,
            'user_id' => $user->id,
        ];

        $accessToken = JWT::encode($accessPayload, env('JWT_SECRET'), 'HS256');

        // Rotate the refresh token
        $newRefreshToken = Str::random(64);
        $refreshToken->update([
            'token' => hash('sha256', $newRefreshToken),
            'expires_at' => now()->addDays(15),
        ]);

        $cookie = Cookie::make(
            'refresh_token',
            $newRefreshToken,
            60 * 24 * 15,
            '/',
            null,
            true,  // Secure
            true,  // HttpOnly
            false,
            'Strict'
        );

        return response()->json([
            'token' => $accessToken,
        ])->cookie($cookie);
    }
}
