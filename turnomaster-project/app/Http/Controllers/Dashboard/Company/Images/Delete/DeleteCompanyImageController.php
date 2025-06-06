<?php

namespace App\Http\Controllers\Dashboard\Company\Images\Delete;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Companies;
use App\Models\Users\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Storage;

class DeleteCompanyImageController extends Controller
{
    public function DeleteCompanyImage(Request $request)
    {
        
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
                return response()->json(['message' => 'Usuario o empresa no encontrados.'], 404);
            }

            // Only Owner can delete the photo (emails must match)
            if ($user->email !== $company->owner_email) {
                return response()->json(['message' => 'Solo el dueño de la empresa puede eliminar la foto de la empresa.'], 403);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Token inválido.'], 401);
        }

        if ($company->profile_photo) {
            Storage::delete($company->profile_photo);
            $company->profile_photo = null;
            $company->save();
        }

        return response()->json(['message' => 'Imagen de la empresa eliminada exitosamente.'], 200);
    }
}
