<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>@yield('title', 'Autenticación')</title>
    <link rel="stylesheet" href="{{ asset('css/index/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('css/auth/auth-styles.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="icon" href="{{ asset('img/logo/TurnoMaster_lines.svg') }}" type="image/x-icon">
</head>
<body>
    <a href="{{ url('/') }}" class="home-button">
        <i class="bi bi-house-fill"></i>
    </a>
    <div class="container">
        <div class="login-box">
            <div class="row">
                <div class="col-sm-6">
                    <div class="logo">
                        <img src="{{ asset('img/logo/TurnoMaster.svg') }}" style="width: 300px;">
                    </div>
                </div>
            </div>
            @yield('content')
        </div>
    </div>

    <script>
document.addEventListener('DOMContentLoaded', function() {
    const loginBox = document.querySelector('.login-box');
    if (!loginBox) return;
    
    const cubeCount = 15;
    
    for (let i = 0; i < cubeCount; i++) {
        const cube = document.createElement('div');
        cube.className = 'cube';
        
        const size = Math.random() * 40 + 10;
        cube.style.width = `${size}px`;
        cube.style.height = `${size}px`;
        
        cube.style.left = `${Math.random() * 100}%`;
        cube.style.top = `${Math.random() * 100}%`;
        
        cube.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        cube.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        
        loginBox.appendChild(cube);
    }
});
</script>

</body>
</html>
