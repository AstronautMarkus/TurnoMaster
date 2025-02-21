@extends('layouts.app')

@section('title', 'TurnoMaster - Sobre Nosotros')

@section('content')
<div class="container mt-5">
    <h2 class="text-center mt-5">Creadores del Proyecto</h2>
    <div class="row mt-4">
        <div class="col-md-6">
            <div class="card">
                <img src="https://github.com/AstronautMarkus.png" class="card-img-top" alt="AstronautMarkus">
                <div class="card-body">
                    <h5 class="card-title">AstronautMarkus</h5>
                    <p class="card-text">Desarrollador principal y arquitecto del sistema. Experto en backend y gestión de bases de datos.</p>
                    <a href="https://github.com/AstronautMarkus" class="btn btn-primary">Ver Perfil</a>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <img src="https://github.com/Ki4ra1109.png" class="card-img-top" alt="Ki4ra1109">
                <div class="card-body">
                    <h5 class="card-title">Ki4ra1109</h5>
                    <p class="card-text">Especialista en frontend y diseño de interfaces. Responsable de la experiencia de usuario y diseño visual.</p>
                    <a href="https://github.com/Ki4ra1109" class="btn btn-primary">Ver Perfil</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection