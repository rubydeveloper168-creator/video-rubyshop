<?php

namespace Database\Data;

use App\Enums\TeachingType;
use Database\Data\Sections\IntroSections;
use Database\Data\Sections\InnerSections;

class PageData
{
   /**
    * Get all pages data for seeding
    */
   public static function getAllPages(): array
   {
      return [
         ...self::getHomePages(),
         ...self::getInnerPages(),
      ];
   }

   /**
    * Get home pages data
    */
   public static function getHomePages(): array
   {
      return [
         // Home page 1
         [
            'name' => 'Collaborative 1',
            'slug' => 'home-1',
            'type' => TeachingType::COLLABORATIVE->value,
            'title' => 'Mentor LMS - Home Page 1',
            'description' => 'Discover top categories, trending courses, expert instructors, and more.',
            'meta_description' => 'Mentor LMS Home 1: Find your perfect course, learn from the best instructors, and join our community.',
            'meta_keywords' => 'online courses, best instructors, trending, categories, testimonials',
            'sections' => IntroSections::getHome1Sections(),
         ],
         // Home page 2
         [
            'name' => 'Collaborative 2',
            'slug' => 'home-2',
            'type' => TeachingType::COLLABORATIVE->value,
            'title' => 'Mentor LMS - Home Page 2',
            'description' => 'Discover top categories, trending courses, expert instructors, and more.',
            'meta_description' => 'Mentor LMS Home 1: Find your perfect course, learn from the best instructors, and join our community.',
            'meta_keywords' => 'online courses, best instructors, trending, categories, testimonials',
            'sections' => IntroSections::getHome2Sections(),
         ],
         // Home page 3
         [
            'name' => 'Collaborative 3',
            'slug' => 'home-3',
            'type' => TeachingType::COLLABORATIVE->value,
            'title' => 'Mentor LMS - Online Learning Platform',
            'description' => 'Learn from expert instructors with our wide range of online courses.',
            'meta_description' => 'Mentor LMS offers 5,500+ online courses taught by 400+ trusted instructors across various categories.',
            'meta_keywords' => 'online courses, e-learning, LMS, instructor-led, training, education',
            'sections' => IntroSections::getHome3Sections(),
         ],
         // Home page 4
         [
            'name' => 'Administrative 1',
            'slug' => 'home-4',
            'type' => TeachingType::ADMINISTRATIVE->value,
            'title' => 'Mentor LMS - Advanced Learning Platform',
            'description' => 'Immersive learning experience with AR/VR technology and expert-led courses',
            'meta_description' => 'Mentor LMS Home 3: Experience next-generation learning with immersive courses, expert instructors, and cutting-edge educational technology',
            'meta_keywords' => 'AR/VR learning, immersive education, online courses, virtual reality education, expert instructors',
            'sections' => IntroSections::getHome4Sections(),
         ],
         // Home page 5
         [
            'name' => 'Administrative 2',
            'slug' => 'home-5',
            'type' => TeachingType::ADMINISTRATIVE->value,
            'title' => 'Mentor LMS - Advanced Learning Platform',
            'description' => 'Immersive learning experience with AR/VR technology and expert-led courses',
            'meta_description' => 'Mentor LMS Home 3: Experience next-generation learning with immersive courses, expert instructors, and cutting-edge educational technology',
            'meta_keywords' => 'AR/VR learning, immersive education, online courses, virtual reality education, expert instructors',
            'sections' => IntroSections::getHome5Sections(),
         ],
      ];
   }

