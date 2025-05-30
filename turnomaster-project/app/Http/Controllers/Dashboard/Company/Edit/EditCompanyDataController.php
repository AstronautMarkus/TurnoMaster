<?php

namespace App\Http\Controllers\Dashboard\Company\Edit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Companies;
use App\Models\Role;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class EditCompanyDataController extends Controller
{
    public function editCompanyData(Request $request)
    {
        $authorizationHeader = $request->header('Authorization');

        if (!$authorizationHeader || !str_starts_with($authorizationHeader, 'Bearer ')) {
            return response()->json(['error' => 'No autorizado'], 401);
        }

        $token = substr($authorizationHeader, 7);

        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $companyId = $decoded->company_id ?? null;

            if (!$companyId) {
                return response()->json(['error' => 'No se encontro el ID de la empresa en el Token.'], 400);
            }

            $company = Companies::find($companyId);

            if (!$company) {
                return response()->json(['error' => 'Empresa no encontrada'], 404);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $company->name = $validated['name'];
            $company->save();

            return response()->json([
                'message' => 'Nombre de la empresa actualizado correctamente.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
    }
}
