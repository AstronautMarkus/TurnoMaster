<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\Turnos\Turnos;
use App\Models\Shift\ShiftUser;
use App\Models\Shift\UserShiftAttendance;
use App\Models\Shift\AttendanceStatus;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ProcessAssistanceTurnos extends Command
{
    protected $signature = 'turnos:process-assistance';
    protected $description = 'Marca como inasistentes a usuarios que no registraron asistencia en turnos finalizados.';

    public function handle()
    {
        $now = Carbon::now();
        $today = $now->format('Y-m-d');
        $currentTime = $now->format('H:i:s');
        $currentDay = $now->locale('es')->isoFormat('dddd'); // Ej: 'lunes'

        // Capitalize and remove accents for comparison with 'days'
        $currentDayCapitalized = ucfirst(strtolower($currentDay));
        $currentDayCapitalized = str_replace(
            ['á','é','í','ó','ú','Á','É','Í','Ó','Ú'],
            ['a','e','i','o','u','A','E','I','O','U'],
            $currentDayCapitalized
        );

        // Get absent status
        $absentStatus = AttendanceStatus::where('slug', 'absent')->first();
        if (!$absentStatus) {
            $this->error('Estado "ausente" no encontrado.');
            return;
        }

        // Find shifts that ended before the current time
        $finishedShifts = Turnos::where('end_time', '<=', $currentTime)->get();

        foreach ($finishedShifts as $shift) {
            $assignedUsers = ShiftUser::where('shift_id', $shift->id)
                ->where('is_active', true)
                ->get();

            foreach ($assignedUsers as $assignment) {
                // Validate if the current day is in the 'days' field
                $assignedDays = array_map('trim', explode(',', $assignment->days));
                if (!in_array($currentDayCapitalized, $assignedDays)) {
                    continue;
                }

                $alreadyRegistered = UserShiftAttendance::where('user_id', $assignment->user_id)
                    ->where('shift_id', $shift->id)
                    ->whereDate('date', $today)
                    ->exists();

                if (!$alreadyRegistered) {
                    UserShiftAttendance::create([
                        'user_id' => $assignment->user_id,
                        'shift_id' => $shift->id,
                        'date' => $today,
                        'status_id' => $absentStatus->id,
                        'note' => 'Marcado automáticamente como inasistencia',
                    ]);

                    Log::info("Usuario {$assignment->user_id} marcado como inasistente en turno {$shift->id}");
                }
            }
        }

        $this->info('Proceso de asistencia automática ejecutado correctamente.');
    }
}
