<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_audit_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('session_id', 120)->index();
            $table->string('ip_address', 64)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->timestamp('last_activity_at')->nullable();
            $table->unsignedInteger('active_seconds')->default(0);
            $table->unsignedInteger('idle_seconds')->default(0);
            $table->timestamps();

            $table->unique(['user_id', 'session_id']);
        });

        Schema::create('user_page_visits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('audit_session_id')->nullable()->constrained('user_audit_sessions')->nullOnDelete();
            $table->string('session_id', 120)->index();
            $table->string('route_name')->nullable()->index();
            $table->text('url');
            $table->string('title')->nullable();
            $table->text('referrer')->nullable();
            $table->timestamp('entered_at')->nullable();
            $table->timestamp('left_at')->nullable();
            $table->unsignedInteger('duration_seconds')->default(0);
            $table->timestamps();
        });

        Schema::create('user_video_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('audit_session_id')->nullable()->constrained('user_audit_sessions')->nullOnDelete();
            $table->string('session_id', 120)->index();
            $table->foreignId('course_id')->nullable()->constrained('courses')->nullOnDelete();
            $table->foreignId('lesson_id')->nullable()->constrained('section_lessons')->nullOnDelete();
            $table->string('event_type', 40)->index();
            $table->unsignedInteger('playback_position')->default(0);
            $table->unsignedInteger('watched_seconds')->default(0);
            $table->unsignedTinyInteger('percent_watched')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('user_activity_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('audit_session_id')->nullable()->constrained('user_audit_sessions')->nullOnDelete();
            $table->string('session_id', 120)->index();
            $table->string('event_type', 80)->index();
            $table->nullableMorphs('subject');
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_activity_events');
        Schema::dropIfExists('user_video_events');
        Schema::dropIfExists('user_page_visits');
        Schema::dropIfExists('user_audit_sessions');
    }
};
