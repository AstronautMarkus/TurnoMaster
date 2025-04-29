<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Companies;
use App\Models\Users\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class CreateDemoUserController extends Controller
{
    public function createDemoUser(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'rut' => 'required|string|unique:users,rut',
            'email' => 'required|email|unique:users,email',
            'company_name' => 'required|string|max:255',
        ], [
            'first_name.required' => 'El nombre es obligatorio.',
            'last_name.required' => 'El apellido es obligatorio.',
            'rut.required' => 'El RUT es obligatorio.',
            'rut.string' => 'El RUT debe ser una cadena de texto.',
            'rut.unique' => 'El RUT ya ha sido registrado.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
            'email.unique' => 'El correo electrónico ya ha sido registrado.',
            'company_name.required' => 'El nombre de la empresa es obligatorio.',
            'company_name.string' => 'El nombre de la empresa debe ser una cadena de texto.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $existingCompany = Companies::where('name', $request->input('company_name'))->first();
        if ($existingCompany) {
            return response()->json([
                'message' => 'Ya existe una cuenta de Demostración para esta empresa.',
                'company' => $existingCompany,
            ], 400);
        }

        
        $temporaryPassword = \Str::random(10);

        $company = Companies::create([
            'name' => $request->input('company_name'),
            'subscription_id' => 1,
        ]);

        $user = User::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'rut' => $request->input('rut'),
            'email' => $request->input('email'),
            'password' => Hash::make($temporaryPassword),
            'role_id' => 1,
            'is_trial' => true,
            'expires_at' => now()->addDays(7),
            'company_id' => $company->id,
        ]);

        
        $loginUrl = url('/auth/login/'); 
        Mail::send('emails.demo_user', [
            'name' => $user->name,
            'email' => $user->email,
            'password' => $temporaryPassword,
            'loginUrl' => $loginUrl,
        ], function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Credenciales cuenta de demostración | TurnoMaster');
        });

        return response()->json([
            'message' => 'Cuenta de demostración y empresa creados exitosamente. Se ha enviado un correo electrónico con los detalles de la cuenta.',
            'user' => $user,
            'company' => $company,
        ]);
    }
}
