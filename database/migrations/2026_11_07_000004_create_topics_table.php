<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('topics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('roadmap_id')->constrained()->cascadeOnDelete();
            $table->foreignId('topic_group_id')->constrained()->cascadeOnDelete();
            $table->string('key');
            $table->string('title');
            $table->text('summary')->nullable();
            $table->json('checklist');
            $table->json('signals')->nullable();
            $table->text('ai_prompt')->nullable();
            $table->json('review_checks');
            $table->text('exercise')->nullable();
            $table->json('sources');
            $table->unsignedSmallInteger('position');
            $table->string('status')->default('todo');
            $table->json('checked_items');
            $table->text('notes')->nullable();
            $table->date('started_on')->nullable();
            $table->date('completed_on')->nullable();
            $table->date('exercise_completed_on')->nullable();
            $table->timestamp('archived_at')->nullable();
            $table->timestamps();

            $table->unique(['roadmap_id', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('topics');
    }
};
