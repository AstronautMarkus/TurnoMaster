@extends('layouts.index_app')
<link rel="stylesheet" href="{{ asset('css/index/features/features-blade.css') }}">
@section('title', 'TurnoMaster - características')

@section('content')
<div class="container mt-5">
    <h1 class="text-center" style="font-family: 'Poppins', sans-serif;">Características de TurnoMaster</h1>
    <div class="row mt-4" style="font-family: 'Roboto', sans-serif;">
        <div class="col-md-4 d-flex align-items-stretch">
            <div class="card_features">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title about_us-card-title">Gestión de Turnos</h5>
                    <p class="card-text about_us-card-text">Organiza y administra los turnos de tus empleados de manera eficiente. Crea, edita y elimina turnos con facilidad.</p>
                </div>
            </div>
        </div>
        <div class="col-md-4 d-flex align-items-stretch">
            <div class="card_features">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title about_us-card-title">Notificaciones en Tiempo Real</h5>
                    <p class="card-text about_us-card-text">Recibe notificaciones instantáneas sobre cambios en los turnos, solicitudes de permisos y más, directamente en tu correo electrónico.</p>
                </div>
            </div>
        </div>
        <div class="col-md-4 d-flex align-items-stretch">
            <div class="card_features">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title about_us-card-title">Reportes Detallados</h5>
                    <p class="card-text about_us-card-text">Genera reportes detallados sobre la asistencia, horas trabajadas y rendimiento de tus empleados para una mejor toma de decisiones.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-4 justify-content-center" style="font-family: 'Roboto', sans-serif;">
        <div class="col-md-4 d-flex align-items-stretch">
            <div class="card_features">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title about_us-card-title">Panel de Control</h5>
                    <p class="card-text about_us-card-text">Revisa y administra todos los datos de entrada y salida de los trabajadores desde un panel de control centralizado en tu PC.</p>
                </div>
            </div>
        </div>
        <div class="col-md-4 d-flex align-items-stretch">
            <div class="card_features">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title about_us-card-title">Soporte 24/7</h5>
                    <p class="card-text about_us-card-text">Nuestro equipo de soporte está disponible las 24 horas del día, los 7 días de la semana, para ayudarte con cualquier problema o consulta.</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection