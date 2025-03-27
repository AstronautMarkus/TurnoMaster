@extends('layouts.auth_forms')

@section('title', 'TurnoMaster - Restablecer Contraseña')

@section('content')

    <div class="text-white text-center mb-4">
                <h2 class="display-4">{{ __('Cambiar contraseña') }}</h2>
                <p class="lead">Introduce tu nueva contraseña para actualizarla en tu cuenta.</p>
    </div>

    <form method="POST" action="{{ route('password.reset') }}" class="login-form">
                @csrf
                <input type="hidden" name="token" value="{{ $token }}">
                <input type="hidden" name="email" value="{{ $email }}">
                <div class="form-group">
                    <input id="password" class="form-control" type="password" name="password" required autocomplete="new-password" placeholder="Nueva contraseña">
                </div>
                <div class="form-group">
                    <input id="password_confirmation" class="form-control" type="password" name="password_confirmation" required autocomplete="new-password" placeholder="Confirmar contraseña">
                </div>
                @if ($errors->any())
                    @foreach ($errors->all() as $error)
                        <p class="error_message">{{ $error }}</p>
                    @endforeach
                @endif
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">{{ __('Cambiar contraseña') }}</button>
                </div>
    </form>
@endsection
