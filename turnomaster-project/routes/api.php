<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\CreateDemoUser;
use App\Http\Controllers\Contact\ContactFormsController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\CreateUserController;
use App\Http\Controllers\Auth\ForgotpasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use Carbon\Carbon;
use App\Http\Controllers\AuthController;


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

Route::post('/forgot-password', [ForgotpasswordController::class, 'sendResetLink']);
Route::post('/reset-password', [ResetPasswordController::class, 'reset']);
Route::get('/validate-reset-token/{token}', function ($token) {
    $record = DB::table('password_resets')->where('token', $token)->first();

    if (!$record) {
        return response()->json(['valid' => false], 404);
    }

    $expiresAt = Carbon::parse($record->created_at)->addMinutes(60);
    if (Carbon::now()->greaterThan($expiresAt)) {
        return response()->json(['valid' => false], 410); // Token expirado
    }

    return response()->json(['valid' => true]);
});



