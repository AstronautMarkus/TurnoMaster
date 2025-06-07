<?php

namespace App\Http\Controllers\Dashboard\Employees\Edit;

use App\Http\Controllers\Controller;
use App\Models\Users\DashboardUser;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Helpers\ActivityLogger;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class EditEmployeeController extends Controller
{
    public function editEmployee(Request $request, $id)
    {
        // Obtener el usuario autenticado desde el JWT
        $token = $request->bearerToken();
        $decoded = null;
        if ($token) {
            $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        }

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

        $allEmpty = true;
        foreach ($data as $value) {
            if (!is_null($value) && $value !== '') {
                $allEmpty = false;
                break;
            }
        }
        if ($allEmpty) {
            return response()->json([
                'message' => 'No se ha realizado ningún cambio.',
            ], 200);
        }

        $user = DashboardUser::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'El empleado no existe.',
            ], 404);
        }

        // Validate user type and permissions
        if (isset($decoded->user_type) && $decoded->user_type === 'employee') {
            $jwtRoleId = $decoded->role_id ?? null;
            $requestedRoleId = $data['role_id'] ?? null;

            // If user try to change their own role_id
            if ($user->id == $decoded->sub && array_key_exists('role_id', $data) && $data['role_id'] !== null && $data['role_id'] != $jwtRoleId) {
                return response()->json([
                    'message' => 'No puedes cambiarte tu rol asignado.',
                ], 403);
            }

            // If the user is an employee (3), they cannot edit any employee
            if ($jwtRoleId == 3) {
                return response()->json([
                    'message' => 'No tienes permisos para editar empleados.',
                ], 403);
            }

            // If user is a hr (2), they cannot change the role of an employee
            if ($jwtRoleId == 2 && array_key_exists('role_id', $data) && $data['role_id'] !== null) {
                return response()->json([
                    'message' => 'No tienes permisos para cambiar el rol de un empleado.',
                ], 403);
            }

            // If user is admin (1), they can change roles but with restrictions
            if ($jwtRoleId == 1) {
                // They cannot remove their own admin role
                if ($user->id == $decoded->sub && array_key_exists('role_id', $data) && $data['role_id'] !== null && $data['role_id'] != 1) {
                    return response()->json([
                        'message' => 'No puedes quitarte el rol de administrador.',
                    ], 403);
                }
                // They cannot assign admin role to another user
                if ($user->id != $decoded->sub && array_key_exists('role_id', $data) && $data['role_id'] == 1) {
                    return response()->json([
                        'message' => 'No puedes asignar el rol de administrador a otro usuario.',
                    ], 403);
                }
            }
        }
        // Si el usuario es company, puede hacer cualquier cambio (sin restricciones)
        

        $filteredData = array_filter($data, function ($value) {
            return !is_null($value) && $value !== '';
        });

        if (empty($filteredData)) {
            return response()->json([
                'message' => 'No se ha realizado ningún cambio.',
            ], 200);
        }

        // Start updating the user and logging the changes

        $original = $user->replicate();
        $user->update($filteredData);

        $fieldLabels = [ // Define labels for fields to be logged
            'first_name' => 'Nombre',
            'last_name'  => 'Apellido',
            'rut'        => 'RUT',
            'rut_dv'     => 'Dígito Verificador',
            'email'      => 'Correo',
            'role_id'    => 'Rol',
        ];

        $changes = [];

        foreach ($filteredData as $key => $newValue) {
            $oldValue = $original->$key;

            if ($oldValue != $newValue) {
                if ($key === 'role_id') {
                    $oldValue = Role::find($oldValue)?->name ?? $oldValue;
                    $newValue = Role::find($newValue)?->name ?? $newValue;
                }

                $label = $fieldLabels[$key] ?? ucfirst($key);
                $changes[] = "$label: '$oldValue' → '$newValue'";
            }
        }

        if (!empty($changes)) {
            $description = "Se editaron los siguientes campos del empleado {$user->first_name} {$user->last_name}: " . implode(', ', $changes);

            ActivityLogger::log(
                $request,
                'modificó a',
                $description,
                $user
            );
        }

        // End logging activity
        

        return response()->json([
            'message' => 'Empleado actualizado exitosamente.',
            'user' => $user,
        ], 200);
    }
}
