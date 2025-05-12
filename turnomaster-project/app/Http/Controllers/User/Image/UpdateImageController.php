<?php

namespace App\Http\Controllers\User\Image;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Users\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class UpdateImageController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Extract and decode the JWT token
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['message' => 'Token not provided.'], 401);
        }

        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $userId = $decoded->sub; // Assuming 'sub' contains the user ID
            $user = User::find($userId);

            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Invalid token.'], 401);
        }

        // Delete the old profile photo if it exists
        if ($user->profile_photo) {
            Storage::delete($user->profile_photo);
        }

        // Store the new profile image
        $path = $request->file('profile_image')->store('profile_images');

        // Update the user's profile photo path
        $user->profile_photo = $path;
        $user->save();

        return response()->json(['message' => 'Profile image updated successfully.', 'profile_photo' => $path], 200);
    }
}
