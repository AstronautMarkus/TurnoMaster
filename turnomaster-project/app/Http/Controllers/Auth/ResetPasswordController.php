<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\PasswordHistory;
use Carbon\Carbon;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        try {   
            $validatedData = $request->validate([
                'token' => 'required|string',
                'password' => 'required|string|min:6|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
                'confirm_password' => 'required|string|same:password',
            ], [
                'token.required' => 'El token es obligatorio.',
                'password.required' => 'La nueva contraseña es obligatoria.',
                'password.min' => 'La contraseña debe tener al menos 6 caracteres.',
                'password.regex' => 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.',
                'confirm_password.required' => 'La confirmación de la contraseña es obligatoria.',
                'confirm_password.same' => 'La confirmación de la contraseña no coincide.',
            ]);

            $record = DB::table('password_resets')->where('token', $request->token)->first();

            if (!$record) {
                return response()->json(['message' => 'Token inválido o expirado.'], 400);
            }

            $expiresAt = Carbon::parse($record->created_at)->addMinutes(60);
            if (Carbon::now()->greaterThan($expiresAt)) {
                DB::table('password_resets')->where('token', $request->token)->delete();
                return response()->json(['message' => 'El token ha expirado.'], 400);
            }

            $user = User::where('email', $record->email)->first();
            if (!$user) {
                return response()->json(['message' => 'Usuario no encontrado.'], 404);
            }

            if (Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'La nueva contraseña no puede ser igual a la contraseña actual.',
                ], 422);
            }

            $usedBefore = PasswordHistory::where('user_id', $user->id)->get()
                ->contains(function ($history) use ($request) {
                    return Hash::check($request->password, $history->password);
                });

            if ($usedBefore) {
                return response()->json([
                    'message' => 'No puedes utilizar una contraseña que ya has usado antes.',
                ], 422);
            }

            PasswordHistory::create([
                'user_id' => $user->id,
                'password' => $user->password,
            ]);

            $user->password = Hash::make($request->password);
            $user->save();

            DB::table('password_resets')->where('email', $user->email)->delete();

            Log::info("Contraseña actualizada para el usuario: {$user->email}");

            return response()->json([
                'message' => '¡Tu contraseña ha sido actualizada exitosamente!',
            ]);
        } catch (ValidationException $e) {
            $errors = collect($e->errors())->mapWithKeys(function ($messages, $field) {
                $translations = [
                    'token' => 'El token es obligatorio.',
                    'password' => 'La nueva contraseña debe cumplir con los requisitos: al menos 6 caracteres, una letra mayúscula, una letra minúscula y un número.',
                    'confirm_password' => 'La confirmación de la contraseña es obligatoria.',
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
