<?php

namespace App\Http\Controllers\User\Image;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Users\User;
use App\Models\Users\DashboardUser;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class UpdateImageController extends Controller
{
    public function update(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'profile_image.required' => 'La imagen de perfil es obligatoria.',
            'profile_image.image' => 'El archivo debe ser una imagen.',
            'profile_image.mimes' => 'La imagen debe ser de tipo: jpeg, png, jpg o gif.',
            'profile_image.max' => 'La imagen no debe superar los 2MB.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'La validación ha fallado.',
                'errors' => $validator->errors(),
            ], 422);
        }

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

        if ($user->profile_photo) {
            Storage::delete($user->profile_photo);
        }

        $file = $request->file('profile_image');
        $filename = Str::slug($user->first_name . '-' . $user->last_name . '-' . $user->rut) . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('profile_images', $filename);

        $user->profile_photo = $path;
        $user->save();

        return response()->json(['message' => 'Imagen actualizada exitosamente.', 'profile_photo' => $path], 200);
    }
}
