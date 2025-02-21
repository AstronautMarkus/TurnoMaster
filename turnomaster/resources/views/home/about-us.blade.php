@extends('layouts.app')

@section('title', 'TurnoMaster - Sobre Nosotros')

<link rel="stylesheet" href="{{ asset('css/about-us/about-us.css') }}">

@section('content')
<div>
    <h1 class="text-center mt-4 text-dark">Sobre el proyecto</h1>
    <div>
        <h5 class="text-center">El proyecto TurnoMaster nació en base al sistema de asistencia ambiguo y poco actualizado que utilizaba la empresa donde hicimos nuestra practica laboral y profesional.<br> Es por eso que..........................</h5>
    </div>
</div>
<div class="container about_us-container mt-5">
    <h2 class="text-center mt-5">Creadores del Proyecto</h2>
    <div class="row mt-4">
        <div class="col-md-4 d-flex align-items-stretch mt-4 mb-4">
            <div class="card about_us-card">
                <img src="https://github.com/AstronautMarkus.png" class="card-img-top" alt="AstronautMarkus">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title about_us-card-title">AstronautMarkus <br>(Marcos Reyes)</h5>
                    <p class="card-text about_us-card-text">Desarrollador principal y arquitecto del sistema. Experto en backend y gestión de bases de datos.</p>

                    <div class="social-links about_us-social-links">
                        <a href="https://www.linkedin.com/in/markusreyes/" target="_blank"><i class="bi bi-linkedin"></i></a>
                        <a href="https://discord.com/users/467827819536449536" target="_blank"><i class="bi bi-discord"></i></a>
                        <a href="https://github.com/AstronautMarkus" target="_blank"><i class="bi bi-github"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 d-flex align-items-stretch mt-4 mb-4">
            <div class="card about_us-card">
                <img src="https://github.com/Ki4ra1109.png" class="card-img-top" alt="Ki4ra1109">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title about_us-card-title">Ki4ra1109 <br>(Kiara Rubio)</h5>
                    <p class="card-text about_us-card-text">Especialista en frontend y diseño de interfaces. Responsable de la experiencia de usuario y diseño visual.</p>                    <div class="social-links about_us-social-links">
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