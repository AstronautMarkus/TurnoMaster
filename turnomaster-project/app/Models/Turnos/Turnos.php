<?php

namespace App\Models\Turnos;

use Illuminate\Database\Eloquent\Model;

class Turnos extends Model
{
    protected $fillable = [
        'name',
        'description',
        'start_time',
        'has_lunch',
        'lunch_time',
        'end_time',
        'company_id',
        'total_hours',
    ];
}


