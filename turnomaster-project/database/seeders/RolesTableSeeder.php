<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    public function run()
    {

        DB::table('roles')->insert([
            ['name' => 'admin', 'description' => 'Administradores de la empresa, con acceso total a todas las funciones de la aplicación.'],
            ['name' => 'hr', 'description' => 'Encargados de la gestión de recursos humanos, con acceso a funciones relacionadas con la gestión de personal.'],
            ['name' => 'employee', 'description' => 'Empleados de las empresas, funciones básicas para el registro y reporte de horas, entradas/salidas y justificaciones especiales.']
        ]);
    }
}

