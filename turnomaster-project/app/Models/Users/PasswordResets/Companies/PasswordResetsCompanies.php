<?php

namespace App\Models\Users\PasswordResets\Companies;

use Illuminate\Database\Eloquent\Model;

class PasswordResetsCompanies extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'email',
        'token',
        'created_at',
        'revoked',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'revoked' => 'boolean',
    ];

    /**
     * Check if the password reset has been revoked.
     *
     * @return bool
     */
    public function isRevoked()
    {
        return (bool) $this->revoked;
    }
}
