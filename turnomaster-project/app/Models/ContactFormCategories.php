<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactFormCategories extends Model
{
    protected $fillable = ['name'];

    public function contactForms()
    {
        return $this->hasMany(ContactForms::class, 'message_category_id');
    }
}
