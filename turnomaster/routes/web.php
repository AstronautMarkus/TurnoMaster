<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VerificationController;

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

Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/email/verify', function () {
    return view('auth.confirm_account');
})->name('verification.notice');

Route::post('/email/verify', [AuthController::class, 'verify'])->name('verification.verify');

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