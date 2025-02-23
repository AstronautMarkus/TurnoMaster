<link rel="stylesheet" href="{{ asset('css/dashboard/components/navbar/navbar.css') }}">

<nav class="navbar navbar-expand-lg navbar-light text-white w-100 navbar-custom">
    <div class="container-fluid">
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <span class="navbar-text text-white mx-2">
                ¡Hola, {{ ucfirst(Auth::user()->name) }}!
            </span>
            <div class="dropdown">
                <a class="dropdown-toggle" role="button" id="toggleRightSidebar" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </a>    
            </div>
        </div>
    </div>
</nav>