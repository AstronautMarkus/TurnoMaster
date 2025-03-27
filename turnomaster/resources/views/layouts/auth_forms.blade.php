<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>@yield('title', 'Autenticación')</title>
    <link rel="stylesheet" href="{{ asset('css/index/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('css/auth/auth-styles.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="icon" href="{{ asset('img/logo/TurnoMaster_lines.svg') }}" type="image/x-icon">
</head>
<body>
    <div class="container-fluid h-100">
        <div class="row login-container">
            <div class="col-md-6 d-none d-md-block p-0">
            </div>
            <div class="col-md-6 d-flex justify-content-center align-items-center"> 
                <div class="login-form text-center">
                    <img src="{{ asset('img/logo/TurnoMaster_black.svg') }}" style="width: 200px;" alt="TurnoMaster-Logo">
                    <h2 class="mb-4">@yield('header', 'Formulario')</h2>
                    @yield('content')
                </div>
            </div>
        </div>
    </div>
</body>
</html>
