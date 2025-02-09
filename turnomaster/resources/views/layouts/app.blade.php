<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/app-blade.css') }}">
</head>
<body class="d-flex flex-column min-vh-100">
    <x-navbar />

    <main class="">
        @yield('content')
    </main>

    <x-footer />
</body>

<script src="{{ asset('js/bootstrap.bundle.min.js') }}"></script>
</html>
