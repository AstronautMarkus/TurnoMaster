@extends('layouts.app')

@section('title', 'TurnoMaster - home')

<link rel="stylesheet" href="{{ asset('css/home-blade.css') }}">

@section('content')
    <div class="hero mb-5">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-5">
                    <div class="intro-text">
                        <h1>¿Estás listo para optimizar la gestión de horarios de tus empleados?</h1>
                        <p>TurnoMaster es el software ideal para gestionar las entradas y salidas de tu negocio, 
                        permitiéndote conectar mejor con tus empleados y optimizar la administración de tu empresa.</p>
                        <a href="/" class="btn btn-primary">Comenzar ahora</a>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="intro-image">
                        <img src="{{ asset('img/home/example-home.png') }}" alt="TurnoMaster" class="img-fluid">
                    </div>
                </div>
            </div>
    </div>

    <div class="container random-content my-5">
        <div class="row">
            <div class="col-md-12">
                <h2>Menos complicaciones, <strong>más control</strong></h2>
                <p>En el ámbito empresarial, <strong>"poco es mucho"</strong>.<br>TurnoMaster elimina la complejidad innecesarias y te ofrece una herramienta simple, pero eficiente.<br>Gestiona los horarios de tus empleados sin dolores de cabeza.</p>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="info-box p-4 rounded bg-light">
                    <ul class="info-list d-flex">
                        <li class="info-item flex-fill text-center">
                            <span class="info-title">Usuarios registrados</span>
                            <span class="info-value" id="users-count">10,000+</span>
                        </li>
                        <li class="info-item flex-fill text-center">
                            <span class="info-title">Empresas que usan TurnoMaster</span>
                            <span class="info-value" id="companies-count">500+</span>
                        </li>
                        <li class="info-item flex-fill text-center">
                            <span class="info-title">Horas gestionadas</span>
                            <span class="info-value" id="hours-count">1,000,000+</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <script>
        function animateCount(id, start, end, duration) {
            const element = document.getElementById(id);
            let startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                element.textContent = value.toLocaleString('es-CL');
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            }

            window.requestAnimationFrame(step);
        }

        document.addEventListener('DOMContentLoaded', function() {
            animateCount('users-count', 0, 10000, 2000);
            animateCount('companies-count', 0, 500, 2000);
            animateCount('hours-count', 0, 1000000, 2000);
        });
    </script>
@endsection