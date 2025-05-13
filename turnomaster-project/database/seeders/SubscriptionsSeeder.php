<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubscriptionsSeeder extends Seeder
{
    public function run()
    {

        DB::table('subscriptions')->insert([
            ['name' => 'TBA', 'description' => 'TBA', 'features' => 'TBA'],
        ]);
    }
}

