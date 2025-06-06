<?php

namespace App\Models\Shift;

use Illuminate\Database\Eloquent\Model;
use App\Models\Users\DashboardUser;
use App\Models\Turnos\Turnos;

class ShiftUser extends Model
{
    protected $table = 'shift_user';

    protected $fillable = [
        'user_id',
        'shift_id',
        'days',
        'is_active'
    ];

    protected $casts = [
        'days' => 'array',
        'is_active' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(DashboardUser::class);
    }

    public function shift()
    {
        return $this->belongsTo(Turnos::class);
    }

}

