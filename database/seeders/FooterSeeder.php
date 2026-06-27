<?php

namespace Database\Seeders;

use App\Models\Footer;
use App\Models\FooterItem;
use Illuminate\Database\Seeder;

class FooterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create footer
        $footer = Footer::create([
            'active' => true,
            'slug' => 'footer_1',
            'title' => 'Footer 1',
        ]);

        // Create footer items
        $footerItems = [
            [
                'type' => 'list',
                'slug' => 'company',
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
            [
                'type' => 'list',
                'slug' => 'products',
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
            [
                'type' => 'list',
                'slug' => 'address',
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
            [
                'type' => 'social_media',
                'slug' => 'social_media',
                'title' => 'Social Media',
                'items' => [
                    ['title' => 'Facebook', 'url' => 'https://www.facebook.com/rubyshopcoth', 'icon' => 'facebook'],
                    ['title' => 'Instagram', 'url' => 'https://www.instagram.com/rubyshop_168/', 'icon' => 'instagram'],
                    ['title' => 'YouTube', 'url' => 'https://www.youtube.com/channel/UCxiaZiIC8qs2C228jwIjcHg', 'icon' => 'youtube'],
                    ['title' => 'LINE Official', 'url' => 'https://page.line.me/rubyshop168?openQrModal=true', 'icon' => 'message-circle'],
                ],
            ],
            [
                'type' => 'payment_methods',
                'slug' => 'payment_methods',
                'title' => 'Secure payment and nationwide delivery.',
                'items' => [],
                'translations' => ['th' => ['title' => 'ชำระเงินปลอดภัยและจัดส่งทั่วไทย']],
            ],
            [
                'type' => 'copyright',
                'slug' => 'copyright',
                'title' => '© Copyright 2025 RUBYSHOP. All rights reserved.',
                'items' => [],
                'translations' => ['th' => ['title' => '© Copyright 2025 RUBYSHOP สงวนลิขสิทธิ์']],
            ],
        ];

        foreach ($footerItems as $itemData) {
            FooterItem::create([
                'footer_id' => $footer->id,
                ...$itemData,
            ]);
        }
    }
}
