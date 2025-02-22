<link rel="stylesheet" href="{{ asset('css/dashboard/components/right-sidebar/right-sidebar.css') }}">

<div id="rightSidebar" class="right-sidebar">
    <div class="right-sidebar-content">
        <button id="closeRightSidebar" class="close-btn">
            <i class="fas fa-times"></i>
        </button>
        <h3>Opciones</h3>
        <ul class="sidebar-options">
            <li><a href="#">Configuración</a></li>
            <li><a href="#">Notificaciones</a></li>
            <li><a href="#">Preferencias</a></li>
        </ul>
        <div class="logout-btn">
            <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" class="text-danger">Cerrar sesión</button>
            </form>
        </div>
    </div>
</div>
<div id="overlay" class="overlay"></div>