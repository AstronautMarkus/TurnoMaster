@extends('layouts.index_app')

@section('title', 'TurnoMaster - Sobre el Proyecto')

<link rel="stylesheet" href="{{ asset('css/index/about-us/about-us.css') }}">

@section('content')
<div class="container d-flex flex-column align-items-center mt-5">

    <div class="project-container text-center p-4 rounded">
        <h1 class="text-dark">Sobre el Proyecto: TurnoMaster</h1>
        <p class="mt-3">
            Todo comenzó cuando un grupo de jóvenes, durante su práctica <strong>laboral/profesional</strong>, se dio cuenta de lo ineficiente que era el sistema de registro de horarios: datos perdidos, justificaciones caóticas y una gestión deficiente.  
            <br><br>
            Cansados de lidiar con este desorden, decidieron crear <strong>TurnoMaster</strong>, una herramienta diseñada para optimizar la administración de horarios y asistencia. Con la capacidad de gestionar múltiples empresas, mejorar el registro de entradas, colaciones y salidas, su objetivo es simple: hacerle la vida más fácil a todos.  
            <br><br>
            Lo que nació de una frustración, se convirtió en una solución. 🚀  
        </p>
        <div class="project-meta mt-3">
            <p><strong>Creadores:</strong> Marcos Reyes & Kiara Rubio</p>
            <p><strong>Fecha de Inicio:</strong> Febrero 2025</p>
        </div>
    </div>


    <h2 class="text-center mt-5 font-weight-bold">Creadores del Proyecto</h2>
    <div class="row mt-4 justify-content-center">
        <!-- Marcos -->
        <div class="col-md-4 d-flex align-items-stretch mt-4 mb-4">
            <div class="card about_us-card">
                <img src="https://github.com/AstronautMarkus.png" class="rounded" alt="AstronautMarkus">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title about_us-card-title">AstronautMarkus <i class="fas fa-server"></i> <br> (Marcos Reyes)</h5>
                    <p class="card-text about_us-card-text">Desarrollador Full-stack apasionado por la tecnología, el código abierto y la automatización.</p>
                    <div class="social-links about_us-social-links">
                        <a href="https://www.linkedin.com/in/markusreyes/" target="_blank"><i class="bi bi-linkedin"></i></a>
                        <a href="https://discord.com/users/467827819536449536" target="_blank"><i class="bi bi-discord"></i></a>
                        <a href="https://github.com/AstronautMarkus" target="_blank"><i class="bi bi-github"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Kiara -->
        <div class="col-md-4 d-flex align-items-stretch mt-4 mb-4">
            <div class="card about_us-card">
                <img src="https://github.com/Ki4ra1109.png" class="rounded" alt="Ki4ra1109">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title about_us-card-title">Ki4ra1109 <i class="fas fa-paint-brush"></i> <br> (Kiara Rubio) </h5>
                    <p class="card-text about_us-card-text">Desarrolladora Front-end en camino a ser Full-stack Developer, apasionada por construir sistemas y páginas visualmente atractivas.</p>
                        <div class="social-links about_us-social-links">
                        <a href="https://www.linkedin.com/in/kiara-rubio-a13389251/" target="_blank"><i class="bi bi-linkedin"></i></a>
                        <a href="https://discord.com/users/551601540323082270 " target="_blank"><i class="bi bi-discord"></i></a>
                        <a href="https://github.com/Ki4ra1109" target="_blank"><i class="bi bi-github"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
