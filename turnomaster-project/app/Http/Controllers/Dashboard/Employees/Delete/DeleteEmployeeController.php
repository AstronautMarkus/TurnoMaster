<?php

namespace App\Http\Controllers\Dashboard\Employees\Delete;

use App\Http\Controllers\Controller;
use App\Models\Users\DashboardUser;
use Illuminate\Http\Request;

class DeleteEmployeeController extends Controller
{
    public function deleteEmployee($id)
    {
        $user = DashboardUser::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'El empleado no existe.',
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'Empleado eliminado exitosamente.',
        ], 200);
    }
}
