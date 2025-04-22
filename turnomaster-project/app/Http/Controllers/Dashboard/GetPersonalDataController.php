<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User as UserModel;
use App\Models\Company;
use App\Models\Role;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GetPersonalDataController extends Controller
{
    public function getPersonalData(Request $request)
    {

        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {

            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $userId = $decoded->sub; // Sub contains the user ID
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }


        $user = UserModel::with(['role:id,name', 'company:id,name'])
            ->select('id', 'name', 'email', 'role_id', 'company_id')
            ->find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $isOwner = Company::where('owner_id', $user->id)->exists();

        $ownedCompanies = Company::where('owner_id', $user->id)
            ->select('id', 'name')
            ->get();

        $userData = [
            'id'    => $user->id,
            'name'  => $user->name,
            'email' => $user->email,
            'role'  => [
                'name' => isset($user->role->name) ? ucfirst($user->role->name) : null
            ],
            'companies' => [
                'owned' => $ownedCompanies,
            ],
        ];

        return response()->json($userData);
    }
}
