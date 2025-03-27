@extends('layouts.auth_app')

@section('title', 'TurnoMaster - Register')

@section('content')
<div class="container d-flex justify-content-center">
    <div class="info-container">
        
        <h2>{{ __('Gracias por preferir TurnoMaster!') }}</h2>
        <p>{{ __('Descubre cómo TurnoMaster puede mejorar la gestión de tu negocio con nuestra demo gratuita.') }}</p>
        <ul>
            <li><i class="bi bi-check-circle-fill"></i>{{ __('Optimiza la gestión de turnos') }}</li>
            <li><i class="bi bi-check-circle-fill"></i>{{ __('Conecta mejor con tus empleados') }}</li>
            <li><i class="bi bi-check-circle-fill"></i>{{ __('Aumenta la eficiencia operativa') }}</li>
            <li><i class="bi bi-check-circle-fill"></i>{{ __('Acceso a reportes detallados') }}</li>
        </ul>
    </div>
    <div class="auth-container">
        <div class="auth-header d-flex align-items-center">
            <img src="{{ asset('img/logo/TurnoMaster_lines.svg') }}" alt="auth Image" class="auth-image">
            <div class="auth-title">
                <h2>{{ __('Registrarse') }}</h2>
                <p>Crea una cuenta para poder utilizar nuestra demo gratuita.</p>
            </div>
        </div>
        <form method="POST" action="{{ route('register') }}" id="register-form">
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
            <div class="input-group d-flex justify-content-center">
                <div class="cf-turnstile" data-sitekey="{{ env('TURNSTILE_SITE_KEY') }}"></div>
            </div>
            <button type="submit" class="auth-button">{{ __('Registrarse') }}</button>
            <div class="auth-footer">
                <p>¿Ya tienes una cuenta? <a class="auth-text" href="{{ route('login') }}">Inicia sesión</a></p>
            </div>
        </form>
    </div>
</div>

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
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

    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        var form = this;
        var turnstileResponse = document.querySelector('.cf-turnstile input[name="cf-turnstile-response"]').value;

        fetch('{{ route('turnstile.verify') }}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            body: JSON.stringify({ 'cf-turnstile-response': turnstileResponse })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                form.submit();
            } else {
                alert('La verificación de Turnstile falló. Por favor, inténtalo de nuevo.');
            }
        });
    });
</script>
@endsection

@push('scripts')
<script>
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.href = "{{ route('register.message') }}";
    });
</script>
@endpush
