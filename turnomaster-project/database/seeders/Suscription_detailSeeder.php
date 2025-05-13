<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Suscription_detailSeeder extends Seeder
{
    public function run()
    {

        DB::table('subscription_details')->insert([
            ['name' => 'TBA', 'description' => 'TBA', 'features' => 'TBA'],
        ]);
    }
}

