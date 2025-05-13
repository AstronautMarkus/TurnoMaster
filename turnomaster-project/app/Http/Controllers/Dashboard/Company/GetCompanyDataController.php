<?php

namespace App\Http\Controllers\Dashboard\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\DashboardUser;
use App\Models\Companies;
use App\Models\Role;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class GetCompanyDataController extends Controller
{
    public function getCompanyData(Request $request)
    {
        $authorizationHeader = $request->header('Authorization');

        if (!$authorizationHeader || !str_starts_with($authorizationHeader, 'Bearer ')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $token = substr($authorizationHeader, 7);

        try {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
            $companyId = $decoded->company_id ?? null;

            if (!$companyId) {
            return response()->json(['error' => 'Company ID not found in token'], 400);
            }

            $company = Companies::find($companyId);

            if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
            }

            $adminEmployeesCount = DashboardUser::where('company_id', $companyId)->where('role_id', 1)->count();
            $hrEmployeesCount = DashboardUser::where('company_id', $companyId)->where('role_id', 2)->count();
            $employeesCount = DashboardUser::where('company_id', $companyId)->where('role_id', 3)->count();

            return response()->json([
                'company' => [
                    'name' => $company->name,
                    'email' => $company->owner_email,
                    'created_at' => $company->created_at,
                    'updated_at' => $company->updated_at,
                    'profile_image' => $company->profile_image,
                ],
                'employees' => [
                    'total' => $adminEmployeesCount + $hrEmployeesCount + $employeesCount,
                    'details' => [
                        'admin' => $adminEmployeesCount,
                        'hr' => $hrEmployeesCount,
                        'employee' => $employeesCount,
                    ],
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    }
}
