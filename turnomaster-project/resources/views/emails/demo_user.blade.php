<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cuenta de pruebas | TurnoMaster</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333333;
        }
        
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background-color: #2563eb;
            padding: 20px;
            text-align: center;
        }
        
        .logo {
            max-width: 200px;
            height: auto;
        }
        
        .content {
            padding: 30px;
        }
        
        h1 {
            font-size: 24px;
            color: #1e3a8a;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        p {
            font-size: 16px;
            color: #555555;
            margin-bottom: 20px;
            line-height: 1.5;
        }
        
        .info-box {
            background-color: #f0f7ff;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            border-left: 4px solid #2563eb;
        }
        
        .info-box p {
            font-size: 16px;
            color: #333333;
            margin: 8px 0;
        }
        
        .button {
            display: inline-block;
            background-color: #2563eb;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
            transition: background-color 0.3s;
        }
        
        .button:hover {
            background-color: #1e40af;
        }
        
        .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer p {
            font-size: 14px;
            color: #64748b;
            margin: 5px 0;
        }
        
        .social-links {
            margin: 15px 0;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 8px;
            color: #64748b;
            text-decoration: none;
        }
        
        .disclaimer {
            font-size: 13px;
            color: #94a3b8;
            margin-top: 15px;
        }
        
        @media only screen and (max-width: 600px) {
            .container {
                width: 100%;
                margin: 0;
                border-radius: 0;
            }
            
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <p style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0;">TurnoMaster</p>
        </div>
        
        <div class="content">
            <h1>¡Buenas, {{ $name }}!</h1>
            
            <p>
                Tu cuenta de demostración ha sido creada exitosamente. A continuación, se detallan los datos de tu cuenta:
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

