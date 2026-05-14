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
        Schema::table('section_lessons', function (Blueprint $table) {
            $table->string('hls_playlist_path')->nullable()->after('lesson_src');
            $table->string('original_video_path')->nullable()->after('hls_playlist_path');
            $table->enum('processing_status', ['pending', 'processing', 'completed', 'failed'])->default('pending')->after('original_video_path');
            $table->text('processing_error')->nullable()->after('processing_status');
            $table->integer('video_segments')->nullable()->after('processing_error');
            $table->string('video_resolution')->nullable()->after('video_segments');
            $table->timestamp('processed_at')->nullable()->after('video_resolution');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('section_lessons', function (Blueprint $table) {
            $table->dropColumn([
                'hls_playlist_path',
                'original_video_path',
                'processing_status',
                'processing_error',
                'video_segments',
                'video_resolution',
                'processed_at'
            ]);
        });
    }
};
