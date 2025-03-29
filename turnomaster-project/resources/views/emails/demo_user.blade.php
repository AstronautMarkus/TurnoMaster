<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cuenta de pruebas | TurnoMaster</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 5px; padding: 20px;">
        <h1 style="font-size: 24px; color: #333333; margin-bottom: 20px;">¡Buenas, {{ $name }}!</h1>
        <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">
            Tu cuenta de demostración ha sido creada exitosamente. A continuación, se detallan los datos de tu cuenta:
        </p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="font-size: 16px; color: #333333; margin: 0;"><strong>Correo electrónico:</strong> {{ $email }}</p>
            <p style="font-size: 16px; color: #333333; margin: 0;"><strong>Contraseña:</strong> {{ $password }}</p>
        </div>
        <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">
            Por favor, haz clic en el botón de abajo para activar tu cuenta:
        </p>
        <a href="{{ $activationUrl }}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
            Activar Cuenta
        </a>
        <p style="font-size: 14px; color: #999999; margin-top: 20px;">
            Si no solicitaste esta cuenta, por favor ignora este correo.
        </p>

        <p style="font-size: 14px; color:rgb(64, 64, 64);">
            Gracias,<br>
            El equipo de TurnoMaster
        </p>
    </div>
</body>
</html>
