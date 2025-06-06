<?php

namespace App\Http\Controllers\Dashboard\Company\Images\Update;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Users\User;
use App\Models\Companies;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Str;

class UpdateCompanyImageController extends Controller
{
    public function UpdateCompanyImage(Request $request)
    {
        $request->validate([
            'company_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['message' => 'Token no proporcionado.'], 401);
        }

        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $userId = $decoded->user_id ?? null;
            $companyId = $decoded->company_id ?? null;

            if (!$userId || !$companyId) {
                return response()->json(['message' => 'Token inválido.'], 401);
            }

            $user = User::find($userId);
            $company = Companies::find($companyId);

            if (!$user || !$company) {
                return response()->json(['message' => 'Usuario o compañía no encontrados.'], 404);
            }

            // Only Owner can change the photo (emails must match)
            if ($user->email !== $company->owner_email) {
                return response()->json(['message' => 'Solo el dueño de la empresa puede cambiar la foto de la empresa.'], 403);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Token inválido.'], 401);
        }

        if ($company->profile_photo) {
            Storage::delete($company->profile_photo);
        }

        $file = $request->file('company_image');
        // generate an unique filename based on company name and owner email
        $filename = Str::slug($company->name . '-' . $company->owner_email) . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('company_images', $filename);

        $company->profile_photo = $path;
        $company->save();

        return response()->json(['message' => 'Imagen de la empresa actualizada exitosamente.', 'profile_photo' => $path], 200);
    }
}
