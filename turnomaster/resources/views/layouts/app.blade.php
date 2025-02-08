<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    {{-- ...existing code... --}}
</head>
<body>
    <header>
        {{-- ...existing code... --}}
    </header>
    <main>
        @yield('content')
    </main>
    <footer>
        {{-- ...existing code... --}}
    </footer>
</body>
</html>
