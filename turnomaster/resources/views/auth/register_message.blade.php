@extends('layouts.auth_forms')
@section('title', 'TurnoMaster - ¡Cuenta Creada!')

@section('content')
<div class="text-white text-center">
                <h1 class="display-3 mb-5">{{ __('¡Cuenta Creada!') }}</h1>
                <p class="lead">{{ __('¡Su cuenta ha sido creada con éxito! Por favor, revise su correo electrónico para activar su cuenta y comenzar a disfrutar de nuestra demo gratuita.') }}</p>
                <p class="lead">{{ __('Si no encuentra el correo en su bandeja de entrada, por favor revise su carpeta de spam o inténtelo de nuevo más tarde.') }}</p>
</div>
@endsection
