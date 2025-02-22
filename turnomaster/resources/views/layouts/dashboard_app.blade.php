<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('css/dashboard/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('css/dashboard/dashboard-app-blade.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body class="d-flex flex-column min-vh-100">
    <div class="d-flex flex-grow-1 w-100" style="overflow: hidden;">
        @include('components.dashboard_sidebar')
        <div class="d-flex flex-column flex-grow-1 w-100">
            @include('components.dashboard_navbar')
            <main class="flex-grow-1 mt-4 mb-4" style="overflow-y: auto; overflow-x: hidden;">
                <div class="container h-100 d-flex justify-content-center align-items-center">
                    @yield('content')
                </div>
            </main>
        </div>
    </div>
</body>

<script src="{{ asset('js/jquery-3.7.1.min.js') }}"></script>
<script src="{{ asset('js/popper.min.js') }}"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script>

</html>
