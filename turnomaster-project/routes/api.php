<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

// Create data controllers
use App\Http\Controllers\DemoUser\Create\CreateDemoUserController;
use App\Http\Controllers\Dashboard\Employees\Create\CreateEmployeeController;
use App\Http\Controllers\Dashboard\Turnos\Create\CreateTurnosController;
use App\Http\Controllers\Dashboard\Turnos\ShiftUser\Create\CreateShiftUsersController;

// Update data controllers
use App\Http\Controllers\Dashboard\Turnos\Edit\EditTurnosController;
use App\Http\Controllers\Dashboard\Company\Edit\EditCompanyDataController;
use App\Http\Controllers\Dashboard\Employees\Edit\EditEmployeeController;
use App\Http\Controllers\Dashboard\Turnos\ShiftUser\Edit\EditShiftUsersController;
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
use App\Http\Controllers\Auth\Token\GenericTokenController;

use App\Http\Controllers\Auth\Token\Validate\Company\CompanyValidateTokenController;
use App\Http\Controllers\Auth\Token\Validate\Employees\EmployeesValidateTokenController;

// Login controllers

use App\Http\Controllers\Auth\Login\LoginCompaniesController;
use App\Http\Controllers\Auth\Login\LoginEmployeesController;

// Logout controllers

use App\Http\Controllers\Auth\Logout\LogoutController;

// Get data controllers

use App\Http\Controllers\Dashboard\GetPersonalDataController;
use App\Http\Controllers\Dashboard\Personal\Get\GetPersonalShiftController;
use App\Http\Controllers\Dashboard\Roles\GetRolesDataController;
use App\Http\Controllers\Dashboard\Company\GetCompanyDataController;
use App\Http\Controllers\Dashboard\Employees\Get\GetEmployeesListController;
use App\Http\Controllers\Dashboard\Employees\Get\GetEmployeeByIdController;
use App\Http\Controllers\Dashboard\Turnos\Get\GetTurnosController;
use App\Http\Controllers\Dashboard\Turnos\Get\GetTurnosByIdController;
use App\Http\Controllers\Dashboard\Turnos\ShiftUser\Get\GetShiftUsersByIdController;
use App\Http\Controllers\Dashboard\Themes\GetThemesController;
use App\Http\Controllers\Dashboard\Employees\Shifts\Get\GetEmployeesShiftsController;
use App\Http\Controllers\Audit\ActivityLogController;



// Delete controllers

use App\Http\Controllers\Dashboard\Employees\Delete\DeleteEmployeeController;
use App\Http\Controllers\Dashboard\Turnos\Delete\DeleteTurnosController;

// Image controllers

use App\Http\Controllers\User\Image\UpdateImageController;
use App\Http\Controllers\User\Image\ServeImageController;
use App\Http\Controllers\User\Image\DeleteImageController;

// Company image controllers
use App\Http\Controllers\Dashboard\Company\Images\Update\UpdateCompanyImageController;
use App\Http\Controllers\Dashboard\Company\Images\Delete\DeleteCompanyImageController;
use App\Http\Controllers\Dashboard\Company\Images\Serve\ServeCompanyImageController;


Route::post('/create/demo-user', [CreateDemoUserController::class, 'createDemoUser']);
Route::post('/create/employee', [CreateEmployeeController::class, 'createEmployee']);


Route::get('/contact-form-categories', [ContactFormsController::class, 'getCategories']);
Route::post('/contact-form', [ContactFormsController::class, 'sendMessage']);

Route::post('/login-companies', [LoginCompaniesController::class, 'login']);
Route::post('/login-employees', [LoginEmployeesController::class, 'login']);

Route::post('/logout', [LogoutController::class, 'logout']);


Route::post('/refresh', [GenericTokenController::class, 'refresh']);



Route::post('/forgot-password/companies', [ForgotPasswordCompaniesController::class, 'sendResetLink']);
Route::post('/forgot-password/employees', [ForgotPasswordEmployeesController::class, 'sendResetLink']);

Route::post('/reset-password/companies', [ResetPasswordCompaniesController::class, 'resetPassword']);
Route::post('/reset-password/employees', [ResetPasswordEmployeesController::class, 'resetPassword']);

Route::get('/themes', [GetThemesController::class, 'getThemesList']);

// Validate Reset token routes

Route::get('/validate-reset-token/company/{token}', [CompanyValidateTokenController::class, 'validateCompaniesToken']);
Route::get('/validate-reset-token/employees/{token}', [EmployeesValidateTokenController::class, 'validateEmployeesToken']);

// Protected routes with JWT authentication

Route::middleware(['jwt.auth'])->group(function () {
    Route::get('/me', [GetPersonalDataController::class, 'getPersonalData']);
    Route::get('/me/next-shift', [GetPersonalShiftController::class, 'getPersonalShift']);
    Route::get('/company', [GetCompanyDataController::class, 'getCompanyData']);
    Route::put('/company', [EditCompanyDataController::class, 'editCompanyData']);
    Route::get('/employees', [GetEmployeesListController::class, 'getEmployeesList']);
    Route::get('/employees/{id}', [GetEmployeeByIdController::class, 'getEmployeeById']);
    Route::put('/employees/{id}', [EditEmployeeController::class, 'editEmployee']);
    Route::delete('/employees/{id}', [DeleteEmployeeController::class, 'deleteEmployee']);
    Route::get('/employees/{id}/shifts', [GetEmployeesShiftsController::class, 'getEmployeeShiftsById']);
    Route::post('/user/profile-image', [UpdateImageController::class, 'update']);
    Route::delete('/user/profile-image', [DeleteImageController::class, 'delete']);
    Route::post('/company/profile-image', [UpdateCompanyImageController::class, 'UpdateCompanyImage']);
    Route::delete('/company/profile-image', [DeleteCompanyImageController::class, 'DeleteCompanyImage']);
    Route::get('/company/{companyId}/profile-image', [ServeCompanyImageController::class, 'ServeCompanyImagea']);
    Route::get('/turnos', [GetTurnosController::class, 'getTurnos']);
    Route::get('/turnos/{id}', [GetTurnosByIdController::class, 'getTurnoById']);
    Route::post('/turnos', [CreateTurnosController::class, 'createTurnos']);
    Route::put('/turnos/{id}', [EditTurnosController::class, 'updateTurnos']);
    Route::delete('/turnos/{id}', [DeleteTurnosController::class, 'deleteTurnos']);
    Route::get('/turnos/shift/{id}', [GetShiftUsersByIdController::class, 'getShiftUserById']);
    Route::put('/turnos/shift/{id}/{shiftUserId}', [EditShiftUsersController::class, 'editShiftUser']);
    Route::post('/turnos/shift', [CreateShiftUsersController::class, 'createShiftUser']);
    Route::get('/roles', [GetRolesDataController::class, 'getRoles']);
    Route::get('/activity-logs', [ActivityLogController::class, 'getActivityLog']);
});


Route::get('/assets/{path}', function ($path) {
    if (!Storage::exists($path)) {
        return response()->json(['message' => 'File not found.'], 404);
    }
    return response()->file(Storage::path($path));
})->where('path', '.*');