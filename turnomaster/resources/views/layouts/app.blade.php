<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">    
</head>
<body>
    <div>
        @yield('content')
    </div>
</body>
<script src="{{ asset('js/bootstrap.bundle.min.js') }}"></script>
</html>
