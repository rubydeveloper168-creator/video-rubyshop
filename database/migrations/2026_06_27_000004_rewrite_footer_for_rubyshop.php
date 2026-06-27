<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('footer_items', function (Blueprint $table) {
            if (!Schema::hasColumn('footer_items', 'translations')) {
                $table->json('translations')->nullable()->after('items');
            }
        });

        $footer = DB::table('footers')->where('slug', 'footer_1')->first();

        if ($footer) {
            $items = [
                'company' => [
                    'type' => 'list',
                    'title' => 'RUBYSHOP',
                    'items' => [
                        ['title' => 'About Us', 'url' => '/about-us'],
                        ['title' => 'All Products', 'url' => '/courses/all'],
                        ['title' => 'Product Guides', 'url' => '/blogs'],
                        ['title' => 'Contact Us', 'url' => '/contact-us'],
                    ],
                    'translations' => [
                        'th' => [
                            'title' => 'RUBYSHOP',
                            'items' => [
                                ['title' => 'เกี่ยวกับเรา'],
                                ['title' => 'สินค้าทั้งหมด'],
                                ['title' => 'คู่มือเลือกซื้อ'],
                                ['title' => 'ติดต่อเรา'],
                            ],
                        ],
                    ],
                ],
                'legal_policies' => [
                    'slug' => 'products',
                    'type' => 'list',
                    'title' => 'Product Categories',
                    'items' => [
                        ['title' => 'Airless Paint Sprayers', 'url' => '/courses/all'],
                        ['title' => 'Mortar Sprayers', 'url' => '/courses/all'],
                        ['title' => 'Wall Chasers', 'url' => '/courses/all'],
                        ['title' => 'Parts & Accessories', 'url' => '/courses/all'],
                    ],
                    'translations' => [
                        'th' => [
                            'title' => 'หมวดหมู่สินค้า',
                            'items' => [
                                ['title' => 'เครื่องพ่นสีแรงดันสูง'],
                                ['title' => 'เครื่องพ่นปูน'],
                                ['title' => 'เครื่องกรีดผนัง'],
                                ['title' => 'อะไหล่และอุปกรณ์เสริม'],
                            ],
                        ],
                    ],
                ],
                'products' => [
                    'type' => 'list',
                    'title' => 'Product Categories',
                    'items' => [
                        ['title' => 'Airless Paint Sprayers', 'url' => '/courses/all'],
                        ['title' => 'Mortar Sprayers', 'url' => '/courses/all'],
                        ['title' => 'Wall Chasers', 'url' => '/courses/all'],
                        ['title' => 'Parts & Accessories', 'url' => '/courses/all'],
                    ],
                    'translations' => [
                        'th' => [
                            'title' => 'หมวดหมู่สินค้า',
                            'items' => [
                                ['title' => 'เครื่องพ่นสีแรงดันสูง'],
                                ['title' => 'เครื่องพ่นปูน'],
                                ['title' => 'เครื่องกรีดผนัง'],
                                ['title' => 'อะไหล่และอุปกรณ์เสริม'],
                            ],
                        ],
                    ],
                ],
                'address' => [
                    'type' => 'list',
                    'title' => 'Contact',
                    'items' => [
                        ['title' => '97/60 Kosum Ruam Jai Soi 39, Don Mueang, Bangkok 10210'],
                        ['title' => 'Email: info@rubyshop.co.th'],
                        ['title' => 'Phone: 089-666-7802'],
                        ['title' => 'Open: Mon-Sat 08:30-17:30'],
                    ],
                    'translations' => [
                        'th' => [
                            'title' => 'ติดต่อเรา',
                            'items' => [
                                ['title' => '97/60 โกสุมรวมใจ ซ.39 แขวงดอนเมือง เขตดอนเมือง กรุงเทพฯ 10210'],
                                ['title' => 'อีเมล: info@rubyshop.co.th'],
                                ['title' => 'โทร: 089-666-7802'],
                                ['title' => 'เปิดทำการ: จันทร์-เสาร์ 08:30-17:30 น.'],
                            ],
                        ],
                    ],
                ],
                'social_media' => [
                    'type' => 'social_media',
                    'title' => 'Social Media',
                    'items' => [
                        ['title' => 'Facebook', 'url' => 'https://www.facebook.com/rubyshopcoth', 'icon' => 'facebook'],
                        ['title' => 'Instagram', 'url' => 'https://www.instagram.com/rubyshop_168/', 'icon' => 'instagram'],
                        ['title' => 'YouTube', 'url' => 'https://www.youtube.com/channel/UCxiaZiIC8qs2C228jwIjcHg', 'icon' => 'youtube'],
                        ['title' => 'LINE Official', 'url' => 'https://page.line.me/rubyshop168?openQrModal=true', 'icon' => 'message-circle'],
                    ],
                    'translations' => ['th' => ['title' => 'โซเชียลมีเดีย']],
                ],
                'payment_methods' => [
                    'type' => 'payment_methods',
                    'title' => 'Secure payment and nationwide delivery.',
                    'items' => [],
                    'translations' => ['th' => ['title' => 'ชำระเงินปลอดภัยและจัดส่งทั่วไทย']],
                ],
                'copyright' => [
                    'type' => 'copyright',
                    'title' => '© Copyright 2025 RUBYSHOP. All rights reserved.',
                    'items' => [],
                    'translations' => ['th' => ['title' => '© Copyright 2025 RUBYSHOP สงวนลิขสิทธิ์']],
                ],
            ];

            foreach ($items as $currentSlug => $data) {
                DB::table('footer_items')
                    ->where('footer_id', $footer->id)
                    ->where('slug', $currentSlug)
                    ->update([
                        'slug' => $data['slug'] ?? $currentSlug,
                        'type' => $data['type'],
                        'title' => $data['title'],
                        'items' => json_encode($data['items'], JSON_UNESCAPED_UNICODE),
                        'translations' => json_encode($data['translations'], JSON_UNESCAPED_UNICODE),
                    ]);
            }
        }

        $footerSections = [
            'footer_list_1' => [
                'title' => 'RUBYSHOP',
                'properties' => [
                    'array' => [
                        ['title' => 'About Us', 'url' => '/about-us'],
                        ['title' => 'All Products', 'url' => '/courses/all'],
                        ['title' => 'Product Guides', 'url' => '/blogs'],
                        ['title' => 'Contact Us', 'url' => '/contact-us'],
                    ],
                ],
                'translations' => [
                    'th' => [
                        'title' => 'RUBYSHOP',
                        'properties' => [
                            'array' => [
                                ['title' => 'เกี่ยวกับเรา'],
                                ['title' => 'สินค้าทั้งหมด'],
                                ['title' => 'คู่มือเลือกซื้อ'],
                                ['title' => 'ติดต่อเรา'],
                            ],
                        ],
                    ],
                ],
            ],
            'footer_list_2' => [
                'title' => 'Product Categories',
                'properties' => [
                    'array' => [
                        ['title' => 'Airless Paint Sprayers', 'url' => '/courses/all'],
                        ['title' => 'Mortar Sprayers', 'url' => '/courses/all'],
                        ['title' => 'Wall Chasers', 'url' => '/courses/all'],
                        ['title' => 'Parts & Accessories', 'url' => '/courses/all'],
                    ],
                ],
                'translations' => [
                    'th' => [
                        'title' => 'หมวดหมู่สินค้า',
                        'properties' => [
                            'array' => [
                                ['title' => 'เครื่องพ่นสีแรงดันสูง'],
                                ['title' => 'เครื่องพ่นปูน'],
                                ['title' => 'เครื่องกรีดผนัง'],
                                ['title' => 'อะไหล่และอุปกรณ์เสริม'],
                            ],
                        ],
                    ],
                ],
            ],
            'footer_list_3' => [
                'title' => 'Contact',
                'properties' => [
                    'array' => [
                        ['title' => '97/60 Kosum Ruam Jai Soi 39, Don Mueang, Bangkok 10210'],
                        ['title' => 'Email: info@rubyshop.co.th'],
                        ['title' => 'Phone: 089-666-7802'],
                        ['title' => 'Open: Mon-Sat 08:30-17:30'],
                    ],
                ],
                'translations' => [
                    'th' => [
                        'title' => 'ติดต่อเรา',
                        'properties' => [
                            'array' => [
                                ['title' => '97/60 โกสุมรวมใจ ซ.39 แขวงดอนเมือง เขตดอนเมือง กรุงเทพฯ 10210'],
                                ['title' => 'อีเมล: info@rubyshop.co.th'],
                                ['title' => 'โทร: 089-666-7802'],
                                ['title' => 'เปิดทำการ: จันทร์-เสาร์ 08:30-17:30 น.'],
                            ],
                        ],
                    ],
                ],
            ],
        ];

        foreach ($footerSections as $slug => $section) {
            DB::table('page_sections')
                ->where('slug', $slug)
                ->update([
                    'title' => $section['title'],
                    'properties' => json_encode($section['properties'], JSON_UNESCAPED_UNICODE),
                    'translations' => json_encode($section['translations'], JSON_UNESCAPED_UNICODE),
                ]);
        }
    }

    public function down(): void
    {
        Schema::table('footer_items', function (Blueprint $table) {
            if (Schema::hasColumn('footer_items', 'translations')) {
                $table->dropColumn('translations');
            }
        });
    }
};
