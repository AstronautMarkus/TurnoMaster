<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\CreateDemoUser;
use App\Http\Controllers\Contact\ContactFormsController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\CreateUserController;


Route::post('/create-demo-user', [CreateDemoUser::class, 'createDemoUser']);

Route::get('/contact-form-categories', [ContactFormsController::class, 'getCategories']);
Route::post('/contact-form', [ContactFormsController::class, 'sendMessage']);

Route::post('/login', [LoginController::class, 'login']);
Route::post('/create-user', [CreateUserController::class, 'createUser']);

Route::middleware(['jwt.auth'])->group(function () {
    Route::get('/me', function (Request $request) {
        return response()->json([
            'user' => $request->auth_user,
        ]);
    });
});
