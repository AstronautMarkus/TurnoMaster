<?php

namespace App\Models\RefreshTokens;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Users\DashboardUser;

class DashboardUserRefreshToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'token',
        'expires_at',
        'revoked',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'revoked' => 'boolean',
    ];


    public function user()
    {
        return $this->belongsTo(DashboardUser::class);
    }
}
