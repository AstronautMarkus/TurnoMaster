<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role', ['Jefe', 'RRHH', 'Empleado', 'Demo'])->default('Empleado');
            $table->foreignId('company_id')->nullable()->constrained('companies')->onDelete('cascade');
            $table->boolean('is_trial')->default(false);
            $table->timestamp('expires_at')->nullable();
            $table->string('temporary_password')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};

