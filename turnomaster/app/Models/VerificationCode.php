<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class VerificationCode extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'code', 'expires_at'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->expires_at)) {
                $model->expires_at = Carbon::now()->addMinutes(10); // Set default expiration time
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isExpired()
    {
        return Carbon::now()->greaterThan($this->expires_at);
    }
}
