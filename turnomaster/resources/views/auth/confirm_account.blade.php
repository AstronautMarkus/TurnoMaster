@extends('layouts.auth_app')

<link rel="stylesheet" href="{{ asset('css/auth/login/login.css') }}">

@section('title', 'TurnoMaster - Confirmar Cuenta')

@section('content')

<div>
    <div class="login-container">
        <div class="login-header">
            <img src="{{ asset('img/logo/TurnoMaster_lines.svg') }}" alt="TurnoMaster - confirm account" class="login-image">
            <div class="login-title">
                <h2>{{ __('Confirmar Cuenta') }}</h2>
                <p>Introduce el código de verificación para continuar</p>
            </div>
        </div>
        <form method="POST" action="{{ route('verification.verify') }}">
            @csrf
            <div class="input-group">
                <label for="code">{{ __('Código de Verificación') }}</label>
                <input id="code" type="text" name="code" required autofocus placeholder="Introduce el código">
                @error('code')
                    <p class="text-danger">{{ $message }}</p>
                @enderror
            </div>
            <button type="submit" class="login-button">{{ __('Confirmar') }}</button>
        </form>
    </div>
</div>
@endsection
