<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dashboard_users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->unsignedBigInteger('rut');
            $table->string('rut_dv', 1);
            $table->string('email')->unique();
            $table->string('password');
            $table->string('profile_photo')->nullable()->default(null);
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('role_id');
            $table->unsignedBigInteger('assigned_turno_id')->nullable()->default(null);
            $table->timestamps();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
            $table->foreign('assigned_turno_id')->references('id')->on('turnos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dashboard_users');
    }
};
