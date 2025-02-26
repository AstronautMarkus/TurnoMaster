@extends('layouts.auth_app')

<link rel="stylesheet" href="{{ asset('css/auth/reset_password/reset_password.css') }}">

@section('title', 'TurnoMaster - Reset Password')

@section('content')
<a href="{{ url('/') }}" class="home-button">
    <i class="bi bi-house-door-fill"></i>{{ __('Inicio') }}
</a>
<div>
    <div class="login-container">
        <div class="login-header">
            <img src="{{ asset('img/logo/TurnoMaster_lines.svg') }}" alt="TurnoMaster - reset password" class="login-image">
            <div class="login-title">
                <h2>{{ __('Cambiar contraseña') }}</h2>
                <p>Ingresa tu nueva contraseña</p>
            </div>
        </div>
        <form method="POST" action="{{ route('password.reset') }}">
            @csrf
            <input type="hidden" name="token" value="{{ $token }}">
            <input type="hidden" name="email" value="{{ $email }}">
            <div class="input-group">
                <label for="password">{{ __('Nueva contraseña') }}</label>
                <input id="password" type="password" name="password" required autocomplete="new-password" placeholder="Nueva contraseña">
            </div>
            <div class="input-group">
                <label for="password_confirmation">{{ __('Confirmar contraseña') }}</label>
                <input id="password_confirmation" type="password" name="password_confirmation" required autocomplete="new-password" placeholder="Confirmar contraseña">
            </div>
            @if ($errors->any())
            <div class="error-messages">
                @foreach ($errors->all() as $error)
                    <p class="text-danger">{{ $error }}</p>
                @endforeach
            </div>
            @endif
            <button type="submit" class="login-button">{{ __('Cambiar contraseña') }}</button>
        </form>
    </div>
</div>
@endsection
