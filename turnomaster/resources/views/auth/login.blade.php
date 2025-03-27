@extends('layouts.auth_forms')

@section('title', 'Iniciar Sesión')

@section('form_title', 'Iniciar Sesión')

@section('content')
@if ($errors->any())
    <div>
        @foreach ($errors->all() as $error)
            <p>{{ $error }}</p>
        @endforeach
    </div>
@endif
<form action="{{ route('login') }}" method="POST" class="login-form">
    @csrf
    <div class="form-group">
        <input type="email" id="email" name="email" class="form-control" placeholder="Correo Electrónico" required>
    </div>
    <div class="form-group">
        <input type="password" id="password" name="password" class="form-control" placeholder="Contraseña" required>
    </div>
    <a href="{{ route('password.request') }}">¿Olvidaste tu contraseña?</a>
    <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
    </div>
    <div class="form-group">
        <div class="text-center">¿Nuevo miembro? <a href="{{ route('register') }}">Regístrate ahora</a></div>
    </div>
</form>
@endsection
