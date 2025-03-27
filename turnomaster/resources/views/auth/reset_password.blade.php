@extends('layouts.auth_forms')
@section('title', 'TurnoMaster - Restablecer Contraseña')

@section('content')

    <div class="text-white text-center mb-4">
                <h2 class="display-4">{{ __('Cambiar contraseña') }}</h2>
                <p class="lead">Introduce tu nueva contraseña para actualizarla en tu cuenta.</p>
    </div>

    <form method="POST" action="{{ route('password.reset') }}" class="login-form">
                @csrf
                <input type="hidden" name="token" value="{{ $token }}">
                <input type="hidden" name="email" value="{{ $email }}">
                <div class="form-group position-relative">
                    <input id="password" class="form-control" type="password" name="password" required autocomplete="new-password" placeholder="Nueva contraseña">
                    <i class="bi bi-eye-slash toggle-password" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); cursor: pointer;"></i>
                </div>
                <div class="form-group position-relative">
                    <input id="password_confirmation" class="form-control" type="password" name="password_confirmation" required autocomplete="new-password" placeholder="Confirmar contraseña">
                    <i class="bi bi-eye-slash toggle-password" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); cursor: pointer;"></i>
                </div>
                @if ($errors->any())
                    @foreach ($errors->all() as $error)
                        <p class="error_message">{{ $error }}</p>
                    @endforeach
                @endif
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">{{ __('Cambiar contraseña') }}</button>
                </div>
    </form>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const togglePasswordIcons = document.querySelectorAll('.toggle-password');

            togglePasswordIcons.forEach(icon => {
                icon.addEventListener('click', function () {
                    const passwordField = this.previousElementSibling;
                    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordField.setAttribute('type', type);
                    this.classList.toggle('bi-eye');
                    this.classList.toggle('bi-eye-slash');
                });
            });
        });
    </script>
@endsection
