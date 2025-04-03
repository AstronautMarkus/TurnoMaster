<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\CreateDemoUser;
use App\Http\Controllers\Contact\ContactFormsController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\CreateUserController;

Route::get('/test', function () {
    return response()->json(['message' => 'This is a test']);
});

Route::post('/create-demo-user', [CreateDemoUser::class, 'createDemoUser']);

Route::get('/contact-form-categories', [ContactFormsController::class, 'getCategories']);
Route::post('/contact-form', [ContactFormsController::class, 'sendMessage']);

Route::post('/login', [LoginController::class, 'login']);
Route::post('/create-user', [CreateUserController::class, 'createUser']);