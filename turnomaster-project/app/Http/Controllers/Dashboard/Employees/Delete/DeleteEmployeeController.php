<?php

namespace App\Http\Controllers\Dashboard\Employees\Delete;

use App\Http\Controllers\Controller;
use App\Models\Users\DashboardUser;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Helpers\ActivityLogger;

class DeleteEmployeeController extends Controller
{
    public function deleteEmployee(Request $request, $id)
    {

        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userType = $decoded->user_type;
        $userId = $decoded->user_id;
        $companyId = $decoded->company_id;
        $RoleId = $decoded->role_id ?? null;

        $user = DashboardUser::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'El empleado no existe.',
            ], 404);
        }

        // Nobody can delete themselves
        if ($userId == $id) {
            return response()->json([
                'message' => 'No puedes eliminarte a ti mismo.',
            ], 403);
        }

        // Only 'company' and 'employee' types can delete with restrictions
        if ($userType === 'employee') {
            // Check if user belongs to the same company
            if ($user->company_id != $companyId) {
                return response()->json([
                    'message' => 'No tienes permiso para eliminar empleados de otra empresa.',
                ], 403);
            }

            // Admin (1) can delete rh and employees but not other admins
            if ($RoleId == 1) {
                if ($user->role_id == 1) {
                    return response()->json([
                        'message' => 'No puedes eliminar a otro administrador.',
                    ], 403);
                }
            }
            // RH (2) can delete employees (3) but not other RH or admins
            elseif ($RoleId == 2) {
                if ($user->role_id != 3) {
                    return response()->json([
                        'message' => 'No tienes permiso para eliminar este tipo de usuario.',
                    ], 403);
                }
            }
            // Employee (3) cannot delete anyone
            elseif ($RoleId == 3) {
                return response()->json([
                    'message' => 'No tienes permisos para eliminar empleados.',
                ], 403);
            }
        }

        // If user type is 'company', they can delete any employee, it's the owner of the company

        $user->delete();

        // Log the deletion activity

        ActivityLogger::log(
        $request,
        'eliminó a',
        'Se eliminó al empleado ' . $user->first_name . ' ' . $user->last_name,
        $user
        );

        // End logging activity

        return response()->json([
            'message' => 'Empleado eliminado exitosamente.',
        ], 200);
    }
}
