<?php

namespace App\Http\Controllers\Dashboard\Roles;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;

class GetRolesDataController extends Controller
{
    public function getRoles()
    {
        $roles = Role::all(['id', 'name', 'description']);
        return response()->json($roles);
    }
}
