@extends('layouts.auth_app')

@section('title', 'TurnoMaster - Error de Verificación')

@section('content')
<div class="verification-error-container">
    <h2>{{ __('Error de Verificación') }}</h2>
    @if (session('error'))
        <p>{{ session('error') }}</p>
    @endif
    <p>{{ __('Por favor, solicite un nuevo código de verificación.') }}</p>
</div>
@endsection
