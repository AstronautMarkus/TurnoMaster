<!DOCTYPE html>
<html>
<head>
    <title>Restablecimiento de Contraseña</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="description" content="Restablecimiento de contraseña">
</head>
<body>
    <h1>Restablecimiento de Contraseña</h1>
    <p>Hola {{ $user->name }},</p>
    <p>Hemos recibido una solicitud para restablecer su contraseña. Haga clic en el enlace de abajo para restablecer su contraseña:</p>
    <p><a href="{{ url('reset-password/' . $token . '?email=' . urlencode($user->email)) }}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block;">Restablecer Contraseña</a></p>
    <p>Si no solicitó un restablecimiento de contraseña, no se requiere ninguna acción adicional.</p>
</body>
</html>
