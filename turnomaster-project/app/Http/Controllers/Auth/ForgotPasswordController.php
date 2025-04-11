<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;


class ForgotpasswordController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ], [
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser válido.',
            'email.exists' => 'No existe ninguna cuenta con ese correo electrónico.',
        ]);
    
        $user = User::where('email', $request->input('email'))->first();
    
        $token = Str::random(60);
    
        DB::table('password_resets')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => $token,
                'created_at' => Carbon::now(),
            ]
        );
    

        $resetLink = url('/auth/reset-password/' . $token); 


    
        try {
            Mail::send('emails.forgot_password', [
                'name' => $user->name,
                'email' => $user->email,
                'resetUrl' => $resetLink, 
            ], function ($message) use ($user) {
                $message->to($user->email)
                        ->subject('Recuperación de contraseña - TurnoMaster');
            });

    
            Log::info("Correo de recuperación enviado a: {$user->email}");
    
            return response()->json([
                'message' => 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.',
            ]);
        } catch (\Exception $e) {
            Log::error("Error al enviar correo a {$user->email}: " . $e->getMessage());
    
            return response()->json([
                'message' => 'No se pudo enviar el correo de recuperación.',
            ], 500);
        }
    }
    
}
