<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $items = [
            ['title' => 'Facebook', 'url' => 'https://www.facebook.com/rubyshopcoth', 'icon' => 'facebook'],
            ['title' => 'Instagram', 'url' => 'https://www.instagram.com/rubyshop_168/', 'icon' => 'instagram'],
            ['title' => 'YouTube', 'url' => 'https://www.youtube.com/channel/UCxiaZiIC8qs2C228jwIjcHg', 'icon' => 'youtube'],
            ['title' => 'LINE Official', 'url' => 'https://page.line.me/rubyshop168?openQrModal=true', 'icon' => 'message-circle'],
        ];

        DB::table('footer_items')
            ->where('slug', 'social_media')
            ->update([
                'items' => json_encode($items, JSON_UNESCAPED_UNICODE),
            ]);
    }

    public function down(): void
    {
        $items = [
            ['title' => 'Facebook', 'url' => 'https://www.facebook.com/rubyshoptools', 'icon' => 'facebook'],
            ['title' => 'Instagram', 'url' => 'https://www.instagram.com/rubyshoptools', 'icon' => 'instagram'],
            ['title' => 'YouTube', 'url' => 'https://www.youtube.com/', 'icon' => 'youtube'],
        ];

        DB::table('footer_items')
            ->where('slug', 'social_media')
            ->update([
                'items' => json_encode($items, JSON_UNESCAPED_UNICODE),
            ]);
    }
};
