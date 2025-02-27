<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OldPassword extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'password'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
