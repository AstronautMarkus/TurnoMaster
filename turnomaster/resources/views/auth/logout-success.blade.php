@extends('layouts.auth_app')

<link rel="stylesheet" href="{{ asset('css/auth/logout-success/logout-success.css') }}">

@section('title', 'TurnoMaster - Sesión cerrada')

@section('content')
<div>
    <div class="login-container">
        <div class="login-header">
            <div class="login-content">
                <img src="{{ asset('img/logo/TurnoMaster_black.svg') }}" alt="Logout Image" class="login-image">
                <h2>{{ __('Has cerrado sesión') }}</h2>
            </div>
            <div class="login-title">
                <p>{{ __('Has cerrado sesión correctamente. Gracias por usar TurnoMaster.') }}</p>
                <p>{{ __('Serás redirigido automáticamente en un instante.') }}</p>
            </div>

        </div>
    </div>
</div>
@endsection
