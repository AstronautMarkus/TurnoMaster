<link rel="stylesheet" href="{{ asset('css/dashboard/components/right-sidebar/right-sidebar.css') }}">

<style>
    .modal-backdrop {
        display: none;
    }
</style>

<div id="rightSidebar" class="right-sidebar">
    <div class="right-sidebar-content">
        <button id="closeRightSidebar" class="close-btn"></button>
        <h3>Opciones</h3>
        <ul class="sidebar-options">
            <li><a href="#">Configuración</a></li>
            <li><a href="#">Notificaciones</a></li>
            <li><a href="#">Preferencias</a></li>
        </ul>
        <div class="logout-btn">
            <button type="button" class="text-danger" data-toggle="modal" data-target="#logoutModal">Cerrar sesión</button>
        </div>
    </div>
</div>

<div id="overlay" class="overlay"></div>

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
