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

Route::post('/create-demo-user', [CreateDemoUser::class, 'createDemoUser']);

Route::get('/contact-form-categories', [ContactFormsController::class, 'getCategories']);
Route::post('/contact-form', [ContactFormsController::class, 'sendMessage']);

Route::post('/login', [LoginController::class, 'login']);

Route::post('/logout', [LogoutController::class, 'logout']);

Route::post('/create-user', [CreateUserController::class, 'createUser']);
Route::post('/create-employee', [CreateEmployeeController::class, 'createEmployee']);

Route::post('/refresh', [TokenController::class, 'refresh']);

Route::middleware(['jwt.auth'])->group(function () {
    Route::get('/me', function (Request $request) {
        return response()->json([
            'user' => $request->auth_user,
        ]);
    });
});

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink']);

Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

Route::get('/validate-reset-token/{token}', [ValidateTokenController::class, 'validateToken']);