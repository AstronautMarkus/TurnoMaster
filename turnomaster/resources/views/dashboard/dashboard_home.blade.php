<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="{{ asset('img/logo/TurnoMaster_lines.svg') }}" type="image/x-icon">

    @viteReactRefresh
    @vite(['resources/js/Main.tsx'])

    <script>
        window.onload = function () {
            @if(Auth::check())
                const user = {
                    name: "{{ Auth::user()->name }}",
                    email: "{{ Auth::user()->email }}",
                };
                sessionStorage.setItem('user', JSON.stringify(user));
            @endif
        };
    </script>
</head>
<body>
    <div id="app"></div>
</body>
</html>
