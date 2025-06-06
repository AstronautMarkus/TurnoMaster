<?php

namespace App\Helpers;

use App\Models\ActivityLog;
use App\Models\Users\User;
use App\Models\Users\DashboardUser;
use App\Models\Companies;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;

class ActivityLogger
{
    public static function log(Request $request, string $action, string $description, $target = null)
    {
        $token = $request->bearerToken();
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

        // Get actor based on user type
        $actor = match ($decoded->user_type) {
            'company'  => User::find($decoded->user_id),
            'employee' => DashboardUser::find($decoded->user_id),
            default    => null,
        };

        if (!$actor) return;

        // Get Company data
        $company = Companies::find($decoded->company_id);

        // Logs register
        return ActivityLog::create([
            'actor_type'    => get_class($actor),
            'actor_id'      => $actor->id,
            'actor_name'    => self::getName($actor),
            'actor_email'   => $actor->email ?? null,
            'action'        => $action,
            'target_type'   => $target ? get_class($target) : null,
            'target_id'     => $target?->id,
            'target_name'   => $target ? self::getName($target) : null,
            'company_id'    => $company?->id,
            'description'   => $description,
        ]);

    }

    protected static function getName($model)
    {
        return $model->name ?? ($model->first_name . ' ' . $model->last_name);
    }
}


