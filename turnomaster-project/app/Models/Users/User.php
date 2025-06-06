<?php

namespace App\Models\Users;


use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    protected $fillable = [
        'first_name', 'last_name', 'rut', 'rut_dv', 'email', 'password','profile_photo', 'company_id', 'is_trial', 'expires_at'
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'is_trial' => 'boolean',
        'expires_at' => 'datetime',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}