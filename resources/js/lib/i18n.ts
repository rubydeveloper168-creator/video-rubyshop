import { useEffect, useState } from 'react';

export type AppLocale = 'en' | 'th';

type TranslationValue = string | ((params?: Record<string, string | number>) => string);
type TranslatableRecord = Record<string, any> & {
   translations?: Partial<Record<AppLocale, Record<string, any>>>;
};

const STORAGE_KEY = 'rubyshop.locale';

const translations = {
   en: {
      'common.language': 'Language',
      'common.english': 'English',
      'common.thai': 'Thai',
      'common.search': 'Search',
      'common.all': 'All',
      'common.free': 'free',
      'common.dashboard': 'Dashboard',
      'common.logOut': 'Log Out',
      'common.signUp': 'Sign Up',
      'common.logIn': 'Log In',
      'common.back': 'Back',
      'common.customize': 'Customize',
      'nav.myCourses': 'My Courses',
      'nav.wishlist': 'Wishlist',
      'nav.myProfile': 'My Profile',
      'nav.settings': 'Settings',
      'nav.courses': 'Courses',
      'nav.aboutUs': 'About Us',
      'nav.ourTeam': 'Our Team',
      'nav.careers': 'Careers',
      'nav.blogs': 'Blogs',
      'nav.theme': 'Theme',
      'nav.notification': 'Notification',
      'nav.profile': 'Profile',
      'courses.allCourses': 'All Courses',
      'courses.categoryCourses': ({ category = 'All' } = {}) => `${category} Courses`,
      'courses.pageTitleAll': 'All Courses',
      'courses.metaAll': ({ total = 0 } = {}) =>
         `Browse ${total}+ online courses from expert instructors. Learn new skills with our comprehensive course catalog.`,
      'courses.metaKeywords': 'online courses, learning platform, education, skills, training, e-learning',
      'courses.ogTitle': 'Online Courses',
      'courses.collectionName': ({ title = 'All Courses' } = {}) => `${title} Collection`,
      'courses.categoryMetaDescription': ({ category = '' } = {}) => `Learn ${String(category).toLowerCase()} with comprehensive online courses`,
      'courses.childPageTitle': ({ child = '', category = '' } = {}) => `${child} Courses in ${category}`,
      'courses.childOgTitle': ({ child = '', category = '' } = {}) => `${child} - ${category} Courses`,
      'courses.childMeta': ({ child = '', category = '', total = 0 } = {}) =>
         `Learn ${String(child).toLowerCase()} with ${total} specialized courses in ${String(category).toLowerCase()}. Expert instructors, practical projects, and industry-relevant curriculum.`,
      'courses.childKeywords': ({ child = '', category = '' } = {}) =>
         `${String(child).toLowerCase()}, ${String(category).toLowerCase()}, courses, training, ${child} certification, ${category} skills`,
      'courses.categoryPageTitle': ({ category = '' } = {}) => `${category} Courses`,
      'courses.categoryOgTitle': ({ category = '' } = {}) => `${category} Courses`,
      'courses.categoryMeta': ({ category = '', total = 0 } = {}) =>
         `Explore ${total} ${String(category).toLowerCase()} courses taught by industry experts. Master ${String(category).toLowerCase()} skills with hands-on projects and comprehensive curriculum.`,
      'courses.categoryKeywords': ({ category = '' } = {}) =>
         `${String(category).toLowerCase()}, courses, training, online learning, ${category} certification, ${category} skills`,
      'courses.imageAlt': ({ title = 'All Courses' } = {}) => `${title} - Course Catalog`,
      'courses.gridView': 'Grid View',
      'courses.listView': 'List View',
      'courses.filters': 'Filters',
      'courses.categories': 'Categories',
      'courses.price': 'Price',
      'courses.level': 'Level',
      'courses.student': 'Student',
      'courses.students': 'Students',
      'courses.review': 'Review',
      'courses.reviews': 'Reviews',
      'courses.addWishlist': 'Add to Wishlist',
      'courses.removeWishlist': 'Remove from Wishlist',
      'courses.learnMore': 'Learn More',
      'courseDetail.overview': 'Overview',
      'courseDetail.curriculum': 'Curriculum',
      'courseDetail.details': 'Details',
      'courseDetail.instructor': 'Instructor',
      'courseDetail.reviews': 'Reviews',
      'courseDetail.faqs': 'Faqs',
      'courseDetail.courseCurriculum': 'Course curriculum',
      'courseDetail.noLessons': 'There is no lesson added',
      'courseDetail.requirements': 'Requirements',
      'courseDetail.outcomes': 'Outcomes',
      'courseDetail.courseCertificate': 'Course Certificate',
      'courseDetail.enrolledStudents': ({ count = 0 } = {}) => `${count} Enrolled ${Number(count) === 1 ? 'Student' : 'Students'}`,
      'courseDetail.studentsCount': ({ count = 0 } = {}) => `${count} ${Number(count) === 1 ? 'Student' : 'Students'}`,
      'courseDetail.coursesCount': ({ count = 0 } = {}) => `${count} ${Number(count) === 1 ? 'Course' : 'Courses'}`,
      'courseDetail.reviewsCount': ({ count = 0 } = {}) => `${count} ${Number(count) === 1 ? 'Review' : 'Reviews'}`,
      'courseDetail.students': 'Students',
      'courseDetail.duration': 'Duration',
      'courseDetail.expiryPeriod': 'Expiry Period',
      'courseDetail.certificate': 'Certificate',
      'courseDetail.yes': 'Yes',
      'courseDetail.addCart': 'Add to cart',
      'courseDetail.enrollNow': 'Enroll Now',
      'courseDetail.buyNow': 'Buy Now',
      'courseDetail.playCourse': 'Play Course',
      'courseDetail.coursePlayer': 'Course Player',
      'courseDetail.previewTitle': 'Course Preview Video',
      'courseDetail.previewDescription': ({ title = '' } = {}) => `Preview video for ${title}`,
      'courseDetail.studentFeedback': 'Student feedback',
      'courseDetail.courseRating': 'Course Rating',
      'courseDetail.studentReviews': 'Student Reviews',
      'courseDetail.noReviews': 'No reviews found.',
      'courseDetail.viewDetails': 'View Details',
      'pagination.pageOf': ({ current = 1, total = 1 } = {}) => `Page ${current} of ${total}`,
      'pagination.of': ({ current = 1, total = 1 } = {}) => `${current} of ${total}`,
      'pagination.goToPage': 'Go to page:',
      'pagination.first': 'First',
      'pagination.prev': 'Prev',
      'pagination.next': 'Next',
      'pagination.last': 'Last',
   },
   th: {
      'common.language': 'ภาษา',
      'common.english': 'อังกฤษ',
      'common.thai': 'ไทย',
      'common.search': 'ค้นหา',
      'common.all': 'ทั้งหมด',
      'common.free': 'ฟรี',
      'common.dashboard': 'แดชบอร์ด',
      'common.logOut': 'ออกจากระบบ',
      'common.signUp': 'สมัครสมาชิก',
      'common.logIn': 'เข้าสู่ระบบ',
      'common.back': 'กลับ',
      'common.customize': 'ปรับแต่ง',
      'nav.myCourses': 'คอร์สของฉัน',
      'nav.wishlist': 'รายการโปรด',
      'nav.myProfile': 'โปรไฟล์ของฉัน',
      'nav.settings': 'ตั้งค่า',
      'nav.courses': 'คอร์ส',
      'nav.aboutUs': 'เกี่ยวกับเรา',
      'nav.ourTeam': 'ทีมของเรา',
      'nav.careers': 'ร่วมงานกับเรา',
      'nav.blogs': 'บทความ',
      'nav.theme': 'ธีม',
      'nav.notification': 'การแจ้งเตือน',
      'nav.profile': 'โปรไฟล์',
      'courses.allCourses': 'คอร์สทั้งหมด',
      'courses.categoryCourses': ({ category = 'ทั้งหมด' } = {}) => `คอร์ส${category}`,
      'courses.pageTitleAll': 'คอร์สทั้งหมด',
      'courses.metaAll': ({ total = 0 } = {}) => `เลือกเรียนจาก ${total}+ คอร์สออนไลน์โดยผู้สอนมืออาชีพ พร้อมเนื้อหาที่ช่วยพัฒนาทักษะใหม่`,
      'courses.metaKeywords': 'คอร์สออนไลน์, แพลตฟอร์มเรียนออนไลน์, การศึกษา, ทักษะ, อบรม, อีเลิร์นนิง',
      'courses.ogTitle': 'คอร์สออนไลน์',
      'courses.collectionName': ({ title = 'คอร์สทั้งหมด' } = {}) => `ชุด${title}`,
      'courses.categoryMetaDescription': ({ category = '' } = {}) => `เรียนรู้${String(category).toLowerCase()}ผ่านคอร์สออนไลน์ที่ครบถ้วน`,
      'courses.childPageTitle': ({ child = '', category = '' } = {}) => `คอร์ส${child} ในหมวด ${category}`,
      'courses.childOgTitle': ({ child = '', category = '' } = {}) => `คอร์ส${child} - ${category}`,
      'courses.childMeta': ({ child = '', category = '', total = 0 } = {}) =>
         `เรียนรู้${String(child).toLowerCase()}จาก ${total} คอร์สเฉพาะทางในหมวด ${String(category).toLowerCase()} พร้อมผู้สอนมืออาชีพและเนื้อหาที่ใช้งานได้จริง`,
      'courses.childKeywords': ({ child = '', category = '' } = {}) =>
         `${String(child).toLowerCase()}, ${String(category).toLowerCase()}, คอร์ส, อบรม, ใบรับรอง ${child}, ทักษะ ${category}`,
      'courses.categoryPageTitle': ({ category = '' } = {}) => `คอร์ส${category}`,
      'courses.categoryOgTitle': ({ category = '' } = {}) => `คอร์ส${category}`,
      'courses.categoryMeta': ({ category = '', total = 0 } = {}) =>
         `สำรวจ ${total} คอร์ส${String(category).toLowerCase()}จากผู้สอนมืออาชีพ พร้อมโปรเจกต์ฝึกปฏิบัติและหลักสูตรครบถ้วน`,
      'courses.categoryKeywords': ({ category = '' } = {}) =>
         `${String(category).toLowerCase()}, คอร์ส, อบรม, เรียนออนไลน์, ใบรับรอง ${category}, ทักษะ ${category}`,
      'courses.imageAlt': ({ title = 'คอร์สทั้งหมด' } = {}) => `${title} - แคตตาล็อกคอร์ส`,
      'courses.gridView': 'มุมมองตาราง',
      'courses.listView': 'มุมมองรายการ',
      'courses.filters': 'ตัวกรอง',
      'courses.categories': 'หมวดหมู่',
      'courses.price': 'ราคา',
      'courses.level': 'ระดับ',
      'courses.student': 'ผู้เรียน',
      'courses.students': 'ผู้เรียน',
      'courses.review': 'รีวิว',
      'courses.reviews': 'รีวิว',
      'courses.addWishlist': 'เพิ่มในรายการโปรด',
      'courses.removeWishlist': 'ลบออกจากรายการโปรด',
      'courses.learnMore': 'ดูรายละเอียด',
      'courseDetail.overview': 'ภาพรวม',
      'courseDetail.curriculum': 'หลักสูตร',
      'courseDetail.details': 'รายละเอียด',
      'courseDetail.instructor': 'ผู้สอน',
      'courseDetail.reviews': 'รีวิว',
      'courseDetail.faqs': 'คำถามที่พบบ่อย',
      'courseDetail.courseCurriculum': 'เนื้อหาหลักสูตร',
      'courseDetail.noLessons': 'ยังไม่มีบทเรียน',
      'courseDetail.requirements': 'สิ่งที่ต้องมี',
      'courseDetail.outcomes': 'ผลลัพธ์ที่ได้',
      'courseDetail.courseCertificate': 'ใบรับรองคอร์ส',
      'courseDetail.enrolledStudents': ({ count = 0 } = {}) => `${count} ผู้เรียนที่ลงทะเบียน`,
      'courseDetail.studentsCount': ({ count = 0 } = {}) => `${count} ผู้เรียน`,
      'courseDetail.coursesCount': ({ count = 0 } = {}) => `${count} คอร์ส`,
      'courseDetail.reviewsCount': ({ count = 0 } = {}) => `${count} รีวิว`,
      'courseDetail.students': 'ผู้เรียน',
      'courseDetail.duration': 'ระยะเวลา',
      'courseDetail.expiryPeriod': 'ระยะเวลาหมดอายุ',
      'courseDetail.certificate': 'ใบรับรอง',
      'courseDetail.yes': 'มี',
      'courseDetail.addCart': 'เพิ่มลงตะกร้า',
      'courseDetail.enrollNow': 'ลงทะเบียนเรียน',
      'courseDetail.buyNow': 'ซื้อเลย',
      'courseDetail.playCourse': 'เริ่มเรียน',
      'courseDetail.coursePlayer': 'หน้าดูคอร์ส',
      'courseDetail.previewTitle': 'วิดีโอตัวอย่างคอร์ส',
      'courseDetail.previewDescription': ({ title = '' } = {}) => `วิดีโอตัวอย่างสำหรับ ${title}`,
      'courseDetail.studentFeedback': 'ความคิดเห็นจากผู้เรียน',
      'courseDetail.courseRating': 'คะแนนคอร์ส',
      'courseDetail.studentReviews': 'รีวิวจากผู้เรียน',
      'courseDetail.noReviews': 'ยังไม่มีรีวิว',
      'courseDetail.viewDetails': 'ดูรายละเอียด',
      'pagination.pageOf': ({ current = 1, total = 1 } = {}) => `หน้า ${current} จาก ${total}`,
      'pagination.of': ({ current = 1, total = 1 } = {}) => `${current} จาก ${total}`,
      'pagination.goToPage': 'ไปที่หน้า:',
      'pagination.first': 'หน้าแรก',
      'pagination.prev': 'ก่อนหน้า',
      'pagination.next': 'ถัดไป',
      'pagination.last': 'หน้าสุดท้าย',
   },
} satisfies Record<AppLocale, Record<string, TranslationValue>>;

