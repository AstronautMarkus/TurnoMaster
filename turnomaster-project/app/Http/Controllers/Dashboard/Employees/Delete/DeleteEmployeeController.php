<?php

namespace App\Http\Controllers\Dashboard\Employees\Delete;

use App\Http\Controllers\Controller;
use App\Models\Users\DashboardUser;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class DeleteEmployeeController extends Controller
{
    public function deleteEmployee(Request $request, $id)
    {

        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userType = $decoded->user_type;
        $userId = $decoded->user_id;
        $companyId = $decoded->company_id;

        $user = DashboardUser::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'El empleado no existe.',
            ], 404);
        }

        if ($userType === 'employee') {
            
            if ($userId == $id) {
                return response()->json([
                    'message' => 'No puedes eliminarte a ti mismo.',
                ], 403);
            }
            
            if ($user->company_id != $companyId) {
                return response()->json([
                    'message' => 'No tienes permiso para eliminar empleados de otra empresa.',
                ], 403);
            }
        }
        

        $user->delete();

        return response()->json([
            'message' => 'Empleado eliminado exitosamente.',
        ], 200);
    }
}
