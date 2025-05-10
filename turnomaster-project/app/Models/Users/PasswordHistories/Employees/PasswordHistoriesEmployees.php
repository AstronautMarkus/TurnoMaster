<?php

namespace App\Models\Users\PasswordHistories\Employees;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PasswordHistoriesEmployees extends Model
{
    use HasFactory;

        protected $fillable = [
        'user_id',
        'password',
    ];
}
