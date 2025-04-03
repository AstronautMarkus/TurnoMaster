<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'role_id', 'company_id', 'is_trial', 'expires_at', 'temporary_password'
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

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function validatePassword(string $password): bool
    {
        if ($this->is_trial) {
            return $password === $this->temporary_password;
        }

        return Hash::check($password, $this->password);
    }
}