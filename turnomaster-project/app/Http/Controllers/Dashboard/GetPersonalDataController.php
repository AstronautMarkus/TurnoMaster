<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\User;
use App\Models\Users\DashboardUser;
use App\Models\Companies;
use App\Models\Role;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GetPersonalDataController extends Controller
{
    public function getPersonalData(Request $request)
    {

        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Token no proporcionado.'], 401);
        }


            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $userType = $decoded->user_type;
            $userCompany = $decoded->company_id; 
            $roleId = $decoded->role_id;


            if ($userType === 'company') {
                $user = User::where('id', $decoded->user_id)->first();
                if (!$user) {
                    return response()->json(['error' => 'Usuario no encontrado.'], 404);
                }

                $company = Companies::where('id', $userCompany)->first();
                if (!$company) {
                    return response()->json(['error' => 'Compañía no encontrada.'], 404);
                }

                $role = Role::where('id', $roleId)->first();
                if (!$role) {
                    return response()->json(['error' => 'Rol no encontrado.'], 404);
                }

                return response()->json([
                    'user' => [
                        'id' => $user->id,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'rut' => $user->rut,
                        'rut_dv' => $user->rut_dv,
                        'email' => $user->email,
                        'profile_photo' => $user->profile_photo 
                            ? url("api/assets/{$user->profile_photo}") 
                            : null,
                        'company_id' => $user->company_id,
                        'is_trial' => $user->is_trial,
                        'expires_at' => $user->expires_at,
                    ],
                    'company' => [
                        'id' => $company->id,
                        'name' => $company->name,
                        'owner_email' => $company->owner_email,
                        'logo' => $company->profile_photo 
                            ? url("api/assets/{$company->profile_photo}") 
                            : null,
                    ],
                    'role' => [
                        'id' => $role->id,
                        'name' => $role->name,
                        'description' => $role->description,
                    ],

                ]);

            } elseif ($userType === 'employee') {
                $user = DashboardUser::where('id', $decoded->user_id)->first();
                if (!$user) {
                    return response()->json(['error' => 'Empleado no encontrado.'], 404);
                }
                                $company = Companies::where('id', $userCompany)->first();
                if (!$company) {
                    return response()->json(['error' => 'Compañía no encontrada.'], 404);
                }

                $role = Role::where('id', $user->role_id)->first();
                if (!$role) {
                    return response()->json(['error' => 'Rol no encontrado.'], 404);
                }

                return response()->json([
                    'user' => [
                        'id' => $user->id,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'rut' => $user->rut,
                        'rut_dv' => $user->rut_dv,
                        'email' => $user->email,
                        'profile_photo' => $user->profile_photo 
                            ? url("api/assets/{$user->profile_photo}") 
                            : null,
                        'company_id' => $user->company_id,
                        'role_id' => $user->role_id,
                        'expires_at' => $user->expires_at,
                    ],
                    'company' => [
                        'id' => $company->id,
                        'name' => $company->name,
                        'owner_email' => $company->owner_email,
                        'logo' => $company->logo 
                            ? url("api/assets/{$company->profile_photo}") 
                            : null,
                    ],
                    'role' => [
                        'id' => $role->id,
                        'name' => $role->name,
                        'description' => $role->description,
                    ],
                ]);
            } else {
                return response()->json(['error' => 'Tipo de usuario inválido.'], 400);
            }

    }
}