export type TranslationKey = keyof (typeof translations)['en'];

const staticTextTranslations = {
   th: {
      'About Us': 'เกี่ยวกับเรา',
      'about-us': 'เกี่ยวกับเรา',
      'About Us - Why Choose Mentor?': 'เกี่ยวกับเรา - ทำไมต้องเลือก Mentor?',
      'Our Mission': 'พันธกิจของเรา',
      'Our Value': 'คุณค่าของเรา',
      'To democratize education by making high-quality learning accessible to everyone, everywhere. We strive to bridge the gap between knowledge and application. Meet our passionate team of educators, developers, and designers who believe in the power of learning to change lives.':
         'ทำให้การศึกษาคุณภาพสูงเข้าถึงได้สำหรับทุกคน ทุกที่ เรามุ่งเชื่อมช่องว่างระหว่างความรู้และการนำไปใช้จริง พบกับทีมผู้สอน นักพัฒนา และนักออกแบบที่เชื่อว่าการเรียนรู้เปลี่ยนชีวิตได้',
      'We believe in fostering a love for lifelong learning through innovative teaching methods, personalized experiences, and supportive communities. Meet our passionate team of educators, developers, and designers who believe in the power of learning to change lives.':
         'เราเชื่อในการสร้างความรักต่อการเรียนรู้ตลอดชีวิตผ่านวิธีสอนที่ทันสมัย ประสบการณ์เฉพาะบุคคล และชุมชนที่สนับสนุนกัน พบกับทีมผู้สอน นักพัฒนา และนักออกแบบที่เชื่อว่าการเรียนรู้เปลี่ยนชีวิตได้',
      'Our Success Depends on Our Students Success': 'ความสำเร็จของเราขึ้นอยู่กับความสำเร็จของผู้เรียน',
      "We believe that our success is measured by our students' achievements. Every milestone they reach is a testament to our commitment to excellence in education.":
         'เราเชื่อว่าความสำเร็จของเราวัดจากความสำเร็จของผู้เรียน ทุกก้าวที่ผู้เรียนทำได้คือหลักฐานของความมุ่งมั่นของเราในการยกระดับการศึกษา',
      'Browse Courses': 'เลือกดูคอร์ส',
      'Active Students': 'ผู้เรียนที่ใช้งานอยู่',
      'Best Courses': 'คอร์สยอดนิยม',
      'Active Users': 'ผู้ใช้ที่ใช้งานอยู่',
      'The Minds Behind the Mission': 'ทีมเบื้องหลังพันธกิจ',
      'Meet our passionate team of educators, developers, and designers who believe in the power of learning to change lives. Meet our passionate team of educators, developers, and designers who believe in the power of learning to change lives.':
         'พบกับทีมผู้สอน นักพัฒนา และนักออกแบบที่มีความมุ่งมั่นและเชื่อในพลังของการเรียนรู้ที่เปลี่ยนชีวิตผู้คนได้',
      'Lead Instructor': 'ผู้สอนหลัก',
      'Course Designer': 'ผู้ออกแบบคอร์ส',
      'Learning Experience Manager': 'ผู้จัดการประสบการณ์การเรียนรู้',
      'Technology Director': 'ผู้อำนวยการฝ่ายเทคโนโลยี',
      'Student Success Coordinator': 'ผู้ประสานงานความสำเร็จของผู้เรียน',
      'Content Strategist': 'นักวางกลยุทธ์เนื้อหา',
      'Quality Assurance Lead': 'หัวหน้าฝ่ายประกันคุณภาพ',
      'Community Manager': 'ผู้จัดการชุมชน',
      Newsletter: 'จดหมายข่าว',
      'Subscribe Our Newsletter': 'สมัครรับข่าวสารของเรา',
      'Subscribe to our newsletter to get the latest news and updates. We will not spam you.':
         'สมัครรับข่าวสารเพื่อรับข่าวและอัปเดตล่าสุด เราจะไม่ส่งสแปมถึงคุณ',
      'Enter your email address': 'กรอกอีเมลของคุณ',
      Subscribe: 'สมัครรับข่าวสาร',
      'Job Circulars': 'ประกาศรับสมัครงาน',
      'No job circulars found': 'ไม่พบประกาศรับสมัครงาน',
      'Get started by creating your first job circular': 'เริ่มต้นด้วยการสร้างประกาศรับสมัครงานแรกของคุณ',
      Position: 'ตำแหน่ง',
      Positions: 'ตำแหน่ง',
   },
} satisfies Record<Exclude<AppLocale, 'en'>, Record<string, string>>;

