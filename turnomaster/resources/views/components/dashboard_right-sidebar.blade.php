<link rel="stylesheet" href="{{ asset('css/dashboard/components/right-sidebar/right-sidebar.css') }}">

<div id="rightSidebar" class="right-sidebar">

    <div class="sidebar-header">
        <img src="{{ asset('img/headers/header01.png') }}" alt="cabecera" class="background-img" oncontextmenu="return false;">
        <div class="profile-bg">
            <img src="{{ asset('img/utils/profile-picture.png') }}" alt="perfil" class="profile-img" oncontextmenu="return false;">
        </div>
        <h3>{{ ucfirst(Auth::user()->name) }}</h3>
    </div>

    <div class="right-sidebar-content">

        <ul class="sidebar-options">
            <li>
                <a href="#">Opción 1 interesante</a>
            </li>
            <li>
                <a href="#">Opción 2 interesante</a>
            </li>
            <li>
                <a href="#">Opción 3 interesante</a>
            </li>
        </ul>

        <div class="logout-btn">
            <button type="button" class="text-danger" data-toggle="modal" data-target="#logoutModal">Cerrar sesión</button>
        </div>

    </div>

</div>

<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="logoutModalLabel">Confirmar Cierre de Sesión</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ¿Estás seguro de que deseas cerrar sesión?
            </div>
            <div class="modal-footer">
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="btn btn-danger">Sí, cerrar sesión</button>
                </form>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
