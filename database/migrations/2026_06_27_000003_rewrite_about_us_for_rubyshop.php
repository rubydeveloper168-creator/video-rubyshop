<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $aboutPage = DB::table('pages')->where('slug', 'about-us')->first();

        if (!$aboutPage) {
            return;
        }

        DB::table('pages')
            ->where('id', $aboutPage->id)
            ->update([
                'name' => 'About Us',
                'title' => 'About RUBYSHOP - Professional Tools for Builders',
                'meta_description' => 'RUBYSHOP supplies professional construction tools, airless sprayers, mortar sprayers, wall chasers, waterproofing injection tools, and accessories across Thailand.',
                'meta_keywords' => 'RUBYSHOP, professional tools, construction tools, airless sprayer, mortar sprayer, wall chaser, waterproofing tools',
                'translations' => json_encode([
                    'th' => [
                        'name' => 'เกี่ยวกับเรา',
                        'title' => 'เกี่ยวกับ RUBYSHOP - เครื่องมือช่างมืออาชีพ',
                        'meta_description' => 'RUBYSHOP จำหน่ายเครื่องมือช่างและอุปกรณ์ก่อสร้างสำหรับมืออาชีพ เช่น เครื่องพ่นสีแรงดันสูง เครื่องพ่นปูน เครื่องกรีดผนัง เครื่องยิงโฟม และอุปกรณ์งานกันซึม ส่งทั่วไทย',
                        'meta_keywords' => 'RUBYSHOP, เครื่องมือช่าง, อุปกรณ์ก่อสร้าง, เครื่องพ่นสี, เครื่องพ่นปูน, เครื่องกรีดผนัง, เครื่องมือกันซึม',
                    ],
                ], JSON_UNESCAPED_UNICODE),
            ]);

        $sections = [
            'hero' => [
                'title' => 'About RUBYSHOP',
                'properties' => [
                    'array' => [
                        [
                            'title' => 'Built for Professional Worksites',
                            'description' => 'RUBYSHOP supplies professional tools and construction equipment for painters, builders, contractors, and renovation teams. We focus on machines that help real work move faster, cleaner, and more reliably on site.',
                            'image' => '/assets/images/team-1.jpg',
                        ],
                        [
                            'title' => 'Tools, Parts, and Support',
                            'description' => 'From airless paint sprayers and mortar sprayers to wall chasers, waterproofing injection tools, spare parts, and accessories, our goal is to help customers choose the right equipment and keep it working after purchase.',
                            'image' => '/assets/images/team-2.jpg',
                        ],
                    ],
                ],
                'translations' => [
                    'th' => [
                        'title' => 'เกี่ยวกับ RUBYSHOP',
                        'properties' => [
                            'array' => [
                                [
                                    'title' => 'สร้างมาเพื่องานไซต์มืออาชีพ',
                                    'description' => 'RUBYSHOP จำหน่ายเครื่องมือช่างและอุปกรณ์ก่อสร้างสำหรับช่างสี ช่างก่อสร้าง ผู้รับเหมา และทีมรีโนเวท เราเน้นเครื่องมือที่ช่วยให้งานจริงทำได้เร็วขึ้น เนี้ยบขึ้น และมั่นใจมากขึ้นในทุกไซต์งาน',
                                ],
                                [
                                    'title' => 'มีทั้งเครื่อง อะไหล่ และคำแนะนำ',
                                    'description' => 'ตั้งแต่เครื่องพ่นสีแรงดันสูง เครื่องพ่นปูน เครื่องกรีดผนัง เครื่องยิงโฟม งานกันซึม ไปจนถึงอะไหล่และอุปกรณ์เสริม เป้าหมายของเราคือช่วยให้ลูกค้าเลือกเครื่องมือได้ถูกงาน และดูแลต่อได้หลังการขาย',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            'success_statistics' => [
                'title' => 'Trusted Tools for Serious Jobs',
                'description' => 'Our success is measured by the jobs our customers finish with confidence. RUBYSHOP supports professional work with practical equipment, clear product guidance, nationwide delivery, and after-sales service.',
                'properties' => [
                    'array' => [
                        ['count' => '100+', 'title' => 'Professional Tool Models', 'image' => '/assets/images/students-1.jpg'],
                        ['count' => '300+', 'title' => 'Parts and Accessories', 'image' => '/assets/images/students-2.jpg'],
                        ['count' => '40k+', 'title' => 'Customers Reached Online', 'image' => '/assets/images/students-3.jpg'],
                    ],
                ],
                'translations' => [
                    'th' => [
                        'title' => 'เครื่องมือที่ช่างมืออาชีพไว้วางใจ',
                        'description' => 'ความสำเร็จของเราวัดจากงานที่ลูกค้าทำเสร็จได้อย่างมั่นใจ RUBYSHOP สนับสนุนงานมืออาชีพด้วยเครื่องมือที่ใช้งานได้จริง คำแนะนำที่ชัดเจน การจัดส่งทั่วไทย และบริการหลังการขาย',
                        'properties' => [
                            'array' => [
                                ['title' => 'รุ่นเครื่องมือสำหรับงานมืออาชีพ'],
                                ['title' => 'อะไหล่และอุปกรณ์เสริม'],
                                ['title' => 'ลูกค้าที่เข้าถึงผ่านช่องทางออนไลน์'],
                            ],
                        ],
                    ],
                ],
            ],
            'team' => [
                'title' => 'How We Help Customers Choose Better Tools',
                'description' => 'RUBYSHOP combines product knowledge, practical site experience, and after-sales support so customers can choose equipment that fits their materials, workload, and budget.',
                'properties' => [
                    'array' => [
                        ['name' => 'Product Consultation', 'role' => 'Choosing the right machine for the job', 'image' => '/assets/images/users/user-1.jpg'],
                        ['name' => 'Construction Tools', 'role' => 'Spraying, cutting, sanding, mixing, and finishing', 'image' => '/assets/images/users/user-2.jpg'],
                        ['name' => 'Parts and Accessories', 'role' => 'Nozzles, hoses, blades, rotors, stators, and wear parts', 'image' => '/assets/images/users/user-3.jpg'],
                        ['name' => 'After-Sales Support', 'role' => 'Warranty guidance, service, and product care', 'image' => '/assets/images/users/user-4.jpg'],
                        ['name' => 'Nationwide Delivery', 'role' => 'Shipping tools and parts across Thailand', 'image' => '/assets/images/users/user-5.jpg'],
                        ['name' => 'Worksite Solutions', 'role' => 'Tools for painters, contractors, and renovation teams', 'image' => '/assets/images/users/user-6.jpg'],
                        ['name' => 'Product Knowledge', 'role' => 'Clear information before customers buy', 'image' => '/assets/images/users/user-7.jpg'],
                        ['name' => 'Professional Results', 'role' => 'Helping customers work faster and finish cleaner', 'image' => '/assets/images/users/user-8.jpg'],
                    ],
                ],
                'translations' => [
                    'th' => [
                        'title' => 'เราช่วยลูกค้าเลือกเครื่องมือให้เหมาะกับงาน',
                        'description' => 'RUBYSHOP รวมความรู้สินค้า ประสบการณ์งานไซต์ และบริการหลังการขาย เพื่อให้ลูกค้าเลือกเครื่องมือที่เหมาะกับวัสดุ ปริมาณงาน และงบประมาณ',
                        'properties' => [
                            'array' => [
                                ['name' => 'ให้คำปรึกษาสินค้า', 'role' => 'เลือกเครื่องให้ตรงกับงาน'],
                                ['name' => 'เครื่องมืองานก่อสร้าง', 'role' => 'งานพ่น กรีด ขัด ผสม และเก็บผิว'],
                                ['name' => 'อะไหล่และอุปกรณ์เสริม', 'role' => 'หัวพ่น สาย ใบตัด โรเตอร์ สเตเตอร์ และอะไหล่สิ้นเปลือง'],
                                ['name' => 'บริการหลังการขาย', 'role' => 'คำแนะนำเรื่องรับประกัน งานบริการ และการดูแลสินค้า'],
                                ['name' => 'จัดส่งทั่วไทย', 'role' => 'จัดส่งเครื่องมือและอะไหล่ทั่วไทย'],
                                ['name' => 'โซลูชันหน้างาน', 'role' => 'เครื่องมือสำหรับช่างสี ผู้รับเหมา และทีมรีโนเวท'],
                                ['name' => 'ข้อมูลสินค้า', 'role' => 'ข้อมูลชัดเจนก่อนตัดสินใจซื้อ'],
                                ['name' => 'ผลงานแบบมืออาชีพ', 'role' => 'ช่วยให้งานเร็วขึ้นและจบงานเนี้ยบขึ้น'],
                            ],
                        ],
                    ],
                ],
            ],
            'call_to_action' => [
                'title' => 'Need Help Choosing a Tool?',
                'sub_title' => 'Talk to RUBYSHOP',
                'description' => 'Contact us for product advice, spare parts, warranty information, or help choosing equipment for your next project.',
                'properties' => [],
                'translations' => [
                    'th' => [
                        'title' => 'ต้องการเลือกเครื่องมือให้ตรงงาน?',
                        'sub_title' => 'คุยกับ RUBYSHOP',
                        'description' => 'ติดต่อเราเพื่อขอคำแนะนำสินค้า อะไหล่ ข้อมูลการรับประกัน หรือเลือกอุปกรณ์ให้เหมาะกับงานถัดไปของคุณ',
                    ],
                ],
            ],
        ];

        foreach ($sections as $slug => $section) {
            DB::table('page_sections')
                ->where('page_id', $aboutPage->id)
                ->where('slug', $slug)
                ->update([
                    'title' => $section['title'],
                    'sub_title' => $section['sub_title'] ?? null,
                    'description' => $section['description'] ?? null,
                    'properties' => json_encode($section['properties'], JSON_UNESCAPED_UNICODE),
                    'translations' => json_encode($section['translations'], JSON_UNESCAPED_UNICODE),
                ]);
        }
    }

    public function down(): void
    {
        //
    }
};
