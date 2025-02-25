<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VerificationCode;
use App\Models\User;
use Carbon\Carbon;

class VerificationController extends Controller
{
    public function verify($code)
    {
        $verificationCode = VerificationCode::where('code', $code)->first();

        if (!$verificationCode) {
            return redirect()->route('email.handler')->with('error', 'El código de verificación es inválido o ya ha sido utilizado.');
        }

        if ($verificationCode->isExpired()) {
            return redirect()->route('email.handler')->with('error', 'El código de verificación ha expirado.');
        }

        $user = $verificationCode->user;
        $user->email_verified_at = Carbon::now();
        $user->save();

        $verificationCode->delete();

        $userName = ucwords(strtolower($user->name));

        return redirect('/')->with('success', 'Su cuenta ha sido verificada exitosamente.')->with('verified', true)->with('userName', $userName);
    }
}
