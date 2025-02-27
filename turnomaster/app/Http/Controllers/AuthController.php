<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\VerificationCode;
use App\Mail\VerificationCodeMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no puede tener más de 255 caracteres.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.string' => 'El correo electrónico debe ser una cadena de texto.',
            'email.email' => 'El correo electrónico debe ser una dirección de correo válida.',
            'email.max' => 'El correo electrónico no puede tener más de 255 caracteres.',
            'email.unique' => 'El correo electrónico ya está registrado.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.string' => 'La contraseña debe ser una cadena de texto.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.confirmed' => 'La confirmación de la contraseña no coincide.',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $code = rand(100000, 999999);
        VerificationCode::create([
            'user_id' => $user->id,
            'code' => $code,
        ]);

        Mail::to($user->email)->send(new VerificationCodeMail($code, $user));

        return redirect()->route('register.message');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            return redirect()->back()->withInput($request->only('email'))->withErrors(['email' => 'No se encontró una cuenta con esta dirección de correo.']);
        }

        if (! Hash::check($request->password, $user->password)) {
            return redirect()->back()->withInput($request->only('email'))->withErrors(['email' => 'Usuario o contraseña incorrectos.']);
        }

        Auth::login($user);

        return redirect('/dashboard');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->flash('logout_success', 'Has cerrado sesión exitosamente.');
        return redirect('/');
    }

    public function requestReset(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return redirect()->back()->withErrors(['email' => 'No se encontró una cuenta con esta dirección de correo.']);
        }

        // Generate and send reset token (implementation not shown)
        // ...

        return redirect()->route('password.reset.message');
    }

    public function resetForm($token)
    {
        return view('auth.reset_password', ['token' => $token]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Verify token and get user (implementation not shown)
        // ...

        $user = Auth::user(); // Assume user is authenticated for simplicity

        if (Hash::check($request->password, $user->password)) {
            return redirect()->back()->withErrors(['password' => 'No puedes usar la misma contraseña que actualmente tienes.']);
        }

        foreach ($user->oldPasswords as $oldPassword) {
            if (Hash::check($request->password, $oldPassword->password)) {
                return redirect()->back()->withErrors(['password' => 'No puedes usar una contraseña que ya has usado anteriormente.']);
            }
        }

        OldPassword::create(['user_id' => $user->id, 'password' => $user->password]);

        $user->password = Hash::make($request->password);
        $user->save();

        return redirect()->route('login')->with('status', 'Contraseña cambiada exitosamente.');
    }
}
