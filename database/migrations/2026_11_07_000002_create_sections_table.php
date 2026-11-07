<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('roadmap_id')->constrained()->cascadeOnDelete();
            $table->string('key');
            $table->string('title');
            $table->unsignedSmallInteger('position');
            $table->timestamps();

            $table->unique(['roadmap_id', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sections');
    }
};
