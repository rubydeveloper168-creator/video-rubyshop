<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $teamPage = DB::table('pages')->where('slug', 'our-team')->first();

        if (!$teamPage) {
            return;
        }

        DB::table('pages')
            ->where('id', $teamPage->id)
            ->update([
                'name' => 'Our Team',
                'title' => 'Our Team - RUBYSHOP Professional Tool Support',
                'meta_description' => 'Meet the RUBYSHOP team supporting professional technicians and contractors with construction tools, product advice, spare parts, warranty guidance, and after-sales service.',
                'meta_keywords' => 'RUBYSHOP team, construction tools support, product advice, spare parts, warranty, after-sales service, professional tools Thailand',
                'translations' => json_encode([
                    'th' => [
                        'name' => 'ทีมของเรา',
                        'title' => 'ทีม RUBYSHOP - ผู้ช่วยด้านเครื่องมือช่างมืออาชีพ',
                        'meta_description' => 'พบกับทีม RUBYSHOP ที่ช่วยช่างมืออาชีพและผู้รับเหมาด้วยคำแนะนำเครื่องมือก่อสร้าง อะไหล่ ข้อมูลรับประกัน และบริการหลังการขาย',
                        'meta_keywords' => 'ทีม RUBYSHOP, เครื่องมือช่าง, อุปกรณ์ก่อสร้าง, คำแนะนำสินค้า, อะไหล่, รับประกัน, บริการหลังการขาย',
                    ],
                ], JSON_UNESCAPED_UNICODE),
            ]);

        $sections = [
            'top_instructors' => [
                'title' => 'Meet the RUBYSHOP Support Team',
                'description' => 'Our team helps professional technicians and contractors choose the right construction tools, understand machine setup, find spare parts, and keep equipment ready for real jobsite work.',
                'translations' => [
                    'th' => [
                        'title' => 'พบกับทีมสนับสนุนของ RUBYSHOP',
                        'description' => 'ทีมของเราช่วยช่างมืออาชีพและผู้รับเหมาเลือกเครื่องมือก่อสร้างให้เหมาะกับงาน แนะนำการใช้งานเบื้องต้น หาอะไหล่ และดูแลให้เครื่องพร้อมใช้งานจริงในไซต์งาน',
                    ],
                ],
            ],
            'partners' => [
                'title' => 'Trusted by technicians, contractors, and renovation teams across Thailand',
                'description' => null,
                'translations' => [
                    'th' => [
                        'title' => 'ได้รับความไว้วางใจจากช่าง ผู้รับเหมา และทีมรีโนเวททั่วไทย',
                    ],
                ],
            ],
        ];

        foreach ($sections as $slug => $section) {
            DB::table('page_sections')
                ->where('page_id', $teamPage->id)
                ->where('slug', $slug)
                ->update([
                    'title' => $section['title'],
                    'description' => $section['description'],
                    'translations' => json_encode($section['translations'], JSON_UNESCAPED_UNICODE),
                ]);
        }
    }

    public function down(): void
    {
        //
    }
};
