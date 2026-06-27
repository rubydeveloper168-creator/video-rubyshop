<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            if (!Schema::hasColumn('pages', 'translations')) {
                $table->json('translations')->nullable()->after('meta_keywords');
            }
        });

        Schema::table('page_sections', function (Blueprint $table) {
            if (!Schema::hasColumn('page_sections', 'translations')) {
                $table->json('translations')->nullable()->after('properties');
            }
        });

        $aboutPage = DB::table('pages')->where('slug', 'about-us')->first();

        if (!$aboutPage) {
            return;
        }

        DB::table('pages')
            ->where('id', $aboutPage->id)
            ->update([
                'translations' => json_encode([
                    'th' => [
                        'name' => 'เกี่ยวกับเรา',
                        'title' => 'เกี่ยวกับเรา - ทำไมต้องเลือก Mentor?',
                        'meta_description' => 'Mentor LMS มีเนื้อหาคุณภาพ การเรียนรู้ในราคาที่เข้าถึงได้ และพัฒนาอย่างต่อเนื่องในการศึกษาออนไลน์',
                        'meta_keywords' => 'เกี่ยวกับเรา, พันธกิจ, วิสัยทัศน์, เนื้อหาคุณภาพ, เรียนออนไลน์, แพลตฟอร์มการศึกษา',
                    ],
                ], JSON_UNESCAPED_UNICODE),
            ]);

        $sectionTranslations = [
            'hero' => [
                'title' => 'เกี่ยวกับเรา',
                'properties' => [
                    'array' => [
                        [
                            'title' => 'พันธกิจของเรา',
                            'description' => 'ทำให้การศึกษาคุณภาพสูงเข้าถึงได้สำหรับทุกคน ทุกที่ เรามุ่งเชื่อมช่องว่างระหว่างความรู้และการนำไปใช้จริง พบกับทีมผู้สอน นักพัฒนา และนักออกแบบที่เชื่อว่าการเรียนรู้เปลี่ยนชีวิตได้',
                        ],
                        [
                            'title' => 'คุณค่าของเรา',
                            'description' => 'เราเชื่อในการสร้างความรักต่อการเรียนรู้ตลอดชีวิตผ่านวิธีสอนที่ทันสมัย ประสบการณ์เฉพาะบุคคล และชุมชนที่สนับสนุนกัน พบกับทีมผู้สอน นักพัฒนา และนักออกแบบที่เชื่อว่าการเรียนรู้เปลี่ยนชีวิตได้',
                        ],
                    ],
                ],
            ],
            'success_statistics' => [
                'title' => 'ความสำเร็จของเราขึ้นอยู่กับความสำเร็จของผู้เรียน',
                'description' => 'เราเชื่อว่าความสำเร็จของเราวัดจากความสำเร็จของผู้เรียน ทุกก้าวที่ผู้เรียนทำได้คือหลักฐานของความมุ่งมั่นของเราในการยกระดับการศึกษา',
                'properties' => [
                    'array' => [
                        ['title' => 'ผู้เรียนที่ใช้งานอยู่'],
                        ['title' => 'คอร์สยอดนิยม'],
                        ['title' => 'ผู้ใช้ที่ใช้งานอยู่'],
                    ],
                ],
            ],
            'team' => [
                'title' => 'ทีมเบื้องหลังพันธกิจ',
                'description' => 'พบกับทีมผู้สอน นักพัฒนา และนักออกแบบที่มีความมุ่งมั่นและเชื่อในพลังของการเรียนรู้ที่เปลี่ยนชีวิตผู้คนได้',
                'properties' => [
                    'array' => [
                        ['role' => 'ผู้สอนหลัก'],
                        ['role' => 'ผู้ออกแบบคอร์ส'],
                        ['role' => 'ผู้จัดการประสบการณ์การเรียนรู้'],
                        ['role' => 'ผู้อำนวยการฝ่ายเทคโนโลยี'],
                        ['role' => 'ผู้ประสานงานความสำเร็จของผู้เรียน'],
                        ['role' => 'นักวางกลยุทธ์เนื้อหา'],
                        ['role' => 'หัวหน้าฝ่ายประกันคุณภาพ'],
                        ['role' => 'ผู้จัดการชุมชน'],
                    ],
                ],
            ],
            'call_to_action' => [
                'title' => 'จดหมายข่าว',
                'sub_title' => 'สมัครรับข่าวสารของเรา',
                'description' => 'สมัครรับข่าวสารเพื่อรับข่าวและอัปเดตล่าสุด เราจะไม่ส่งสแปมถึงคุณ',
            ],
        ];

        foreach ($sectionTranslations as $slug => $translation) {
            DB::table('page_sections')
                ->where('page_id', $aboutPage->id)
                ->where('slug', $slug)
                ->update([
                    'translations' => json_encode(['th' => $translation], JSON_UNESCAPED_UNICODE),
                ]);
        }
    }

    public function down(): void
    {
        Schema::table('page_sections', function (Blueprint $table) {
            if (Schema::hasColumn('page_sections', 'translations')) {
                $table->dropColumn('translations');
            }
        });

        Schema::table('pages', function (Blueprint $table) {
            if (Schema::hasColumn('pages', 'translations')) {
                $table->dropColumn('translations');
            }
        });
    }
};
