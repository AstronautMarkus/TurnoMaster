<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ContactFormCategories;

class ContactFormsController extends Controller
{
    public function getCategories()
    {
        return response()->json(ContactFormCategories::select('id', 'name')->get());
    }
}
