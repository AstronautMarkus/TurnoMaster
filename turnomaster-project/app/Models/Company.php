<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'owner_id'];


    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id')->withDefault(); // Handle nullable owner
    }

    public function employees()
    {
        return $this->hasMany(User::class);
    }
}
