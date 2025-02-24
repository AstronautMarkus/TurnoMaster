@extends('layouts.index_app')

@section('title', 'TurnoMaster - Confirmar Cuenta')

@section('content')
<div class="container mt-5 mb-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Confirmar Cuenta') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('verification.verify') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="code" class="col-md-4 col-form-label text-md-right">{{ __('Código de Verificación') }}</label>

                            <div class="col-md-6">
                                <input id="code" type="text" class="form-control" name="code" required autofocus>
                                @error('code')
                                    <p class="text-danger">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Confirmar') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
