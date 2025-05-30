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
            ['name' => 'Ubuntu', 'slug' => 'ubuntu', 'description' => 'El naranja más vibrante.'],
            ['name' => 'Forest', 'slug' => 'forest', 'description' => 'Donde la productividad florece como la naturaleza.'],
            ['name' => 'Sakura', 'slug' => 'sakura', 'description' => 'Serenidad y belleza en cada jornada laboral.'],
            ['name' => 'Amethyst', 'slug' => 'amethyst', 'description' => 'Elegancia, concentración y estilo en cada detalle.'],
            ['name' => 'Ocean', 'slug' => 'ocean', 'description' => 'Profundidad, claridad y calma para tu día a día.'],
            ['name' => 'AbbyBot', 'slug' => 'abbybot', 'description' => 'Nada que decir, mucho que hacer.'],
        ]);

    }
}

