@extends('layouts.index_app')
<link rel="stylesheet" href="{{ asset('css/about/about.css')}}">
@section('title', 'TurnoMaster - características')

@section('content')
<div class="container mt-5">
    <h1 class="text-center h1">Acerca del proyecto</h1>
    <div class="row mt-4">
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Notificaciones en Tiempo Real</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
