@extends('layouts.auth_app')

<link rel="stylesheet" href="{{ asset('css/auth/register_message/register_message.css') }}">

@section('title', 'TurnoMaster - ¡Cuenta Creada!')

@section('content')
<a href="{{ url('/') }}" class="home-button">
    <i class="bi bi-house-door-fill"></i>{{ __('Inicio') }}
</a>
<div>
    <div class="login-container">
        <div class="login-header">
            <div class="header-content">
                <img src="{{ asset('img/logo/TurnoMaster_lines.svg') }}" alt="Login Image" class="login-image">
                <h2>{{ __('¡Cuenta Creada!') }}</h2>
            </div>
            <div class="login-title">
                <p>{{ __('¡Su cuenta ha sido creada con éxito! Por favor, revise su correo electrónico para activar su cuenta y comenzar a disfrutar de nuestra demo gratuita.') }}</p>
                <p>{{ __('Si no ha recibido el correo, revise su carpeta de spam o haga clic en el botón de abajo para reenviar el correo de verificación.') }}</p>
            </div>

            <a class="btn-resend">Reenviar correo</a>
            
        </div>
    </div>
</div>
@endsection
