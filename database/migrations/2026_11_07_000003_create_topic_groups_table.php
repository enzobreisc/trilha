<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('topic_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('section_id')->constrained()->cascadeOnDelete();
            $table->string('key');
            $table->string('title');
            $table->unsignedSmallInteger('position');
            $table->timestamps();

            $table->unique(['section_id', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('topic_groups');
    }
};
