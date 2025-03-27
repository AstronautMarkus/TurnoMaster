    @extends('layouts.auth_forms')

@section('title', 'TurnoMaster - Forgot Password')

@section('content')

        <h2 class="text-white text-center">{{ __('Recuperar contraseña') }}</h2>
        <p class="text-white text-center">Ingresa tu correo electrónico para recuperar tu contraseña</p>

        <form method="POST" action="{{ route('password.request') }}" class="login-form">
            @csrf
            <div class="form-group">
                <input id="email" type="email" name="email" class="form-control" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="Correo electrónico">
            </div>
            @if ($errors->any())
            <div class="error-messages">
                @foreach ($errors->all() as $error)
                    <p class="error_message">{{ $error }}</p>
                @endforeach
            </div>
            @endif
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">{{ __('Enviar enlace de recuperación') }}</button>
            </div>
            <div class="form-group">
                <div class="text-center text-white">¿Has recordado la contraseña? <br> <a href="{{ route('login') }}">Iniciar sesión</a></div>
            </div>
        </form>
@endsection
