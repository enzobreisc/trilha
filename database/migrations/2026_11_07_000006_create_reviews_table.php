<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('topic_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('interval_days');
            $table->date('due_on');
            $table->string('outcome')->nullable();
            $table->date('answered_on')->nullable();
            $table->timestamps();

            $table->index(['outcome', 'due_on']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
