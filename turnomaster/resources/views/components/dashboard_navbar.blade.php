<link rel="stylesheet" href="{{ asset('css/dashboard/components/navbar/navbar.css') }}">

<nav class="navbar navbar-expand-lg navbar-light bg-primary text-white w-100 navbar-custom">
    <div class="container-fluid">
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <span class="navbar-text me-3">
                ¡Hola, {usuario}!
            </span>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>
        </div>
    </div>
</nav>
