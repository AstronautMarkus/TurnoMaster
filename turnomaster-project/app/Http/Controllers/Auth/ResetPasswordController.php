<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\PasswordHistory;
use Carbon\Carbon;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'password' => 'required|string|min:6',
        ], [
            'password.required' => 'La nueva contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener al menos 6 caracteres.',
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
    }
}
