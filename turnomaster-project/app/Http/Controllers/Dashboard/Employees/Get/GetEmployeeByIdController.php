<?php

namespace App\Http\Controllers\Dashboard\Employees\Get;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\DashboardUser;
use App\Models\Role;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GetEmployeeByIdController extends Controller
{
    public function getEmployeeById(Request $request, $id)
    {
        $token = $request->bearerToken();
        
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userCompany = $decoded->company_id;

        $employee = DashboardUser::where('company_id', $userCompany)
            ->where('id', $id)
            ->select(['id', 'first_name', 'last_name', 'rut', 'rut_dv', 'email', 'role_id'])
            ->first();

        if (!$employee) {
            return response()->json(['error' => 'Empleado no encontrado'], 404);
        }

        $role = Role::find($employee->role_id);
        $employee->role = $role ? $role->name : null;
        unset($employee->role_id);

        return response()->json($employee);
    }
}
