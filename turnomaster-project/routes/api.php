<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\CreateDemoUser;
use App\Http\Controllers\Contact\ContactFormsController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\CreateUserController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use Carbon\Carbon;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\ValidateTokenController;
use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Auth\LogoutController;

use App\Http\Controllers\Dashboard\GetPersonalDataController;

Route::post('/create-demo-user', [CreateDemoUser::class, 'createDemoUser']);

Route::get('/contact-form-categories', [ContactFormsController::class, 'getCategories']);
Route::post('/contact-form', [ContactFormsController::class, 'sendMessage']);

Route::post('/login', [LoginController::class, 'login']);

Route::post('/logout', [LogoutController::class, 'logout']);

Route::post('/create-user', [CreateUserController::class, 'createUser']);

Route::post('/refresh', [TokenController::class, 'refresh']);

Route::middleware(['jwt.auth'])->group(function () {
    Route::get('/me', [GetPersonalDataController::class, 'getPersonalData']);
});

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink']);

Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

Route::get('/validate-reset-token/{token}', [ValidateTokenController::class, 'validateToken']);