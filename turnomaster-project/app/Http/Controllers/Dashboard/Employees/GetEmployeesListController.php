<?php

namespace App\Http\Controllers\Dashboard\Employees;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\DashboardUser;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GetEmployeesListController extends Controller
{
    public function getEmployeesList(Request $request)
    {

        $token = $request->bearerToken();
        
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userCompany = $decoded->company_id; 
        $employees = DashboardUser::where('company_id', $userCompany)->get();

        return response()->json($employees);
    }
}
