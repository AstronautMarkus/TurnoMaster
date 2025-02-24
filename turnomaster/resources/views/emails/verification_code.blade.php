<!DOCTYPE html>
<html>
<head>
    <title>Verificación de Cuenta</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="description" content="Código de verificación de cuenta">
</head>
<body>
    <h1>Verificación de Cuenta</h1>
    <p>Hola {{ $user->name }},</p>
    <p>Su código de verificación es: {{ $code }}</p>
    <p>Este código es válido por 10 minutos.</p>
</body>
</html>
