<div class="navbar navbar-expand-lg navbar-dark" style="background-color:rgb(20, 110, 200);">
    @auth
        <a class="navbar-brand" href="/dashboard">TurnoMaster</a>
    @else
        <a class="navbar-brand" href="/">TurnoMaster</a>
    @endauth
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/features">Características</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/pricing">Precios</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/about">Acerca de</a>
            </li>
        </ul>
        <ul class="navbar-nav">
            @auth
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Hola, {{ ucfirst(Auth::user()->name) }}!
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit" class="dropdown-item">Cerrar sesión</button>
                        </form>
                    </div>
                </li>
            @else
                <li class="nav-item">
                    <a class="nav-link" href="/login">Iniciar sesión</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Registrarse</a>
                </li>
            @endauth
        </ul>
    </div>
</div>