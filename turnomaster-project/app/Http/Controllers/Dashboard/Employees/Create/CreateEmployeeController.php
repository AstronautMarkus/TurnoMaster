<?php

namespace App\Http\Controllers\Dashboard\Employees\Create;

use App\Http\Controllers\Controller;
use App\Models\Users\DashboardUser;
use App\Models\Role;
use App\Models\Companies;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Helpers\ActivityLogger;

class CreateEmployeeController extends Controller
{
    public function createEmployee(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'rut' => 'required|integer',
            'rut_dv' => 'required|string|max:1',
            'email' => 'required|email',
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

        if (DashboardUser::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'El correo electrónico ya ha sido registrado.',
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
            'first_name' => ucfirst($request->first_name),
            'last_name' => ucfirst($request->last_name),
            'rut' => $request->rut,
            'rut_dv' => $request->rut_dv,
            'email' => $request->email,
            'password' => Hash::make($temporaryPassword),
            'role_id' => $request->role_id,
            'company_id' => $request->company_id,
        ]);

        $loginUrl = url('/auth/login/'); 

        $company = Companies::find($request->company_id);
        $companyName = $company->name;

        Mail::send('emails.employee_user', [
            'name' => ucfirst($user->first_name) . ' ' . ucfirst($user->last_name),
            'email' => $user->email,
            'password' => $temporaryPassword,
            'loginUrl' => $loginUrl,
            'companyName' => $companyName,
        ], function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Credenciales cuenta de empleado | TurnoMaster');
        });

        // Log the activity

        $role = Role::find($user->role_id);
        $roleName = $role ? $role->name : 'desconocido';

        ActivityLogger::log(
            $request,
            'creó a',
            'Se creó a ' . $user->first_name . ' con el rol de ' . $roleName . '.',
            $user
        );

        // End logging activity

        return response()->json([
            'message' => 'Cuenta de empleado creada exitosamente. Se ha enviado un correo electrónico a la dirección proporcionada con las credenciales de acceso.',
            'user' => $user,
        ], 201);
    }
}
