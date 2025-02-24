@extends('layouts.auth_app')

<link rel="stylesheet" href="{{ asset('css/auth/login/login.css') }}">

@section('title', 'TurnoMaster - Login')

@section('content')
<a href="{{ url('/') }}" class="home-button">
    <i class="bi bi-house-door-fill"></i>{{ __('Inicio') }}
</a>
<div>
    <div class="login-container">
        <div class="login-header">
            <img src="{{ asset('img/logo/TurnoMaster_lines.svg') }}" alt="TurnoMaster - login" class="login-image">
            <div class="login-title">
                <h2>{{ __('Iniciar sesión') }}</h2>
                <p>Accede a tu cuenta para continuar</p>
            </div>
        </div>
        <form method="POST" action="{{ route('login') }}">
            @csrf
            <div class="input-group">
                <label for="email">{{ __('Correo electrónico') }}</label>
                <input id="email" type="email" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="ejemplo@correo.com">
            </div>
            <div class="input-group">
                <label for="password">{{ __('Contraseña') }}</label>
                <div class="password-container">
                    <input id="password" type="password" name="password" required autocomplete="current-password" placeholder="********">
                    <button type="button" id="togglePassword">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                </div>
            </div>
            @if ($errors->any())
            <div class="error-messages">
                @foreach ($errors->all() as $error)
                    <p class="text-danger">{{ $error }}</p>
                @endforeach
            </div>
            @endif
            <div class="remember-me">
                <input type="checkbox" name="remember" id="remember">
                <label for="remember">{{ __('Recuérdame') }}</label>
            </div>
            <button type="submit" class="login-button">{{ __('Iniciar sesión') }}</button>
            <a class="forgot-password" href="#">{{ __('¿Olvidaste tu contraseña?') }}</a>
            <div class="login-footer">
                <p>¿No tienes una cuenta? <a class="login-text" href="{{ route('register') }}">Regístrate</a></p>
            </div>
        </form>
    </div>
</div>

<script>
    document.getElementById('togglePassword').addEventListener('click', function () {
        var passwordField = document.getElementById('password');
        var passwordFieldType = passwordField.getAttribute('type');
        if (passwordFieldType === 'password') {
            passwordField.setAttribute('type', 'text');
            this.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
        } else {
            passwordField.setAttribute('type', 'password');
            this.innerHTML = '<i class="bi bi-eye-fill'></i>';
        }
    });
</script>

@endsection
