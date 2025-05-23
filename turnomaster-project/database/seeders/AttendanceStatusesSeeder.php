<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Shift\AttendanceStatus;

class AttendanceStatusesSeeder extends Seeder
{
    public function run()
    {
        $statuses = [
            ['name' => 'Presente', 'slug' => 'present'],
            ['name' => 'Ausente', 'slug' => 'absent'],
            ['name' => 'Justificado', 'slug' => 'justified'],
            ['name' => 'Tarde', 'slug' => 'late'],
        ];

        foreach ($statuses as $status) {
            AttendanceStatus::firstOrCreate(['slug' => $status['slug']], $status);
        }
    }
}
