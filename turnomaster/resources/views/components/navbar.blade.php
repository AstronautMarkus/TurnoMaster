<link rel="stylesheet" href="{{ asset('css/index/components/navbar/navbar.css') }}">

<div class="navbar navbar-expand-lg navbar-color fixed-top">

    <a class="navbar-brand navbar-text font-weight-bold" href="/">
        <img src="{{ asset('img/logo/TurnoMaster_lines.svg') }}" alt="TurnoMaster Logo" class="navbar-logo" id="navbar-logo">
        <h5>TurnoMaster</h5>
    </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
            <li class="nav-item">
                <a class="nav-link navbar-text font-weight-normal" href="/pricing">Precios</a>
                
            </li>
            <li class="nav-item">
                <a class="nav-link navbar-text font-weight-normal" href="/features">Características</a>
            </li>
            <li class="nav-item">
                <a class="nav-link navbar-text font-weight-normal" href="/clients">Clientes</a>
            </li>
            <li class="nav-item">
                <a class="nav-link navbar-text font-weight-normal" href="/about-us">Sobre el proyecto</a>
            </li>
        </ul>
        <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link font-weight-normal btn-free-trial nav-btn-center" href="/register">
                        <i class="bi bi-gift-fill"></i>  Prueba Gratis
                    </a>
                </li>
                <li class="nav-item mx-2">
                    <a class="nav-link navbar-text font-weight-normal btn-login nav-btn-center" href="/login">
                        Iniciar sesión
                    </a>
                </li>
        </ul>
    </div>
</div>