   /**
    * Get policy pages data
    */
   public static function getInnerPages(): array
   {
      return [
         // About Us page
         [
            'name' => 'About Us',
            'slug' => 'about-us',
            'type' => 'inner_page',
            'title' => 'About RUBYSHOP - Professional Tools for Builders',
            'meta_description' => 'RUBYSHOP supplies professional construction tools, airless sprayers, mortar sprayers, wall chasers, waterproofing injection tools, and accessories across Thailand.',
            'meta_keywords' => 'RUBYSHOP, professional tools, construction tools, airless sprayer, mortar sprayer, wall chaser, waterproofing tools',
            'translations' => [
               'th' => [
                  'name' => 'เกี่ยวกับเรา',
                  'title' => 'เกี่ยวกับ RUBYSHOP - เครื่องมือช่างมืออาชีพ',
                  'meta_description' => 'RUBYSHOP จำหน่ายเครื่องมือช่างและอุปกรณ์ก่อสร้างสำหรับมืออาชีพ เช่น เครื่องพ่นสีแรงดันสูง เครื่องพ่นปูน เครื่องกรีดผนัง เครื่องยิงโฟม และอุปกรณ์งานกันซึม ส่งทั่วไทย',
                  'meta_keywords' => 'RUBYSHOP, เครื่องมือช่าง, อุปกรณ์ก่อสร้าง, เครื่องพ่นสี, เครื่องพ่นปูน, เครื่องกรีดผนัง, เครื่องมือกันซึม',
               ],
            ],
            'sections' => InnerSections::getAboutUsSections()
         ],
         // Our Team page
         [
            'name' => 'Our Team',
            'slug' => 'our-team',
            'type' => 'inner_page',
            'title' => 'Our Team - RUBYSHOP Professional Tool Support',
            'meta_description' => 'Meet the RUBYSHOP team supporting professional technicians and contractors with construction tools, product advice, spare parts, warranty guidance, and after-sales service.',
            'meta_keywords' => 'RUBYSHOP team, construction tools support, product advice, spare parts, warranty, after-sales service, professional tools Thailand',
            'translations' => [
               'th' => [
                  'name' => 'ทีมของเรา',
                  'title' => 'ทีม RUBYSHOP - ผู้ช่วยด้านเครื่องมือช่างมืออาชีพ',
                  'meta_description' => 'พบกับทีม RUBYSHOP ที่ช่วยช่างมืออาชีพและผู้รับเหมาด้วยคำแนะนำเครื่องมือก่อสร้าง อะไหล่ ข้อมูลรับประกัน และบริการหลังการขาย',
                  'meta_keywords' => 'ทีม RUBYSHOP, เครื่องมือช่าง, อุปกรณ์ก่อสร้าง, คำแนะนำสินค้า, อะไหล่, รับประกัน, บริการหลังการขาย',
               ],
            ],
            'sections' => InnerSections::getOurTeamSections()
         ],
         // Careers page
         [
            'name' => 'Careers',
            'slug' => 'careers',
            'type' => 'inner_page',
            'title' => 'Careers - Join Our Mission at Mentor',
            'meta_description' => 'Join Mentor team and help transform education. Explore career opportunities, company culture, and growth prospects.',
            'meta_keywords' => 'careers, jobs, employment, Mentor jobs, education careers, remote work, software engineer, product manager',
            'sections' => []
         ],
         // Contact Us page
         [
            'name' => 'Contact Us',
            'slug' => 'contact-us',
            'type' => 'inner_page',
            'title' => 'Contact RUBYSHOP - Professional Tools and Support',
            'description' => InnerSections::getContactUsDescription(),
            'meta_description' => 'Contact RUBYSHOP for professional construction tools, airless sprayers, mortar sprayers, wall chasers, spare parts, warranty information, and product advice.',
            'meta_keywords' => 'contact RUBYSHOP, construction tools support, airless sprayer support, mortar sprayer parts, wall chaser, waterproofing tools, Bangkok tools shop',
            'translations' => [
               'th' => [
                  'name' => 'ติดต่อเรา',
                  'title' => 'ติดต่อ RUBYSHOP - เครื่องมือช่างและบริการสำหรับมืออาชีพ',
                  'description' => InnerSections::getContactUsDescriptionThai(),
                  'meta_description' => 'ติดต่อ RUBYSHOP เพื่อสอบถามเครื่องมือช่าง อุปกรณ์ก่อสร้าง เครื่องพ่นสี เครื่องพ่นปูน เครื่องกรีดผนัง อะไหล่ ข้อมูลรับประกัน และคำแนะนำสินค้า',
                  'meta_keywords' => 'ติดต่อ RUBYSHOP, เครื่องมือช่าง, อุปกรณ์ก่อสร้าง, เครื่องพ่นสี, เครื่องพ่นปูน, เครื่องกรีดผนัง, อะไหล่เครื่องมือช่าง',
               ],
            ],
            'sections' => []
         ],
         // Cookie Policy page
         [
            'name' => 'Cookie Policy',
            'slug' => 'cookie-policy',
            'type' => 'inner_page',
            'title' => 'Cookie Policy',
            'description' => InnerSections::getCookiePolicyDescription(),
            'meta_description' => 'Mentor LMS Cookie Policy: Learn about how we use cookies and similar technologies on our platform.',
            'meta_keywords' => 'cookie policy, cookies, privacy, tracking, web cookies, http cookies',
            'sections' => []
         ],
         // Terms and Conditions page
         [
            'name' => 'Terms and Conditions',
            'slug' => 'terms-and-conditions',
            'type' => 'inner_page',
            'title' => 'Terms and Conditions',
            'description' => InnerSections::getTermsAndConditionsDescription(),
            'meta_description' => 'Read Mentor LMS Terms and Conditions to understand your rights and responsibilities while using our platform.',
            'meta_keywords' => 'terms, conditions, terms of service, legal agreement, user agreement',
            'sections' => []
         ],
         // Privacy Policy page
         [
            'name' => 'Privacy Policy',
            'slug' => 'privacy-policy',
            'type' => 'inner_page',
            'title' => 'Privacy Policy',
            'description' => InnerSections::getPrivacyPolicyDescription(),
            'meta_description' => 'Learn about how Mentor LMS collects, uses, and protects your personal information in our Privacy Policy.',
            'meta_keywords' => 'privacy policy, data protection, personal information, data collection, data security',
            'sections' => []
         ],
         // Refund Policy page
         [
            'name' => 'Refund Policy',
            'slug' => 'refund-policy',
            'type' => 'inner_page',
            'title' => 'Refund Policy',
            'description' => InnerSections::getRefundPolicyDescription(),
            'meta_description' => 'Learn about Mentor LMS refund conditions and processes for course purchases and other services.',
            'meta_keywords' => 'refund policy, refunds, money back, course refund, payment returns',
            'sections' => []
         ],
      ];
   }
}
