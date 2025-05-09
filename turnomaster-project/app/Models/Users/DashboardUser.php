<?php

namespace App\Models\Users;

use Illuminate\Database\Eloquent\Model;

class DashboardUser extends Model
{
    protected $fillable = [
        'first_name', 'last_name', 'rut','rut_dv','email', 'password', 'company_id', 'role_id'
    ];

    protected $hidden = ['password'];

    protected $casts = [
        'rut' => 'integer',
        'rut_dv' => 'string'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

}
