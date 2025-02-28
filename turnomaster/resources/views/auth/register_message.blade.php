@extends('layouts.auth_app')

<link rel="stylesheet" href="{{ asset('css/auth/register_message/register_message.css') }}">

@section('title', 'TurnoMaster - ¡Cuenta Creada!')

@section('content')
<div>
    <div class="login-container">
        <div class="login-header">
            <div class="header-content">
                <img src="{{ asset('img/logo/TurnoMaster_lines.svg') }}" alt="Login Image" class="login-image">
                <h2>{{ __('¡Cuenta Creada!') }}</h2>
            </div>
            <div class="login-title">
                <p>{{ __('¡Su cuenta ha sido creada con éxito! Por favor, revise su correo electrónico para activar su cuenta y comenzar a disfrutar de nuestra demo gratuita.') }}</p>
                <p>{{ __('Si no encuentra el correo en su bandeja de entrada, por favor revise su carpeta de spam o inténtelo de nuevo más tarde.') }}</p>
            </div>

            <a href="{{ url('/') }}" class="login-button">Volver a inicio</a>
            
        </div>
    </div>
</div>
@endsection
