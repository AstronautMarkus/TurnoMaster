<?php

namespace App\Http\Controllers\User\Image;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Users\User;

class ServeImageController extends Controller
{
    public function serve(Request $request)
    {
        $userId = $request->input('id');
        $user = User::find($userId);

        if (!$user || !$user->profile_photo || !Storage::exists($user->profile_photo)) {
            return response()->json(['message' => 'Imagen no encontrada.'], 404);
        }

        return response()->file(Storage::path($user->profile_photo));
    }
}
