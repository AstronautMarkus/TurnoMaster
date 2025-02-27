<link rel="stylesheet" href="{{ asset('css/dashboard/components/sidebar/sidebar.css') }}">

<div class="d-flex flex-column flex-shrink-0 text-white vh-100 sidebar" style="width: 280px;">
    <div class="sidebar-header p-3">
        <a class="navbar-brand navbar-text font-weight-bold" href="/">
            <img src="{{ asset('img/logo/TurnoMaster_dashboard.svg') }}" alt="TurnoMaster Logo" class="navbar-logo" id="navbar-logo">
        </a>
    </div>
    <div class="sidebar-content p-3" style="overflow-y: auto;">
        <ul class="nav nav-pills flex-column mb-auto separator">
            <li class="nav-item">
                <a href="/" class="nav-link" aria-current="page">
                    <i class="fas fa-home me-2"></i>
                    Lorem Ipsum
                </a>
            </li>
            <li class="nav-item expandable-menu">
                <a href="#" class="nav-link">
                    <i class="fas fa-folder me-2"></i>
                    Lorem Ipsum
                </a>
                <ul class="expandable-menu-content">
                    <li class="nav-item">
                        <a href="/" class="nav-link">
                         1. Lorem Ipsum
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/" class="nav-link">
                          2. Lorem Ipsum
                        </a>
                    </li>
                </ul>
            </li>
            <li class="nav-item">
                <a href="/" class="nav-link">
                    <i class="fas fa-user me-2"></i>
                    Lorem Ipsum
                </a>
            </li>
            
            </li>
        </ul>
        <hr>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const expandableMenus = document.querySelectorAll('.expandable-menu');

        expandableMenus.forEach(menu => {
            menu.addEventListener('click', function() {
                const expandableMenuContent = menu.querySelector('.expandable-menu-content');
                expandableMenuContent.classList.toggle('show');
            });
        });
    });
</script>