<?php

namespace App\Http\Controllers\Dashboard\Roles;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GetRolesDataController extends Controller
{
    public function getRoles(Request $request)
    {
        $token = $request->bearerToken();
        $roles = collect();

        if ($token) {
                $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
                $userType = $decoded->user_type ?? null;
                $roleId = $decoded->role_id ?? null;

                if ($userType === 'company') {
                    // Can get all roles
                    $roles = Role::all(['id', 'name', 'description']);
                } elseif ($userType === 'employee') {
                    if ($roleId == 1) {
                        // Admin can create RH and Employees but not other Admins
                        $roles = Role::whereIn('id', [2, 3])->get(['id', 'name', 'description']);
                    } elseif ($roleId == 2) {
                        // RH only can create Employees
                        $roles = Role::where('id', 3)->get(['id', 'name', 'description']);
                    } else {
                        // Employee can't get any roles
                        $roles = collect();
                    }
                }
        }

        return response()->json($roles->values());
    }
}
