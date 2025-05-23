<?php

namespace App\Http\Controllers\Dashboard\Turnos\ShiftUser\Get;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift\ShiftUser;
use App\Models\DashboardUser;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class GetShiftUsersByIdController extends Controller
{
    public function getShiftUserById(Request $request, $id)
    {
        
    }
}
