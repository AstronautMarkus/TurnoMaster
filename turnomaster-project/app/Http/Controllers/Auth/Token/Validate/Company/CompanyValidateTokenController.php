<?php

namespace App\Http\Controllers\Auth\Token\Validate\Company;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\Users\PasswordResets\Companies\PasswordResetsCompanies;

class CompanyValidateTokenController extends Controller
{
    public function validateCompaniesToken(Request $request, $token)
    {

        $record = PasswordResetsCompanies::where('token', $token)->first();

        if (!$record) {
            return response()->json(['valid' => false], 404);
        }

        if ($record->revoked) {
            return response()->json(['valid' => false, 'reason' => 'revoked'], 403);
        }

        return response()->json(['valid' => true]);
    }
}
