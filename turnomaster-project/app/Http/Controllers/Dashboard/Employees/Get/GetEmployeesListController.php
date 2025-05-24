<?php

namespace App\Http\Controllers\Dashboard\Employees\Get;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\DashboardUser;
use App\Models\Shift\ShiftUser;
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

        $query = DashboardUser::where('company_id', $userCompany);

        if ($request->has('name') && !empty($request->query('name'))) {
            $name = $request->query('name');
            $query->where(function ($q) use ($name) {
                $q->where('first_name', 'like', "%{$name}%")
                  ->orWhere('last_name', 'like', "%{$name}%");
            });
        }

        $employees = $query->paginate(10, ['id', 'first_name', 'last_name', 'rut', 'rut_dv', 'email', 'role_id', 'profile_photo']);

        $employees->getCollection()->transform(function ($employee) {
            $role = Role::find($employee->role_id);
            $employee->role = $role ? $role->name : null;
            $employee->profile_photo = $employee->profile_photo 
                ? url("api/assets/{$employee->profile_photo}") 
                : null;

            $shiftCount = ShiftUser::where('user_id', $employee->id)->count();
            $employee->has_shift = $shiftCount > 0;
            $employee->shift_count = $shiftCount > 0 ? $shiftCount : null;

            return $employee;
        });

        return response()->json($employees);
    }
}