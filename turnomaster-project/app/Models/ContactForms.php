<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactForms extends Model
{
    protected $fillable = [
        'name',
        'last_name',
        'email',
        'cellphone',
        'company',
        'message_category_id',
        'message',
    ];

    public function category()
    {
        return $this->belongsTo(ContactFormCategories::class, 'message_category_id');
    }
}
