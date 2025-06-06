<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::create('user_shift_attendance', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained('dashboard_users')->onDelete('cascade');
            $table->foreignId('shift_id')->constrained('turnos')->onDelete('cascade');

            $table->date('date');

            $table->foreignId('status_id')->constrained('attendance_statuses')->onDelete('restrict');

            $table->time('check_in_time')->nullable();
            $table->time('check_out_time')->nullable();

            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_shift_attendance');
    }
};
