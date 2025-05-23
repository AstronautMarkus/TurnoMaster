<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ThemesSeeder extends Seeder
{
    public function run()
    {

        DB::table('themes')->insert([
            ['name' => 'Reyes', 'slug' => 'reyes', 'description' => 'Elegante, clásico, funcional.'],
            ['name' => 'Reyes blue', 'slug' => 'reyes-blue', 'description' => 'Frescura y modernidad en cada detalle.'],
        ]);
    }
}

