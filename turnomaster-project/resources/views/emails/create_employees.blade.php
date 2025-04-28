<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cuenta de empleado | TurnoMaster</title>
    <style>
        // ...existing styles from demo_user.blade.php...
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <p style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0;">TurnoMaster</p>
        </div>
        
        <div class="content">
            <h1>¡Hola, {{ $name }}!</h1>
            
            <p>
                Tu cuenta de empleado ha sido creada exitosamente. A continuación, se detallan los datos de tu cuenta:
            </p>
            
            <div class="info-box">
                <p><strong>Correo electrónico:</strong> {{ $email }}</p>
                <p><strong>Contraseña:</strong> {{ $password }}</p>
            </div>
            
            <p>
                Por favor, haz clic en el botón de abajo para activar tu cuenta:
            </p>
            
            <a href="{{ $activationUrl }}" class="button">
                Activar Cuenta
            </a>
            
            <p style="font-size: 14px; color: #64748b; margin-top: 25px;">
                Si no solicitaste esta cuenta, por favor ignora este correo.
            </p>
        </div>
        
        <div class="footer">
            <p><strong>TurnoMaster</strong> - Sistema de Gestión de Turnos</p>
            <p>Creado por <a href="https://reyesandfriends.cl" style="color: #2563eb;">Reyes&Friends.cl</a></p>
            
            <p>Soporte: <a href="mailto:soporte@turnomaster.com" style="color: #2563eb;">soporte@turnomaster.com</a></p>
            
            <p class="disclaimer">
                © {{ date('Y') }} TurnoMaster. Todos los derechos reservados.
            </p>
        </div>
    </div>
</body>
</html>
