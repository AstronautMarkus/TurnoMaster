<?php

namespace App\Http\Controllers\Auth\ForgotPassword\Companies;

use App\Http\Controllers\Controller;
use App\Models\Users\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class ForgotPasswordCompaniesController extends Controller
{
    public function sendResetLink(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
            ], [
                'email.required' => 'El campo correo electrónico es obligatorio.',
                'email.email' => 'El campo correo electrónico debe ser válido.',
            ]);

            $user = User::where('email', $request->input('email'))->first();

            if (!$user) {
                return response()->json([
                    'message' => 'No existe ninguna cuenta con ese correo electrónico.',
                ], 404);
            }

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
                    'name' => ucfirst($user->first_name) . ' ' . ucfirst($user->last_name),
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
        } catch (\Illuminate\Validation\ValidationException $e) {
            $errors = collect($e->errors())->mapWithKeys(function ($messages, $field) {
                $translations = [
                    'email' => 'El campo correo electrónico es obligatorio o no válido.',
                ];

                return [$field => $translations[$field] ?? implode(', ', $messages)];
            });

            return response()->json([
                'message' => 'Errores de validación',
                'errors' => $errors,
            ], 422);
        }
    }
}
