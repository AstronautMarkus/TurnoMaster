<?php

namespace App\Http\Controllers\Employees\Create;

use App\Http\Controllers\Controller;
use App\Models\Users\DashboardUser;
use App\Models\Role;
use App\Models\Companies;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class CreateEmployeeController extends Controller
{
    public function createEmployee(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'rut' => 'required|integer',
            'rut_dv' => 'required|string|max:1',
            'email' => 'required|email|unique:dashboard_users,email',
            'role_id' => 'required|integer',
            'company_id' => 'required|integer',
        ], [
            'first_name.required' => 'El nombre es obligatorio.',
            'first_name.string' => 'El nombre debe ser una cadena de texto.',
            'first_name.max' => 'El nombre no puede tener más de 50 caracteres.',
            'last_name.required' => 'El apellido es obligatorio.',
            'last_name.string' => 'El apellido debe ser una cadena de texto.',
            'last_name.max' => 'El apellido no puede tener más de 50 caracteres.',
            'rut.required' => 'El RUT es obligatorio.',
            'rut.integer' => 'El RUT debe ser un número entero.',
            'rut_dv.required' => 'El dígito verificador es obligatorio.',
            'rut_dv.string' => 'El dígito verificador debe ser una cadena de texto.',
            'rut_dv.max' => 'El dígito verificador no puede tener más de 1 carácter.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
            'email.unique' => 'El correo electrónico ya ha sido registrado.',
            'role_id.required' => 'El rol es obligatorio.',
            'role_id.integer' => 'El rol debe ser un número entero.',
            'company_id.required' => 'El ID de la empresa es obligatorio.',
            'company_id.integer' => 'El ID de la empresa debe ser un número entero.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'La validación ha fallado.',
                'errors' => $validator->errors(),
            ], 422);
        }

        if (!Role::find($request->role_id)) {
            return response()->json([
                'message' => 'El rol proporcionado no existe.',
            ], 422);
        }

        if (!Companies::find($request->company_id)) {
            return response()->json([
                'message' => 'La empresa proporcionada no existe.',
            ], 422);
        }

        $temporaryPassword = \Str::random(10);

        $user = DashboardUser::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'rut' => $request->rut,
            'rut_dv' => $request->rut_dv,
            'email' => $request->email,
            'password' => Hash::make($temporaryPassword),
            'role_id' => $request->role_id,
            'company_id' => $request->company_id,
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 201);
    }
}
