<?php

namespace App\Http\Controllers\Audit;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ActivityLogController extends Controller
{
    public function getActivityLog(Request $request)
    {
        $token = $request->bearerToken();
        if (!$token) {
            // paginate response with empty data
            return response()->json([
                'current_page' => 1,
                'data' => [],
                'first_page_url' => null,
                'from' => null,
                'last_page' => 1,
                'last_page_url' => null,
                'links' => [],
                'next_page_url' => null,
                'path' => $request->url(),
                'per_page' => 10,
                'prev_page_url' => null,
                'to' => null,
                'total' => 0,
            ]);
        }
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
        $userCompany = $decoded->company_id;

        $query = ActivityLog::query()->where('company_id', $userCompany);

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->input('start_date'));
        }
        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->input('end_date'));
        }

        $logs = $query->latest()->paginate(10);

        return response()->json($logs);
    }
}
