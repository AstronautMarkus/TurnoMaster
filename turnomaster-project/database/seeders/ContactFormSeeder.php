<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContactFormCategories;

class ContactFormSeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['name' => 'Consultas generales'],
            ['name' => 'Problemas técnicos'],
            ['name' => 'Soporte con mi cuenta'],
            ['name' => 'Elección de plan'],
            ['name' => 'Recomendaciones o sugerencias'],
            ['name' => 'Interesado en ser cliente de prueba'],
            ['name' => 'Interesado en ser cliente de pago'],
            ['name' => 'Interesado en ser cliente destacado'],
            ['name' => 'Reporte de error'],
            ['name' => 'Problemas con el pago'],
            ['name' => 'Problemas con la facturación'],
            ['name' => 'Problemas con la entrega'],
            ['name' => 'Problemas con el servicio'],
            ['name' => 'Otros'],
        ];

        foreach ($categories as $category) {
            ContactFormCategories::create($category);
        }
    }
}
