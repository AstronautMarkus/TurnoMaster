@extends('layouts.auth_forms')

@section('title', 'Iniciar Sesión')

@section('header', 'Iniciar Sesión')

@section('content')
@if ($errors->any())
    <div class="error-messages mb-3">
        @foreach ($errors->all() as $error)
            <p class="text-danger">{{ $error }}</p>
        @endforeach
    </div>
@endif

<form action="{{ route('login') }}" method="POST">
    @csrf
    <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input type="email" class="form-control" id="email" name="email" required>
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="password" name="password" required>
    </div>
    <button type="submit" class="btn btn-primary w-100">Ingresar</button>
    <div class="mt-3">
        <a href="{{ route('password.request') }}">¿Olvidaste tu contraseña?</a>
    </div>
</form>
@endsection
