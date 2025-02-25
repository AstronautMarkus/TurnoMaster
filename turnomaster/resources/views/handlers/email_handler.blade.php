@extends('layouts.auth_app')

<link rel="stylesheet" href="{{ asset('css/auth/email_handler/email_handler.css') }}">

@section('title', 'TurnoMaster - Error de Verificación')

@section('content')
<a href="{{ url('/') }}" class="home-button">
    <i class="bi bi-house-door-fill"></i>{{ __('Inicio') }}
</a>
<div>
    <div class="login-container">
        <div class="login-header d-flex align-items-center">
            <img src="{{ asset('img/logo/TurnoMaster_lines.svg') }}" alt="Error Image" class="login-image">
            <div class="login-title">
                <h2>{{ __('Error de Verificación') }}</h2>
                <p>{{ __('Por favor, solicite un nuevo código de verificación.') }}</p>
            </div>
        </div>
        @if (session('error'))
            <p class="text-danger">{{ session('error') }}</p>
        @endif
    </div>
</div>
@endsection
