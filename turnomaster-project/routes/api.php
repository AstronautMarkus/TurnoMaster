<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Carbon\Carbon;

// Create users controllers
use App\Http\Controllers\DemoUser\Create\CreateDemoUserController;
use App\Http\Controllers\Dashboard\Employees\Create\CreateEmployeeController;

// Contact forms and help controllers

use App\Http\Controllers\Contact\ContactFormsController;

// Forgot password controllers

use App\Http\Controllers\Auth\ForgotPassword\Companies\ForgotPasswordCompaniesController;
use App\Http\Controllers\Auth\ForgotPassword\Employees\ForgotPasswordEmployeesController;

// Reset password controllers

use App\Http\Controllers\Auth\ResetPassword\Companies\ResetPasswordCompaniesController;
use App\Http\Controllers\Auth\ResetPassword\Employees\ResetPasswordEmployeesController;

// Token controllers

use App\Http\Controllers\Auth\Token\TokenController;
use App\Http\Controllers\Auth\ValidateTokenController;

// Login controllers

use App\Http\Controllers\Auth\Login\LoginCompaniesController;
use App\Http\Controllers\Auth\Login\LoginEmployeesController;

// Logout controllers

use App\Http\Controllers\Auth\Logout\LogoutController;

// Get data controllers

use App\Http\Controllers\Dashboard\GetPersonalDataController;
use App\Http\Controllers\Dashboard\Roles\GetRolesDataController;
use App\Http\Controllers\Dashboard\Company\GetCompanyDataController;
use App\Http\Controllers\Dashboard\Employees\Get\GetEmployeesListController;


Route::post('/create/demo-user', [CreateDemoUserController::class, 'createDemoUser']);
Route::post('/create/employee', [CreateEmployeeController::class, 'createEmployee']);


Route::get('/contact-form-categories', [ContactFormsController::class, 'getCategories']);
Route::post('/contact-form', [ContactFormsController::class, 'sendMessage']);

Route::post('/login-companies', [LoginCompaniesController::class, 'login']);
Route::post('/login-employees', [LoginEmployeesController::class, 'login']);

Route::post('/logout', [LogoutController::class, 'logout']);


Route::post('/refresh', [TokenController::class, 'refresh']);



Route::post('/forgot-password/companies', [ForgotPasswordCompaniesController::class, 'sendResetLink']);
Route::post('/forgot-password/employees', [ForgotPasswordEmployeesController::class, 'sendResetLink']);

Route::post('/reset-password/companies', [ResetPasswordCompaniesController::class, 'resetPassword']);
Route::post('/reset-password/employees', [ResetPasswordEmployeesController::class, 'resetPassword']);

Route::get('/validate-reset-token/{token}', [ValidateTokenController::class, 'validateToken']);

Route::get('/roles', [GetRolesDataController::class, 'getRoles']);

// Protected routes

Route::middleware(['jwt.auth'])->group(function () {
    Route::get('/me', [GetPersonalDataController::class, 'getPersonalData']);
    Route::get('/company', [GetCompanyDataController::class, 'getCompanyData']);
    Route::get('/employees', [GetEmployeesListController::class, 'getEmployeesList']);
});