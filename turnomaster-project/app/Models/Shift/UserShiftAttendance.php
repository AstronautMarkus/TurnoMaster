<?php

namespace App\Models\Shift;

use Illuminate\Database\Eloquent\Model;
use App\Models\Users\DashboardUser;
use App\Models\Turnos\Turnos;

class UserShiftAttendance extends Model
{
    protected $table = 'user_shift_attendance';

    protected $fillable = [
        'user_id',
        'shift_id',
        'date',
        'status_id',
        'check_in_time',
        'check_out_time',
        'note'
    ];

    protected $dates = ['date'];

    public function user()
    {
        return $this->belongsTo(DashboardUser::class);
    }

    public function shift()
    {
        return $this->belongsTo(Turnos::class);
    }

    public function status()
    {
        return $this->belongsTo(AttendanceStatus::class);
    }
}
