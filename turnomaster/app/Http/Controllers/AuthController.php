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
use Illuminate\Support\Facades\Http;

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
            'activated_account' => false,
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
            return back()->withErrors(['email' => 'No se encontró una cuenta con esta dirección de correo.']);
        }

        if (! $user->activated_account) {
            return back()->withErrors(['email' => 'La cuenta no ha sido activada. Revisa tu correo para poder activarla.']);
        }

        if (! Hash::check($request->password, $user->password)) {
            return back()->withErrors(['password' => 'Usuario o contraseña incorrectos.']);
        }

        Auth::login($user);

        return redirect('/dashboard');
    }

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
        $user->activated_account = true;
        $user->email_verified_at = Carbon::now();
        $user->save();

        $verificationCode->delete();

        $userName = ucwords(strtolower($user->name));

        return redirect('/')->with('success', 'Su cuenta ha sido verificada exitosamente.')->with('verified', true)->with('userName', $userName);
    }

    public function verifyTurnstile(Request $request)
    {
        $response = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => env('TURNSTILE_SECRET_KEY'),
            'response' => $request->input('cf-turnstile-response'),
            'remoteip' => $request->ip(),
        ]);

        $data = $response->json();

        if ($data['success']) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['success' => false, 'error' => $data['error-codes']]);
        }
    }

}
