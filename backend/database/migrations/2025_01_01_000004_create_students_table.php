<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->constrained('schools')->onDelete('cascade');
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('roll_number')->unique();
            $table->string('class')->nullable();
            $table->string('section')->nullable();
            $table->string('phone')->nullable();
            $table->string('parent_phone')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('gender')->nullable();
            $table->text('address')->nullable();
            $table->date('admission_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index('school_id');
            $table->index('class');
            $table->index('roll_number');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
