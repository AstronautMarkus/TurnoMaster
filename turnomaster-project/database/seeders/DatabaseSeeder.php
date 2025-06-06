<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        $this->call(RolesTableSeeder::class);
        $this->call(ContactFormSeeder::class);
        $this->call(SubscriptionsSeeder::class);
        $this->call(AttendanceStatusesSeeder::class);
        $this->call(ThemesSeeder::class);
        
    }
}