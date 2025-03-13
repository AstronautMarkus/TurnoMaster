<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cerrando sesión...</title>
    <script>
        window.onload = function () {
            alert("{{ session('logout_success') }}"); // Muestra el mensaje flash
            sessionStorage.clear(); // Limpia el almacenamiento en el navegador
            window.location.href = "/"; // Redirige al inicio
        };
    </script>
</head>
<body>
    <p>Cerrando sesión...</p>
</body>
</html>
