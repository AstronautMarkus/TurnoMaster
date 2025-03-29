<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class CreateDemoUser extends Controller
{
    public function createDemoUser(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'company_name' => 'required|string|max:255',
        ], [
            'email.unique' => 'El correo electrónico ya ha sido registrado.',
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
                'message' => 'Ya existe una cuenta de Demostración para esta empresa.',
                'company' => $existingCompany,
            ], 400);
        }

        
        $temporaryPassword = \Str::random(10);

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($temporaryPassword),
            'role_id' => 1,
            'company_id' => null,
            'is_trial' => true,
            'expires_at' => now()->addDays(7),
            'temporary_password' => $temporaryPassword,
        ]);

        $company = Company::create([
            'name' => $request->input('company_name'),
            'owner_id' => $user->id,
        ]);

        $user->update(['company_id' => $company->id]);

        
        $activationUrl = url('/activate-account/' . $user->id); 
        Mail::send('emails.demo_user', [
            'name' => $user->name,
            'email' => $user->email,
            'password' => $temporaryPassword,
            'activationUrl' => $activationUrl,
        ], function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Your Demo Account Details');
        });

        return response()->json([
            'message' => 'Cuenta de demostración y empresa creados exitosamente. Se ha enviado un correo electrónico para activarla.',
            'user' => $user,
            'company' => $company,
        ]);
    }
}
