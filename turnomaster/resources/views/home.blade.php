@extends('layouts.app')

@section('title', 'TurnoMaster - home')

<link rel="stylesheet" href="{{ asset('css/home-blade.css') }}">

@section('content')
    <div class="hero">
        
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
@endsection