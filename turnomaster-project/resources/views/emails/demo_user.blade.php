<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cuenta de pruebas | TurnoMaster</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
    <body class="bg-gray-100 font-sans leading-normal tracking-normal">
        <div class="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">¡Buenas, {{ $name }}!</h1>
            <p class="text-gray-600 mb-4">
                Tu cuenta de demostración ha sido creada exitosamente. A continuación, se detallan los datos de tu cuenta:
            </p>
            <div class="bg-gray-100 p-4 rounded-lg mb-4">
                <p><strong>Correo electrónico:</strong> {{ $email }}</p>
                <p><strong>Contraseña:</strong> {{ $password }}</p>
            </div>
            <p class="text-gray-600 mb-6">
                Por favor, haz clic en el botón de abajo para activar tu cuenta:
            </p>
            <a href="{{ $activationUrl }}" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                Activar Cuenta
            </a>
            <p class="text-gray-500 text-sm mt-6">
                Si no solicitaste esta cuenta, por favor ignora este correo.
            </p>
        </div>
    </body>
</html>
