@extends('layouts.auth_app')

@section('title', 'TurnoMaster - Password Reset Request')

@section('content')
<a href="{{ url('/') }}" class="home-button">
    <i class="bi bi-house-door-fill"></i>{{ __('Inicio') }}
</a>
<div>
    <div class="message-container">
        <div class="message-header">
            <img src="{{ asset('img/logo/TurnoMaster_lines.svg') }}" alt="TurnoMaster - password reset request" class="message-image">
            <div class="message-title">
                <h2>{{ __('Solicitud de restablecimiento de contraseña') }}</h2>
                <p>{{ session('status') ?? 'Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.' }}</p>
            </div>
        </div>
        <div class="message-footer">
            <a href="{{ route('login') }}" class="message-button">{{ __('Iniciar sesión') }}</a>
        </div>
    </div>
</div>
@endsection
