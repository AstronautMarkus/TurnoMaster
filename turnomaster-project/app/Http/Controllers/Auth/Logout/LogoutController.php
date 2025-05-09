<?php

namespace App\Http\Controllers\Auth\Logout;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use App\Models\RefreshToken;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        $rawToken = $request->cookie('refresh_token');

        if ($rawToken) {
            $hashed = hash('sha256', $rawToken);

            RefreshToken::where('token', $hashed)->update([
                'revoked' => true,
            ]);
        }

        $forgetCookie = Cookie::forget('refresh_token');

        return response()->json([
            'message' => 'Sesión cerrada correctamente.',
        ])->cookie($forgetCookie);
    }
}
