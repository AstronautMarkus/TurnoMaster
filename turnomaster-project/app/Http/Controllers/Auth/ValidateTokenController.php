<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ValidateTokenController extends Controller
{
    public function validateToken($token)
    {
        $record = DB::table('password_resets')->where('token', $token)->first();

        if (!$record) {
            return response()->json(['valid' => false], 404);
        }

        $expiresAt = Carbon::parse($record->created_at)->addMinutes(60);
        if (Carbon::now()->greaterThan($expiresAt)) {
            return response()->json(['valid' => false], 410);
        }

        return response()->json(['valid' => true]);
    }
}
