<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\CreateDemoUser;
use App\Http\Controllers\Contact\ContactFormsController;

Route::get('/test', function () {
    return response()->json(['message' => 'This is a test']);
});

Route::post('/create-demo-user', [CreateDemoUser::class, 'createDemoUser']);

Route::get('/contact-form-categories', [ContactFormsController::class, 'getCategories']);