<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('study_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('topic_id')->constrained()->cascadeOnDelete();
            $table->date('studied_on');
            $table->string('started_at', 5);
            $table->unsignedSmallInteger('duration_minutes');
            $table->json('activities');
            $table->text('note')->nullable();
            $table->timestamps();

            $table->index('studied_on');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('study_sessions');
    }
};
