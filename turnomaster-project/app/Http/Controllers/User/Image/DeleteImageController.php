<?php

namespace App\Http\Controllers\User\Image;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Users\User;
use App\Models\Users\DashboardUser;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class DeleteImageController extends Controller
{
    public function delete(Request $request)
    {
        // Extract and decode the JWT token
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['message' => 'Token no proporcionado.'], 401);
        }

        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $userId = $decoded->user_id;
            $userType = $decoded->user_type;

            if ($userType === 'company') {
                $user = User::find($userId);
            } elseif ($userType === 'employee') {
                $user = DashboardUser::find($userId);
            } else {
                return response()->json(['message' => 'Tipo de usuario inválido.'], 400);
            }

            if (!$user) {
                return response()->json(['message' => 'User no encontrado.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Token inválido.'], 401);
        }

        // Set the profile_photo field to null
        if ($user->profile_photo) {
            Storage::delete($user->profile_photo);
        }

        $user->profile_photo = null;
        $user->save();

        return response()->json(['message' => 'Imagen eliminada exitosamente.'], 200);
    }
}
