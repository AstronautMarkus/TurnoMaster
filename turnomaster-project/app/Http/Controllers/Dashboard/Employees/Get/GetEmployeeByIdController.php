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

        
        $employee = DashboardUser::where('id', $id)
            ->select(['id', 'first_name', 'last_name', 'rut', 'rut_dv', 'email', 'role_id', 'company_id', 'profile_photo'])
            ->first();

        if (!$employee) {
            return response()->json(['error' => 'Empleado no encontrado.'], 404);
        }

        // Check if employee belongs to the user's company
        if ($employee->company_id != $userCompany) {
            return response()->json(['error' => 'Este empleado no pertenece a tu empresa.'], 403);
        }

        $role = Role::find($employee->role_id);
        $employee->role = $role ? $role->name : null;
        $employee->profile_photo = $employee->profile_photo 
            ? url("api/assets/{$employee->profile_photo}") 
            : null;

        return response()->json($employee);
    }
}
