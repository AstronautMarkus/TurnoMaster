<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\PasswordController;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/dashboard');
    }
    return view('home.home');
});

Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/register', function () {
    return view('auth.register');
})->name('register');

Route::get('/forgot-password', function () {
    return view('auth.forgot_password');
})->name('forgot.password');

Route::post('/forgot-password', [PasswordController::class, 'requestReset'])->name('password.request');

Route::get('/reset-password/{token}', [PasswordController::class, 'resetForm'])->name('password.reset.form');

Route::get('/reset-password', [PasswordController::class, 'resetForm'])->name('password.reset.form');
Route::post('/reset-password', [PasswordController::class, 'resetPassword'])->name('password.reset');

Route::get('/password-reset-message', function () {
    return view('auth.password_reset_message');
})->name('password.reset.message');

Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('register-message', function () {
    return view('auth.register_message');
})->name('register.message');

Route::get('verify-account/{code}', [VerificationController::class, 'verify'])->name('verify.account');

Route::get('email-handler', function () {
    return view('handlers.email_handler');
})->name('email.handler');

Route::middleware(['auth'])->group(function () {
    
    Route::get('/dashboard', function () {
        return view('dashboard.dashboard_home');
    });

    Route::get('/dashboard/profile', function () {
        return view('dashboard.dashboard_profile');
    });

});

Route::get('/features', function () {
    return view('home.features');
});

Route::get('/pricing', function () {
    return view('home.pricing');
});

Route::get('/about-us', function () {
    return view('home.about-us');
});