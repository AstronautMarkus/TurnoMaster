<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class CreateEmployeeController extends Controller
{
    public function createEmployee(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
        ], [
            'name.required' => 'El nombre es obligatorio.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
            'email.unique' => 'El correo electrónico ya ha sido registrado.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $temporaryPassword = \Str::random(10);

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($temporaryPassword),
            'role_id' => 2, // Assuming 2 is the role ID for employees
            'company_id' => $request->input('company_id'),
            'is_trial' => false,
            'temporary_password' => $temporaryPassword,
        ]);

        $activationUrl = url('/activate-account/' . $user->id);
        Mail::send('emails.Create_employees', [
            'name' => $user->name,
            'email' => $user->email,
            'password' => $temporaryPassword,
            'activationUrl' => $activationUrl,
        ], function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Detalles de tu cuenta de empleado');
        });

        return response()->json([
            'message' => 'Cuenta de empleado creada exitosamente. Se ha enviado un correo electrónico para activarla.',
            'user' => $user,
        ]);
    }
}
