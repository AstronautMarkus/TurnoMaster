@extends('layouts.auth_forms')
@section('title', 'TurnoMaster - Sesión cerrada')
@section('content')
<div>
    <div class="text-white text-center mt-4">
                <h1>{{ __('Has cerrado sesión') }}</h1>
                <p class="mt-4">{{ __('Has cerrado sesión correctamente. Gracias por usar TurnoMaster.') }}</p>
                <p>{{ __('Serás redirigido automáticamente en un instante.') }}</p>
    </div>
</div>
<script>
    setTimeout(function() {
        window.location.href = '/';
    }, 3000);
</script>
@endsection
