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
        <div class="container">
            <div class="login-box">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="logo">
                            <img src="{{ asset('img/logo/TurnoMaster.svg') }}" style="width: 300px;">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <br>
                        <h3 class="header-title text-white">@yield('form_title','formulario')</h3>
                        @yield('content')
                    </div>
                    <div class="col-sm-6">
                        @yield('additional_info')
                    </div>
                </div>
            </div>
        </div>
</body>
</html>
