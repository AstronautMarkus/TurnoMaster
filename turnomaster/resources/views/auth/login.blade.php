@extends('layouts.auth_forms')

@section('title', 'TurnoMaster - Iniciar Sesión')

@section('content')

@if ($errors->any())
    <div>
        @foreach ($errors->all() as $error)
            <p class="error_message">{{ $error }}</p>
        @endforeach
    </div>
@endif

<h3 class="header-title text-white">Iniciar Sesión</h3>
<form action="{{ route('login') }}" method="POST" class="login-form">
    @csrf
    <div class="form-group">
        <input type="email" id="email" name="email" class="form-control" placeholder="Correo Electrónico" required>
    </div>
    <div class="form-group position-relative">
        <input type="password" id="password" name="password" class="form-control" placeholder="Contraseña" required>
        <i class="bi bi-eye-slash toggle-password" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); cursor: pointer;"></i>
    </div>
    <div class="form-group">
        <div class="text-center"><a href="{{ route('password.request') }}">¿Olvidaste tu contraseña?</a></div>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
    </div>
    <div class="form-group">
        <div class="text-center text-white">¿Nuevo miembro? <a href="{{ route('register') }}">Regístrate ahora</a></div>
    </div>
</form>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const togglePassword = document.querySelector('.toggle-password');
        const passwordField = document.getElementById('password');

        togglePassword.addEventListener('click', function () {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.classList.toggle('bi-eye');
            this.classList.toggle('bi-eye-slash');
        });
    });
</script>
@endsection
