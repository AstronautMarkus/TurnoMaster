@extends('layouts.auth_forms')
@section('title', 'TurnoMaster - Recuperar contraseña')

@section('content')

        <div class="text-white text-center mb-4">
            <h2 class="display-4">{{ __('Recuperar contraseña') }}</h2>
            <p class="lead">Introduce tu correo electrónico para recibir un enlace de recuperación de contraseña.</p>
        </div>

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
