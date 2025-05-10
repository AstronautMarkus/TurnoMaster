<?php

namespace App\Models\Users\PasswordHistories\Companies;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PasswordHistoriesCompanies extends Model
{
    use HasFactory;

        protected $fillable = [
        'user_id',
        'password',
    ];
}
