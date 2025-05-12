<?php

namespace App\Http\Controllers\Dashboard\Employees\Get;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\DashboardUser;
use App\Models\Role;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GetEmployeesListController extends Controller
{
    public function getEmployeesList(Request $request)
    {

        $token = $request->bearerToken();
        
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userCompany = $decoded->company_id; 

        $employees = DashboardUser::where('company_id', $userCompany)
            ->paginate(10, ['id', 'first_name', 'last_name', 'rut', 'rut_dv', 'email', 'role_id', 'profile_photo']);

        $employees->getCollection()->transform(function ($employee) {
            $role = Role::find($employee->role_id);
            $employee->role = $role ? $role->name : null;
            $employee->profile_photo = $employee->profile_photo 
                ? url("api/assets/{$employee->profile_photo}") 
                : null;
            unset($employee->role_id);
            return $employee;
        });

        return response()->json($employees);
    }
}