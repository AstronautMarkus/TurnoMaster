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
                <h2>Lorem Ipsum</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque leo nec orci varius, nec tincidunt ligula facilisis. Integer nec odio nec nulla fermentum tincidunt. Sed sit amet sapien nec risus vehicula fermentum. Curabitur a felis nec erat fermentum bibendum.</p>
                <p>Phasellus vel turpis non nulla tincidunt tincidunt. Donec ut felis ut libero tincidunt tincidunt. Sed sit amet sapien nec risus vehicula fermentum. Curabitur a felis nec erat fermentum bibendum.</p>
            </div>
        </div>
    </div>

@endsection