<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ListEmployeesController extends Controller
{
    public function getEmployeesByCompany(Request $request)
    {
        $companyId = $request->route('company_id');
        $company = \App\Models\Company::find($companyId);
        if (!$company) {
            return response()->json(['message' => 'La compañía no existe'], 404);
        }

        $users = \App\Models\User::where('company_id', $companyId)
            ->get(['id', 'name', 'email', 'company_id', 'role_id', 'created_at', 'updated_at']);

        if ($users->isEmpty()) {
            return response()->json(['message' => 'No se encontraron usuarios en esta compañía'], 404);
        }

        return response()->json($users);
    }

}
