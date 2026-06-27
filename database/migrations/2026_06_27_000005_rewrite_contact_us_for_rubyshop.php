<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $englishDescription = '<h1 style="text-align: center;"><strong>Contact RUBYSHOP</strong></h1><p style="text-align: center;">Need help choosing professional tools for painting, plastering, wall chasing, waterproofing, injection work, or concrete surface preparation? RUBYSHOP is ready to help you select the right machine, spare parts, and accessories for your job.</p><h2><strong>Product Advice</strong></h2><p>Talk to us before buying if you need guidance on airless paint sprayers, mortar sprayers, skim coat machines, wall chasers, wall sanders, injection pumps, or waterproofing tools.</p><p><strong>Phone: 089-666-7802</strong></p><h2><strong>Spare Parts &amp; Accessories</strong></h2><p>Contact us for nozzles, hoses, blades, rotors, stators, spray guns, wear parts, and accessories for professional jobsite equipment.</p><p><strong>Email: info@rubyshop.co.th</strong></p><h2><strong>Warranty &amp; After-Sales Support</strong></h2><p>We support customers with warranty information, product care, repair guidance, and machine-use advice so your tools stay ready for work.</p><h2><strong>Visit Our Shop</strong></h2><p><strong>RUBYSHOP PART., LTD.</strong></p><p>97/60 Kosum Ruam Jai Soi 39, Don Mueang, Bangkok 10210, Thailand</p><p><strong>Open:</strong> Monday-Saturday 08:30-17:30</p><h2><strong>Online Store</strong></h2><p>Browse product categories, guides, and professional tools at <strong>www.rubyshop.co.th</strong>.</p><p style="text-align: center;">RUBYSHOP helps professional technicians and contractors work faster, cleaner, and with more confidence on every jobsite.</p>';
        $thaiDescription = '<h1 style="text-align: center;"><strong>ติดต่อ RUBYSHOP</strong></h1><p style="text-align: center;">ต้องการคำแนะนำในการเลือกเครื่องมือสำหรับงานพ่นสี พ่นปูน กรีดผนัง กันซึม ยิงโฟม อีพ็อกซี่ หรือเตรียมพื้นผิวคอนกรีต RUBYSHOP พร้อมช่วยเลือกเครื่อง อะไหล่ และอุปกรณ์เสริมให้เหมาะกับงานของคุณ</p><h2><strong>ปรึกษาเลือกสินค้า</strong></h2><p>ติดต่อเราก่อนตัดสินใจซื้อ หากต้องการคำแนะนำเกี่ยวกับเครื่องพ่นสีแรงดันสูง เครื่องพ่นปูน เครื่องพ่นสกิมโค้ท เครื่องกรีดผนัง เครื่องขัดผนัง เครื่องยิงโฟม หรือเครื่องมือกันซึม</p><p><strong>โทร: 089-666-7802</strong></p><h2><strong>อะไหล่และอุปกรณ์เสริม</strong></h2><p>สอบถามหัวพ่น สายพ่น ใบตัด โรเตอร์ สเตเตอร์ ปืนพ่นสี อะไหล่สิ้นเปลือง และอุปกรณ์เสริมสำหรับเครื่องมือช่างมืออาชีพ</p><p><strong>อีเมล: info@rubyshop.co.th</strong></p><h2><strong>รับประกันและบริการหลังการขาย</strong></h2><p>เราช่วยให้ข้อมูลการรับประกัน การดูแลสินค้า คำแนะนำเรื่องงานซ่อม และการใช้งานเครื่องมือ เพื่อให้เครื่องพร้อมใช้งานในไซต์งานของคุณ</p><h2><strong>ที่อยู่ร้าน</strong></h2><p><strong>RUBYSHOP PART., LTD.</strong></p><p>97/60 โกสุมรวมใจ ซ.39 แขวงดอนเมือง เขตดอนเมือง กรุงเทพมหานคร 10210</p><p><strong>เปิดทำการ:</strong> จันทร์-เสาร์ 08:30-17:30 น.</p><h2><strong>ร้านค้าออนไลน์</strong></h2><p>ดูหมวดหมู่สินค้า คู่มือเลือกซื้อ และเครื่องมือช่างมืออาชีพได้ที่ <strong>www.rubyshop.co.th</strong></p><p style="text-align: center;">RUBYSHOP ช่วยให้ช่างมืออาชีพและผู้รับเหมาทำงานได้เร็วขึ้น เนี้ยบขึ้น และมั่นใจมากขึ้นในทุกไซต์งาน</p>';

        DB::table('pages')
            ->where('slug', 'contact-us')
            ->update([
                'name' => 'Contact Us',
                'title' => 'Contact RUBYSHOP - Professional Tools and Support',
                'description' => $englishDescription,
                'meta_description' => 'Contact RUBYSHOP for professional construction tools, airless sprayers, mortar sprayers, wall chasers, spare parts, warranty information, and product advice.',
                'meta_keywords' => 'contact RUBYSHOP, construction tools support, airless sprayer support, mortar sprayer parts, wall chaser, waterproofing tools, Bangkok tools shop',
                'translations' => json_encode([
                    'th' => [
                        'name' => 'ติดต่อเรา',
                        'title' => 'ติดต่อ RUBYSHOP - เครื่องมือช่างและบริการสำหรับมืออาชีพ',
                        'description' => $thaiDescription,
                        'meta_description' => 'ติดต่อ RUBYSHOP เพื่อสอบถามเครื่องมือช่าง อุปกรณ์ก่อสร้าง เครื่องพ่นสี เครื่องพ่นปูน เครื่องกรีดผนัง อะไหล่ ข้อมูลรับประกัน และคำแนะนำสินค้า',
                        'meta_keywords' => 'ติดต่อ RUBYSHOP, เครื่องมือช่าง, อุปกรณ์ก่อสร้าง, เครื่องพ่นสี, เครื่องพ่นปูน, เครื่องกรีดผนัง, อะไหล่เครื่องมือช่าง',
                    ],
                ], JSON_UNESCAPED_UNICODE),
            ]);
    }

    public function down(): void
    {
        //
    }
};
