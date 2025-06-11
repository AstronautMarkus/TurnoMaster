<?php

namespace App\Http\Controllers\Auth\Token\Validate\Employees;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\Users\PasswordResets\Employees\PasswordResetsEmployees;

class EmployeesValidateTokenController extends Controller
{
    public function validateEmployeesToken(Request $request, $token)
    {
        $record = PasswordResetsEmployees::where('token', $token)->first();

        if (!$record) {
            return response()->json(['valid' => false], 404);
        }

        if ($record->revoked) {
            return response()->json(['valid' => false, 'reason' => 'revoked'], 403);
        }

        return response()->json(['valid' => true]);
    }
}
