@extends('layouts.auth_app')

<link rel="stylesheet" href="{{ asset('css/auth/register/register.css') }}">

@section('title', 'TurnoMaster - Register')

@section('content')
<a href="{{ url('/') }}" class="home-button">
    <i class="bi bi-house-door-fill"></i>{{ __('Inicio') }}
</a>
<div>
    <div class="login-container">
            <div class="login-header d-flex align-items-center">
                <img src="{{ asset('img/logo/TurnoMaster_lines.svg') }}" alt="Login Image" class="login-image">
                <div class="login-title">
                    <h2>{{ __('Registrarse') }}</h2>
                    <p>Crea una cuenta para continuar</p>
                </div>
            </div>
            <form method="POST" action="{{ route('register') }}">
                @csrf
                <div class="input-group">
                    <label for="name">{{ __('Nombre') }}</label>
                    <input id="name" type="text" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus placeholder="Ej: Kiara Morgan">
                    @error('name')
                        <p class="text-danger">{{ $message }}</p>
                    @enderror
                </div>
                <div class="input-group">
                    <label for="email">{{ __('Correo electrónico') }}</label>
                    <input id="email" type="email" name="email" value="{{ old('email') }}" required autocomplete="email" placeholder="ejemplo@correo.com">
                    @error('email')
                        <p class="text-danger">{{ $message }}</p>
                    @enderror
                </div>
                <div class="input-group">
                    <label for="password">{{ __('Contraseña') }}</label>
                    <div class="password-container">
                        <input id="password" type="password" name="password" required autocomplete="new-password" placeholder="********">
                        <button type="button" id="togglePassword">
                            <i class="bi bi-eye-fill"></i>
                        </button>
                    </div>
                    @error('password')
                        <p class="text-danger">{{ $message }}</p>
                    @enderror
                </div>
                <div class="input-group">
                    <label for="password-confirm">{{ __('Confirmar contraseña') }}</label>
                    <div class="password-container">
                        <input id="password-confirm" type="password" name="password_confirmation" required autocomplete="new-password" placeholder="********">
                        <button type="button" id="togglePasswordConfirm">
                            <i class="bi bi-eye-fill"></i>
                        </button>
                    </div>
                    @error('password_confirmation')
                        <p class="text-danger">{{ $message }}</p>
                    @enderror
                </div>
                <button type="submit" class="login-button">{{ __('Registrarse') }}</button>
                <div class="login-footer">
                    <p>¿Ya tienes una cuenta? <a class="login-text" href="{{ route('login') }}">Inicia sesión</a></p>
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
            this.innerHTML = '<i class="bi bi-eye-fill"></i>';
        }
    });

    document.getElementById('togglePasswordConfirm').addEventListener('click', function () {
        var passwordField = document.getElementById('password-confirm');
        var passwordFieldType = passwordField.getAttribute('type');
        if (passwordFieldType === 'password') {
            passwordField.setAttribute('type', 'text');
            this.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
        } else {
            passwordField.setAttribute('type', 'password');
            this.innerHTML = '<i class="bi bi-eye-fill"></i>';
        }
    });
</script>
@endsection
