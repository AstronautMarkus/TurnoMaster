@extends('layouts.index_app')

@section('title', 'TurnoMaster - Home')

<link rel="stylesheet" href="{{ asset('css/index/home/home-blade.css') }}">

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

@section('content')

<div class="hero mb-5">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-5">
                <div class="intro-text">
                    <h1>¿Estás listo para optimizar la gestión de horarios de tus empleados?</h1>
                    <p>TurnoMaster es el software ideal para gestionar las entradas y salidas de tu negocio, 
                    permitiéndote conectar mejor con tus empleados y optimizar la administración de tu empresa.</p>
                </div>
                <div class="d-flex justify-content-center">
                        <a href="/acquire" class="btn-custom btn-acquire mr-2">
                            <i class="bi bi-cart-fill"></i> Adquiere TurnoMaster </i>
                        </a>
                        <a href="https://youtube.com" target="_blank" class="btn-custom btn-video">
                            <i class="bi bi-play-circle"></i> Demostración </i>
                        </a>
                </div>
            </div>
            <div class="col-md-5">
                <div class="intro-image">
                    <img src="{{ asset('img/home/redd-francisco-5U_28ojjgms-unsplash.jpg') }}" alt="TurnoMaster" class="img-fluid">
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
                            <strong class="info-value" id="users-count"></strong>
                        </li>
                        <li class="info-item flex-fill text-center">
                            <span class="info-title">Empresas que usan TurnoMaster</span>
                            <strong class="info-value" id="companies-count"></strong>
                        </li>
                        <li class="info-item flex-fill text-center">
                            <span class="info-title">Horas gestionadas</span>
                            <strong class="info-value" id="hours-count"></strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="row mt-5 align-items-center">
            <div class="col-md-6">
                <div class="intro-image">
                    <img src="{{ asset('img/home/markus-winkler-IrRbSND5EUc-unsplash.jpg') }}" alt="TurnoMaster" class="img-fluid">
                </div>
            </div>
            <div class="col-md-6">
                <h2>Empleados satisfechos, <strong>empresa exitosa</strong></h2>
                <p>Con TurnoMaster, no solo gestionas horarios, también mejoras la comunicación interna y aumentas la productividad de tu equipo. <br>Descubre cómo nuestra herramienta puede transformar la forma en que administras tu negocio.</p>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col-md-12 text-center connect-employees">
            <h1>Conecta con tus empleados</h1>
            <p>Con TurnoMaster, no solo gestionas horarios, también mejoras la comunicación interna y aumentas la productividad de tu equipo. <br>Descubre cómo nuestra herramienta puede transformar la forma en que administras tu negocio.</p>
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
            animateCount('users-count', 0, 100, 1000);
            animateCount('companies-count', 0, 100, 1000);
            animateCount('hours-count', 0, 100, 1000);

            @if(session('verified'))
                Swal.fire({
                    title: '¡Hola {{ session('userName') }} te damos la bienvenida a TurnoMaster!',
                    text: 'Tu cuenta ha sido verificada exitosamente. ¡Ya puedes iniciar sesión!',
                    icon: 'success',
                    confirmButtonText: 'De acuerdo'
                });
            @endif
            
            @if(session('logout_success'))
                Swal.fire({
                    title: '¡Hasta luego!',
                    text: '{{ session('logout_success') }}',
                    icon: 'success',
                    confirmButtonText: 'De acuerdo'
                });
            @endif

            @if (session('status'))
                Swal.fire({
                    title: '¡Éxito!',
                    text: '{{ session('status') }}',
                    icon: 'success',
                    confirmButtonText: 'De acuerdo'
                });
            @endif

        });

    </script>
@endsection