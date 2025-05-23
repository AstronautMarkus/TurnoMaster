<?php

namespace App\Models\Shift;

use Illuminate\Database\Eloquent\Model;

class AttendanceStatus extends Model
{
    protected $table = 'attendance_statuses';

    protected $fillable = [
        'name',
        'slug'
    ];

    public function attendances()
    {
        return $this->hasMany(UserShiftAttendance::class, 'status_id');
    }
}

