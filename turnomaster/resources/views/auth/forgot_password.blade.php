@extends('layouts.auth_app')

<link rel="stylesheet" href="{{ asset('css/auth/forgot_password/forgot_password.css') }}">

@section('title', 'TurnoMaster - Forgot Password')

@section('content')
<a href="{{ url('/') }}" class="home-button">
    <i class="bi bi-house-door-fill"></i>{{ __('Inicio') }}
</a>
<div>
    <div class="login-container">
        <div class="login-header">
            <img src="{{ asset('img/logo/TurnoMaster_lines.svg') }}" alt="TurnoMaster - forgot password" class="login-image">
            <div class="login-title">
                <h2>{{ __('Recuperar contraseña') }}</h2>
                <p>Ingresa tu correo electrónico para recuperar tu contraseña</p>
            </div>
        </div>
        <form method="POST" action="#">
            @csrf
            <div class="input-group">
                <label for="email">{{ __('Correo electrónico') }}</label>
                <input id="email" type="email" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="ejemplo@correo.com">
            </div>
            @if ($errors->any())
            <div class="error-messages">
                @foreach ($errors->all() as $error)
                    <p class="text-danger">{{ $error }}</p>
                @endforeach
            </div>
            @endif
            <button type="submit" class="login-button">{{ __('Enviar enlace de recuperación') }}</button>
            <div class="login-footer">
                <p>¿Recordaste tu contraseña? <a class="login-text" href="{{ route('login') }}">Iniciar sesión</a></p>
            </div>
        </form>
    </div>
</div>
@endsection
