@extends('layouts.auth_forms')
@section('title', 'TurnoMaster - Solicitud de Restablecimiento de Contraseña')

@section('content')
<div class="text-white text-center">
    <h2 class="display-4">{{ __('Solicitud de restablecimiento de contraseña') }}</h2>
    <p class="lead">{{ session('status') ?? 'Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.' }}</p>
    <p class="lead">Si no recibiste el correo, por favor verifica tu carpeta de spam o <a href="{{ route('password.request') }}">inténtalo de nuevo</a>.</p>
</div>
@endsection
