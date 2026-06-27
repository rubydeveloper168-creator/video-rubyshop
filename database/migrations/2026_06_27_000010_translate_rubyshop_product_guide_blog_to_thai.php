<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('blogs')
            ->whereIn('slug', [
                'how-to-choose-professional-construction-tools-for-real-jobsite-work',
                'rubyshop-professional-construction-tools-guide',
            ])
            ->update([
                'title' => 'เลือกเครื่องมือก่อสร้างมืออาชีพอย่างไรให้เหมาะกับงานจริง',
                'slug' => 'rubyshop-professional-construction-tools-guide',
                'description' => $this->description(),
                'keywords' => 'RUBYSHOP, เครื่องมือก่อสร้าง, เครื่องพ่นสี Airless, เครื่องพ่นปูน, เครื่องกรีดผนัง, เครื่องขัดผนัง, เครื่องมือช่างมืออาชีพ',
                'status' => 'published',
                'updated_at' => now(),
            ]);
    }

    public function down(): void
    {
        DB::table('blogs')
            ->where('slug', 'rubyshop-professional-construction-tools-guide')
            ->update([
                'title' => 'How to Choose Professional Construction Tools for Real Jobsite Work',
                'slug' => 'how-to-choose-professional-construction-tools-for-real-jobsite-work',
                'description' => <<<'HTML'
<h2>Choosing tools that match the job matters more than buying the biggest machine</h2>
<p>RUBYSHOP supplies professional construction tools and equipment for technicians, contractors, and serious jobsite teams across Thailand. The right machine helps work faster, reduces rework, and keeps the finish consistent from the first day of the project to the final handover.</p>
HTML,
                'keywords' => 'RUBYSHOP, construction tools, airless paint sprayer, mortar sprayer, wall chaser, wall sander, professional tools Thailand',
                'updated_at' => now(),
            ]);
    }

    private function description(): string
    {
        return <<<'HTML'
<h2>เลือกเครื่องมือให้ตรงงาน สำคัญกว่าการซื้อเครื่องที่ใหญ่ที่สุด</h2>
<p>RUBYSHOP จำหน่ายเครื่องมือช่างและอุปกรณ์ก่อสร้างสำหรับช่างมืออาชีพ ผู้รับเหมา และทีมงานไซต์งานทั่วประเทศไทย เครื่องมือที่เหมาะสมช่วยให้งานเร็วขึ้น ลดการแก้งาน และทำให้คุณภาพงานสม่ำเสมอตั้งแต่เริ่มงานจนส่งมอบงาน</p>

<h3>เริ่มจากประเภทงานที่ทำเป็นหลัก</h3>
<p>ถ้าเป็นงานสี เครื่องพ่นสีแรงดันสูง Airless เหมาะกับงานที่ต้องการความเร็ว ความเรียบเนียน และการพ่นที่ครอบคลุมพื้นที่กว้าง เช่น ผนัง เพดาน โรงงาน บ้านพักอาศัย และอาคารพาณิชย์ ส่วนงานฉาบ งานพ่นปูน หรืองานสกิมโค้ท เครื่องพ่นปูนและเครื่องพ่นสกิมโค้ทจะช่วยลดแรงงานและเพิ่มพื้นที่งานต่อวันได้มากขึ้น</p>

<h3>เลือกเครื่องให้เหมาะกับวัสดุ</h3>
<p>วัสดุแต่ละชนิดมีความหนืดและวิธีใช้งานต่างกัน สี รองพื้น วัสดุกันซึม ปูน สกิมโค้ท โฟม และเคมีฉีดอัด ล้วนต้องใช้เครื่อง หัวพ่น สาย และแรงดันที่เหมาะสม ก่อนซื้อควรดูว่าวัสดุที่ใช้บ่อยที่สุดคืออะไร แล้วเลือกเครื่องที่รองรับงานนั้นได้จริงและใช้งานต่อเนื่องได้ดี</p>

<h3>อย่าลืมเรื่องอะไหล่และการดูแลหลังการขาย</h3>
<p>เครื่องมือมืออาชีพจะคุ้มค่าก็ต่อเมื่อใช้งานได้ต่อเนื่อง RUBYSHOP มีสินค้าในกลุ่มเครื่องพ่นสี Airless, เครื่องพ่นปูน, เครื่องกรีดผนัง, เครื่องขัดผนัง, เครื่องขัดพื้นคอนกรีต, เครื่องดัดเหล็ก, เครื่องมือกันซึม, อะไหล่ และอุปกรณ์เสริม พร้อมคำแนะนำการใช้งาน อะไหล่ทดแทน และบริการหลังการขาย</p>

<h3>เลือกผู้ขายที่ให้คำแนะนำ ไม่ใช่ดูแค่ราคา</h3>
<p>ราคาถูกอาจกลายเป็นต้นทุนสูง ถ้าเครื่องซ่อมยาก อะไหล่หายาก หรือไม่มีคนช่วยแนะนำเมื่อเกิดปัญหา ผู้รับเหมาควรเลือกผู้จำหน่ายที่อธิบายการตั้งค่าเครื่องได้ แนะนำอุปกรณ์เสริมที่จำเป็น และช่วยแก้ปัญหาหน้างานหลังการซื้อได้จริง</p>

<p>หากคุณกำลังเลือกเครื่องมือสำหรับโปรเจกต์ถัดไป ติดต่อ RUBYSHOP เพื่อรับคำแนะนำสินค้า อะไหล่ และบริการจัดส่งทั่วประเทศไทย</p>
HTML;
    }
};