const isLocale = (value: string | null): value is AppLocale => value === 'en' || value === 'th';

export const getStoredLocale = (): AppLocale => {
   if (typeof window === 'undefined') return 'th';

   const stored = window.localStorage.getItem(STORAGE_KEY);
   if (isLocale(stored)) return stored;

   return 'th';
};

export const setStoredLocale = (locale: AppLocale) => {
   if (typeof window === 'undefined') return;

   window.localStorage.setItem(STORAGE_KEY, locale);
   document.documentElement.lang = locale;
   window.dispatchEvent(new CustomEvent('app-locale-change', { detail: locale }));
};

export const translate = (locale: AppLocale, key: TranslationKey, params?: Record<string, string | number>) => {
   const value = translations[locale][key] ?? translations.en[key] ?? key;

   if (typeof value === 'function') {
      return value(params);
   }

   return value;
};

export const translateStaticText = (locale: AppLocale, value?: string | null) => {
   if (!value) return value || '';

   return locale === 'en' ? value : staticTextTranslations[locale][value] || value;
};

const mergeTranslationValue = (source: any, translation: any): any => {
   if (translation === undefined || translation === null || translation === '') {
      return source;
   }

   if (Array.isArray(source) && Array.isArray(translation)) {
      return source.map((item, index) => mergeTranslationValue(item, translation[index]));
   }

   if (
      source &&
      translation &&
      typeof source === 'object' &&
      typeof translation === 'object' &&
      !Array.isArray(source) &&
      !Array.isArray(translation)
   ) {
      return Object.keys({ ...source, ...translation }).reduce<Record<string, any>>((merged, key) => {
         merged[key] = mergeTranslationValue(source[key], translation[key]);
         return merged;
      }, {});
   }

   return translation;
};

