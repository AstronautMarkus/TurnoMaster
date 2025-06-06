<?php

namespace App\Models;
use App\Models\Companies;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $fillable = [
        'actor_type',
        'actor_id',
        'actor_name',
        'actor_email',
        'action',
        'target_type',
        'target_id',
        'target_name',
        'company_id',
        'description',
    ];

    public function company()
    {
        return $this->belongsTo(Companies::class, 'company_id');
    }

}
