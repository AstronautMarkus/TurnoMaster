<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription_detail extends Model
{
    protected $table = 'subscription_details';

    protected $fillable = [
        'company_id',
        'plan_id',
        'start_date',
        'end_date',
        'is_active',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function plan()
    {
        return $this->belongsTo(Subscriptions::class, 'plan_id');
    }
}
