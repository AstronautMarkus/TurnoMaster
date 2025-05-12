<?php

namespace App\Http\Controllers\Dashboard\Employees\Edit;

use App\Http\Controllers\Controller;
use App\Models\Users\DashboardUser;
use Illuminate\Http\Request;

class EditEmployeeController extends Controller
{
    public function editEmployee(Request $request, $id)
    {
        $validator = \Validator::make($request->all(), [
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'rut' => 'nullable|integer',
            'rut_dv' => 'nullable|string|max:1',
            'email' => 'nullable|email',
            'role_id' => 'nullable|integer|exists:roles,id',
        ], [
            'first_name.string' => 'El nombre debe ser una cadena de texto.',
            'first_name.max' => 'El nombre no puede tener más de 255 caracteres.',
            'last_name.string' => 'El apellido debe ser una cadena de texto.',
            'last_name.max' => 'El apellido no puede tener más de 255 caracteres.',
            'rut.integer' => 'El RUT debe ser un número entero.',
            'rut_dv.string' => 'El dígito verificador debe ser una cadena de texto.',
            'rut_dv.max' => 'El dígito verificador no puede tener más de 1 carácter.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
            'role_id.integer' => 'El rol debe ser un número entero.',
            'role_id.exists' => 'El rol proporcionado no existe.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'La validación ha fallado.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $request->only([
            'first_name', 'last_name', 'rut', 'rut_dv', 'email', 'role_id'
        ]);

        if (empty(array_filter($data))) {
            return response()->json([
                'message' => 'Debe proporcionar al menos un campo para actualizar.',
            ], 422);
        }

        $user = DashboardUser::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'El empleado no existe.',
            ], 404);
        }

        $user->update($data);

        return response()->json([
            'message' => 'Empleado actualizado exitosamente.',
            'user' => $user,
        ], 200);
    }
}
