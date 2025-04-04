<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name', 'TurnoMaster') }}</title>

        <link rel="shortcut icon" href="/img/logo/TurnoMaster.svg" type="image/x-icon">
        

        @viteReactRefresh
        @vite(['resources/js/main.tsx'])
    </head>
    <body class="font-sans antialiased">
        <div id="app"></div>
    </body>
</html>
