<link rel="stylesheet" href="{{ asset('css/index/components/navbar/navbar-blade.css') }}">

<div class="navbar navbar-expand-lg navbar-color text-black font-weight-bold">
    @auth
        <a class="navbar-brand text-black font-weight-bold" href="/dashboard">TurnoMaster</a>
    @else
        <a class="navbar-brand text-black font-weight-bold" href="/">TurnoMaster</a>
    @endauth
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
            <li class="nav-item">
                <a class="nav-link text-black font-weight-normal" href="/features">Características</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-black font-weight-normal" href="/pricing">Precios</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-black font-weight-normal" href="/about-us">Sobre nosotros</a>
            </li>
        </ul>
        <ul class="navbar-nav">
            @auth
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-black font-weight-normal" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Hola, {{ ucfirst(Auth::user()->name) }}!
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <button type="button" class="dropdown-item text-black font-weight-normal" data-toggle="modal" data-target="#logoutModal">Cerrar sesión</button>
                    </div>
                </li>
            @else
                <li class="nav-item">
                    <a class="nav-link text-black font-weight-normal" href="/register">Registrarse</a>
                </li>
                <li class="nav-item ml-auto">
                    <a class="nav-link text-black font-weight-normal" href="/login">Iniciar sesión</a>
                </li>
            @endauth
        </ul>
    </div>
</div>


<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-black font-weight-bold" id="logoutModalLabel">Confirmar Cierre de Sesión</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body text-black">
                ¿Estás seguro de que deseas cerrar sesión?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="btn btn-primary">Cerrar sesión</button>
                </form>
            </div>
        </div>
    </div>
</div>