<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CreateDemoUser extends Controller
{
    public function createDemoUser(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'company_name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $existingCompany = Company::where('name', $request->input('company_name'))->first();
        if ($existingCompany) {
            return response()->json([
                'message' => 'A demo user cannot be created for an existing company.',
                'company' => $existingCompany,
            ], 400);
        }


        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role_id' => 1, 
            'company_id' => null, 
            'is_trial' => true,
            'expires_at' => now()->addDays(7), 
            'temporary_password' => $request->input('password'),
        ]);


        $company = Company::create([
            'name' => $request->input('company_name'),
            'owner_id' => $user->id,
        ]);


        $user->update(['company_id' => $company->id]);

        return response()->json([
            'message' => 'Demo user and company created successfully.',
            'user' => $user,
            'company' => $company,
        ]);
    }
}
