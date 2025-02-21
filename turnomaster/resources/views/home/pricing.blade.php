@extends('layouts.index_app')

@section('title', 'TurnoMaster - precios')

@section('content')
<div class="container mt-5">
    <h1 class="text-center">Precios de TurnoMaster</h1>
    <div class="row mt-4">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Plan Básico</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                    <p class="card-text"><strong>$9.99/mes</strong></p>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Plan Premium</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                    <p class="card-text"><strong>$19.99/mes</strong></p>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-md-12">
            <h2 class="text-center">Público Objetivo</h2>
            <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        </div>
    </div>
</div>
@endsection