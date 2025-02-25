@extends('layouts.auth_app')

@section('title', 'TurnoMaster - Verificación de Correo')

@section('content')
<div class="verification-message-container">
    <h2>{{ __('Verificación de Correo') }}</h2>
    <p>{{ __('Hemos enviado un correo electrónico con un enlace de verificación. Por favor, revise su correo para activar su cuenta.') }}</p>
</div>
@endsection
