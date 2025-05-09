<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Carbon\Carbon;

use App\Http\Controllers\Auth\CreateDemoUserController;
use App\Http\Controllers\Contact\ContactFormsController;

use App\Http\Controllers\Auth\ForgotPassword\Companies\ForgotPasswordCompaniesController;
use App\Http\Controllers\Auth\ForgotPassword\Employees\ForgotPasswordEmployeesController;

use App\Http\Controllers\Auth\ResetPasswordController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\ValidateTokenController;

use App\Http\Controllers\Auth\Login\LoginCompaniesController;
use App\Http\Controllers\Auth\Login\LoginEmployeesController;

use App\Http\Controllers\Auth\Logout\LogoutController;

use App\Http\Controllers\Dashboard\GetPersonalDataController;

Route::post('/create-demo-user', [CreateDemoUserController::class, 'createDemoUser']);

Route::get('/contact-form-categories', [ContactFormsController::class, 'getCategories']);
Route::post('/contact-form', [ContactFormsController::class, 'sendMessage']);

Route::post('/login-companies', [LoginCompaniesController::class, 'login']);
Route::post('/login-employees', [LoginEmployeesController::class, 'login']);

Route::post('/logout', [LogoutController::class, 'logout']);



Route::post('/refresh', [TokenController::class, 'refresh']);

Route::middleware(['jwt.auth'])->group(function () {
    Route::get('/me', [GetPersonalDataController::class, 'getPersonalData']);
});

Route::post('/forgot-password/companies', [ForgotPasswordCompaniesController::class, 'sendResetLink']);
Route::post('/forgot-password/employees', [ForgotPasswordEmployeesController::class, 'sendResetLink']);

Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

Route::get('/validate-reset-token/{token}', [ValidateTokenController::class, 'validateToken']);