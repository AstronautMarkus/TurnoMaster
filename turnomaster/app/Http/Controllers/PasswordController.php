<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\OldPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class PasswordController extends Controller
{
    public function requestReset(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'No se pudo enviar el enlace para restablecer la contraseña.']);
        }

        $token = Password::createToken($user);

        Mail::send('emails.change_code', ['user' => $user, 'token' => $token], function ($message) use ($user) {
            $message->to($user->email);
            $message->subject('Restablecimiento de Contraseña');
        });

        return redirect()->route('password.reset.message')->with(['status' => 'Se ha enviado un enlace para restablecer su contraseña.']);
    }

    public function resetForm(Request $request)
    {
        return view('auth.reset_password', ['token' => $request->token, 'email' => $request->email]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        return $status === Password::PASSWORD_RESET
                    ? redirect('/')->with('status', 'Contraseña cambiada exitosamente.')
                    : back()->withErrors(['email' => ['Este formulario de cambiar contraseña ya no es válido, por favor solicite uno nuevo.']]);
    }
}
