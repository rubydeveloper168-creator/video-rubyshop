<?php

namespace Database\Data\Sections;

class InnerSections
{
   /**
    * Get About Us sections data
    */
   public static function getAboutUsSections(): array
   {
      $sections = [
         [
            'name' => 'Hero',
            'slug' => 'hero',
            'title' => 'About RUBYSHOP',
            'flags' => [
               'title' => true,
            ],
            'properties' => [
               'array' => [
                  [
                     'title' => 'Built for Professional Worksites',
                     'description' => 'RUBYSHOP supplies professional tools and construction equipment for painters, builders, contractors, and renovation teams. We focus on machines that help real work move faster, cleaner, and more reliably on site.',
                     'image' => '/assets/images/team-1.jpg'
                  ],
                  [
                     'title' => 'Tools, Parts, and Support',
                     'description' => 'From airless paint sprayers and mortar sprayers to wall chasers, waterproofing injection tools, spare parts, and accessories, our goal is to help customers choose the right equipment and keep it working after purchase.',
                     'image' => '/assets/images/team-2.jpg'
                  ]
               ]
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
         [
            'name' => 'Success Statistics',
            'slug' => 'success_statistics',
            'title' => 'Trusted Tools for Serious Jobs',
            'description' => 'Our success is measured by the jobs our customers finish with confidence. RUBYSHOP supports professional work with practical equipment, clear product guidance, nationwide delivery, and after-sales service.',
            'flags' => [
               'title' => true,
               'description' => true,
            ],
            'properties' => [
               'array' => [
                  [
                     'count' => '100+',
                     'title' => 'Professional Tool Models',
                     'image' => '/assets/images/students-1.jpg'
                  ],
                  [
                     'count' => '300+',
                     'title' => 'Parts and Accessories',
                     'image' => '/assets/images/students-2.jpg'
                  ],
                  [
                     'count' => '40k+',
                     'title' => 'Customers Reached Online',
                     'image' => '/assets/images/students-3.jpg'
                  ]
               ]
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
         [
            'name' => 'Team',
            'slug' => 'team',
            'title' => 'How We Help Customers Choose Better Tools',
            'description' => 'RUBYSHOP combines product knowledge, practical site experience, and after-sales support so customers can choose equipment that fits their materials, workload, and budget.',
            'flags' => [
               'title' => true,
               'description' => true,
            ],
            'properties' => [
               'array' => [
                  [
                     'name' => 'Product Consultation',
                     'role' => 'Choosing the right machine for the job',
                     'image' => '/assets/images/users/user-1.jpg'
                  ],
                  [
                     'name' => 'Construction Tools',
                     'role' => 'Spraying, cutting, sanding, mixing, and finishing',
                     'image' => '/assets/images/users/user-2.jpg'
                  ],
                  [
                     'name' => 'Parts and Accessories',
                     'role' => 'Nozzles, hoses, blades, rotors, stators, and wear parts',
                     'image' => '/assets/images/users/user-3.jpg'
                  ],
                  [
                     'name' => 'After-Sales Support',
                     'role' => 'Warranty guidance, service, and product care',
                     'image' => '/assets/images/users/user-4.jpg'
                  ],
                  [
                     'name' => 'Nationwide Delivery',
                     'role' => 'Shipping tools and parts across Thailand',
                     'image' => '/assets/images/users/user-5.jpg'
                  ],
                  [
                     'name' => 'Worksite Solutions',
                     'role' => 'Tools for painters, contractors, and renovation teams',
                     'image' => '/assets/images/users/user-6.jpg'
                  ],
                  [
                     'name' => 'Product Knowledge',
                     'role' => 'Clear information before customers buy',
                     'image' => '/assets/images/users/user-7.jpg'
                  ],
                  [
                     'name' => 'Professional Results',
                     'role' => 'Helping customers work faster and finish cleaner',
                     'image' => '/assets/images/users/user-8.jpg'
                  ]
               ]
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
         [
            'name' => 'Newsletter',
            'slug' => 'call_to_action',
            'title' => 'Need Help Choosing a Tool?',
            'sub_title' => 'Talk to RUBYSHOP',
            'description' => 'Contact us for product advice, spare parts, warranty information, or help choosing equipment for your next project.',
            'flags' => [
               'title' => true,
               'sub_title' => true,
               'description' => true,
            ],
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

      foreach ($sections as $key => &$section) {
         $section['active'] = true;
         $section['sort'] = $key + 1;
      }

      return $sections;
   }

   /**
    * Get Our Team sections data
    */
   public static function getOurTeamSections(): array
   {
      $sections = [
         [
            'name' => 'Top Instructors',
            'slug' => 'top_instructors',
            'title' => 'Meet the RUBYSHOP Support Team',
            'description' => 'Our team helps professional technicians and contractors choose the right construction tools, understand machine setup, find spare parts, and keep equipment ready for real jobsite work.',
            'flags' => [
               'title' => true,
               'description' => true,
            ],
            'properties' => [
               'contents' => [2, 3, 4, 5, 6, 7, 8, 9] // Example instructor IDs
            ],
            'translations' => [
               'th' => [
                  'title' => 'พบกับทีมสนับสนุนของ RUBYSHOP',
                  'description' => 'ทีมของเราช่วยช่างมืออาชีพและผู้รับเหมาเลือกเครื่องมือก่อสร้างให้เหมาะกับงาน แนะนำการใช้งานเบื้องต้น หาอะไหล่ และดูแลให้เครื่องพร้อมใช้งานจริงในไซต์งาน',
               ],
            ],
         ],
         [
            'name' => 'Partners',
            'slug' => 'partners',
            'title' => 'Trusted by technicians, contractors, and renovation teams across Thailand',
            'flags' => [
               'title' => true,
            ],
            'properties' => [
               'array' => [
                  ['image' => '/assets/logos/logo-1.png'],
                  ['image' => '/assets/logos/logo-2.png'],
                  ['image' => '/assets/logos/logo-3.png'],
                  ['image' => '/assets/logos/logo-4.png'],
                  ['image' => '/assets/logos/logo-5.png'],
                  ['image' => '/assets/logos/logo-6.png'],
                  ['image' => '/assets/logos/logo-7.png'],
                  ['image' => '/assets/logos/logo-8.png']
               ]
            ],
            'translations' => [
               'th' => [
                  'title' => 'ได้รับความไว้วางใจจากช่าง ผู้รับเหมา และทีมรีโนเวททั่วไทย',
               ],
            ],
         ],
      ];

      foreach ($sections as $key => &$section) {
         $section['active'] = true;
         $section['sort'] = $key + 1;
      }

      return $sections;
   }

   /**
    * Get Contact Us sections data
    */
   public static function getContactUsDescription(): string
   {
      return '<h1 style="text-align: center;"><strong>Contact RUBYSHOP</strong></h1><p style="text-align: center;">Need help choosing professional tools for painting, plastering, wall chasing, waterproofing, injection work, or concrete surface preparation? RUBYSHOP is ready to help you select the right machine, spare parts, and accessories for your job.</p><h2><strong>Product Advice</strong></h2><p>Talk to us before buying if you need guidance on airless paint sprayers, mortar sprayers, skim coat machines, wall chasers, wall sanders, injection pumps, or waterproofing tools.</p><p><strong>Phone: 089-666-7802</strong></p><h2><strong>Spare Parts &amp; Accessories</strong></h2><p>Contact us for nozzles, hoses, blades, rotors, stators, spray guns, wear parts, and accessories for professional jobsite equipment.</p><p><strong>Email: info@rubyshop.co.th</strong></p><h2><strong>Warranty &amp; After-Sales Support</strong></h2><p>We support customers with warranty information, product care, repair guidance, and machine-use advice so your tools stay ready for work.</p><h2><strong>Visit Our Shop</strong></h2><p><strong>RUBYSHOP PART., LTD.</strong></p><p>97/60 Kosum Ruam Jai Soi 39, Don Mueang, Bangkok 10210, Thailand</p><p><strong>Open:</strong> Monday-Saturday 08:30-17:30</p><h2><strong>Online Store</strong></h2><p>Browse product categories, guides, and professional tools at <strong>www.rubyshop.co.th</strong>.</p><p style="text-align: center;">RUBYSHOP helps professional technicians and contractors work faster, cleaner, and with more confidence on every jobsite.</p>';
   }

   public static function getContactUsDescriptionThai(): string
   {
      return '<h1 style="text-align: center;"><strong>ติดต่อ RUBYSHOP</strong></h1><p style="text-align: center;">ต้องการคำแนะนำในการเลือกเครื่องมือสำหรับงานพ่นสี พ่นปูน กรีดผนัง กันซึม ยิงโฟม อีพ็อกซี่ หรือเตรียมพื้นผิวคอนกรีต RUBYSHOP พร้อมช่วยเลือกเครื่อง อะไหล่ และอุปกรณ์เสริมให้เหมาะกับงานของคุณ</p><h2><strong>ปรึกษาเลือกสินค้า</strong></h2><p>ติดต่อเราก่อนตัดสินใจซื้อ หากต้องการคำแนะนำเกี่ยวกับเครื่องพ่นสีแรงดันสูง เครื่องพ่นปูน เครื่องพ่นสกิมโค้ท เครื่องกรีดผนัง เครื่องขัดผนัง เครื่องยิงโฟม หรือเครื่องมือกันซึม</p><p><strong>โทร: 089-666-7802</strong></p><h2><strong>อะไหล่และอุปกรณ์เสริม</strong></h2><p>สอบถามหัวพ่น สายพ่น ใบตัด โรเตอร์ สเตเตอร์ ปืนพ่นสี อะไหล่สิ้นเปลือง และอุปกรณ์เสริมสำหรับเครื่องมือช่างมืออาชีพ</p><p><strong>อีเมล: info@rubyshop.co.th</strong></p><h2><strong>รับประกันและบริการหลังการขาย</strong></h2><p>เราช่วยให้ข้อมูลการรับประกัน การดูแลสินค้า คำแนะนำเรื่องงานซ่อม และการใช้งานเครื่องมือ เพื่อให้เครื่องพร้อมใช้งานในไซต์งานของคุณ</p><h2><strong>ที่อยู่ร้าน</strong></h2><p><strong>RUBYSHOP PART., LTD.</strong></p><p>97/60 โกสุมรวมใจ ซ.39 แขวงดอนเมือง เขตดอนเมือง กรุงเทพมหานคร 10210</p><p><strong>เปิดทำการ:</strong> จันทร์-เสาร์ 08:30-17:30 น.</p><h2><strong>ร้านค้าออนไลน์</strong></h2><p>ดูหมวดหมู่สินค้า คู่มือเลือกซื้อ และเครื่องมือช่างมืออาชีพได้ที่ <strong>www.rubyshop.co.th</strong></p><p style="text-align: center;">RUBYSHOP ช่วยให้ช่างมืออาชีพและผู้รับเหมาทำงานได้เร็วขึ้น เนี้ยบขึ้น และมั่นใจมากขึ้นในทุกไซต์งาน</p>';
   }

   /**
    * Get Cookie Policy sections data
    */
   public static function getCookiePolicyDescription(): string
   {
      return '<h1 style="text-align: center;"><strong>Cookie policy</strong></h1><h2><strong>Cookie policy</strong></h2><ol><li><p>Cookies are small text files that can be used by websites to make a user\'s experience more efficient.</p></li><li><p>The law states that we can store cookies on your device if they are strictly necessary for the operation of this site. For all other types of cookies we need your permission.</p></li><li><p>This site uses different types of cookies. Some cookies are placed by third party services that appear on our pages.</p></li></ol>';
   }

   /**
    * Get Terms and Conditions sections data
    */
   public static function getTermsAndConditionsDescription(): string
   {
      return '<h1 style="text-align: center;"><strong>Terms and Conditions</strong></h1><p>Welcome to Mentor. By accessing and using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our services.</p><h2><strong>1. Acceptance of Terms</strong></h2><p>By accessing and using the Mentor website and services, you accept and agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you must not use our platform.</p><h2><strong>2. Use of the Platform</strong></h2><p>You agree to use Mentor for lawful purposes only. You must not use our platform in any way that breaches any applicable local, national, or international law or regulation.</p><h2><strong>3. Account Registration</strong></h2><p>To access certain features of Mentor, you may be required to create an account. You agree to provide accurate and complete information during the registration process and to keep your account information up to date.</p><h2><strong>4. User Conduct</strong></h2><p>You agree not to use Mentor to:</p><ul><li><p>Post, upload, or distribute any content that is unlawful, defamatory, abusive, or otherwise objectionable.</p></li><li><p>Engage in any activity that could harm or disrupt the platform or other users\' experience.</p></li><li><p>Infringe upon the intellectual property rights of others.</p></li></ul><h2><strong>5. Intellectual Property</strong></h2><p>All content on Mentor, including but not limited to text, graphics, logos, and software, is the property of Mentor or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works based on our content without express written permission from Mentor.</p><h2><strong>6. Payment and Refunds</strong></h2><p>Certain courses and services on Mentor may be offered for a fee. All payments are non-refundable unless otherwise specified. Mentor reserves the right to change its pricing at any time.</p><h2><strong>7. Termination</strong></h2><p>Mentor reserves the right to terminate or suspend your account at our sole discretion, without prior notice, for conduct that we believe violates these terms or is harmful to other users of our platform.</p><h2><strong>8. Disclaimer of Warranties</strong></h2><p>Mentor provides the platform and services \'as is\' and without any warranty or condition, express, implied, or statutory. We do not guarantee that the platform will be uninterrupted or error-free.</p><h2><strong>9. Limitation of Liability</strong></h2><p>In no event shall Mentor be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use the platform; (b) any unauthorized access to or use of our services; (c) any interruption or cessation of transmission to or from our services.</p><h2><strong>10. Changes to Terms</strong></h2><p>Mentor reserves the right to modify these terms at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of the platform after any changes constitutes your acceptance of the new terms.</p><h2><strong>11. Governing Law</strong></h2><p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Mentor operates, without regard to its conflict of law principles.</p>';
   }

   /**
    * Get Privacy Policy sections data
    */
   public static function getPrivacyPolicyDescription(): string
   {
      return '<h1 style="text-align: center;"><strong>Privacy Policy</strong></h1><p>Welcome to Mentor. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information when you use our platform.</p><h2><strong>1. Information We Collect</strong></h2><p>We collect various types of information in connection with the services we provide, including:</p><ul><li><p><strong>Personal Information:</strong> When you register for an account, we may collect personal details such as your name, email address, phone number, and payment information.</p></li><li><p><strong>Usage Data:</strong> We collect information about your interactions with our platform, such as the pages you visit, the courses you access, and other actions you take.</p></li><li><p><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to track your activity on our platform and hold certain information.</p></li></ul><h2><strong>2. How We Use Your Information</strong></h2><p>We use the information we collect for various purposes, including:</p><ul><li><p><strong>Providing Services:</strong> To create and manage your account, process transactions, and provide the courses and services you request.</p></li><li><p><strong>Improving Our Platform:</strong> To analyze usage patterns and improve the functionality and user experience of our platform.</p></li><li><p><strong>Communication:</strong> To send you updates, newsletters, and other information that may be of interest to you. You can opt-out of receiving these communications at any time.</p></li><li><p><strong>Security:</strong> To monitor and protect the security of our platform and its users.</p></li></ul><h2><strong>3. Sharing Your Information</strong></h2><p>We may share your information with third parties in the following circumstances:</p><ul><li><p><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, and email delivery.</p></li><li><p><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p></li><li><p><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</p></li></ul><h2><strong>4. Data Security</strong></h2><p>We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee its absolute security.</p>';
   }

   /**
    * Get Refund Policy sections data
    */
   public static function getRefundPolicyDescription(): string
   {
      return '<h1 style="text-align: center;"><strong>Refund Policy</strong></h1><p>At Mentor, we strive to provide the best learning experience for our users. We understand that there may be situations where you may need to request a refund. This Refund Policy outlines the conditions and processes for obtaining a refund for purchases made on our platform.</p><h2><strong>1. General Refund Policy</strong></h2><p>Our general refund policy applies to all courses and services offered on Mentor. Refunds will be granted under the following conditions:</p><ul><li><p><strong>Course Not Accessed:</strong> If you have purchased a course and have not accessed any of its content, you may request a full refund within 14 days of the purchase date.</p></li><li><p><strong>Technical Issues:</strong> If you experience technical issues that prevent you from accessing the course content and we are unable to resolve the issue, you may request a refund within 14 days of the purchase date.</p></li></ul><h2><strong>2. Non-Refundable Items</strong></h2><p>Certain items and services are non-refundable. These include:</p><ul><li><p><strong>Downloaded Content:</strong> Any content that has been downloaded to your device is non-refundable.</p></li><li><p><strong>Completed Courses:</strong> If you have completed a course, it is not eligible for a refund.</p></li></ul><h2><strong>3. How to Request a Refund</strong></h2><p>To request a refund, please follow these steps:</p><ol><li><p><strong>Contact Support:</strong> Email our support team at <strong>support@uilib.com</strong> with your refund request. Include your order number, the course name, and the reason for the refund request.</p></li><li><p><strong>Review Process:</strong> Our support team will review your request and may ask for additional information to process your refund.</p></li><li><p><strong>Refund Approval:</strong> If your refund request meets the conditions outlined in this policy, we will process the refund to your original method of payment. Please allow 5-10 business days for the refund to appear in your account.</p></li></ol><h2><strong>4. Changes to Refund Policy</strong></h2><p>Mentor reserves the right to modify this Refund Policy at any time. We will notify you of any changes by posting the new policy on this page. Your continued use of the platform after any changes constitutes your acceptance of the new policy.</p>';
   }
}