export const translateRecordField = <T extends TranslatableRecord, K extends keyof T & string>(locale: AppLocale, record?: T | null, field?: K) => {
   if (!record || !field) return '';

   if (locale === 'en') return record[field] ?? '';

   const translated = record.translations?.[locale]?.[field];
   if (translated !== undefined && translated !== null && translated !== '') {
      return translated;
   }

   return record[field] ?? '';
};

export const translateRecordProperties = <T extends TranslatableRecord>(locale: AppLocale, record?: T | null) => {
   const properties = record?.properties || {};

   if (!record || locale === 'en') return properties;

   return mergeTranslationValue(properties, record.translations?.[locale]?.properties || {});
};

export const useI18n = () => {
   const [locale, setLocaleState] = useState<AppLocale>(() => getStoredLocale());

   useEffect(() => {
      document.documentElement.lang = locale;

      const handleLocaleChange = (event: Event) => {
         const nextLocale = (event as CustomEvent<AppLocale>).detail;
         if (isLocale(nextLocale)) {
            setLocaleState(nextLocale);
         }
      };
      const handleStorageChange = () => setLocaleState(getStoredLocale());

      window.addEventListener('app-locale-change', handleLocaleChange);
      window.addEventListener('storage', handleStorageChange);

      return () => {
         window.removeEventListener('app-locale-change', handleLocaleChange);
         window.removeEventListener('storage', handleStorageChange);
      };
   }, [locale]);

   const setLocale = (nextLocale: AppLocale) => {
      setStoredLocale(nextLocale);
      setLocaleState(nextLocale);
   };

   return {
      locale,
      setLocale,
      t: (key: TranslationKey, params?: Record<string, string | number>) => translate(locale, key, params),
      text: (value?: string | null) => translateStaticText(locale, value),
      field: <T extends TranslatableRecord, K extends keyof T & string>(record?: T | null, key?: K) => translateRecordField(locale, record, key),
      properties: <T extends TranslatableRecord>(record?: T | null) => translateRecordProperties(locale, record),
   };
};
