import AppLogo from '@/components/app-logo';
import Appearance from '@/components/appearance';
import AppearanceToggleTab from '@/components/appearance-tabs';
import LanguageSwitcher from '@/components/language-switcher';
import Notification from '@/components/notification';
import SearchInput from '@/components/search-input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TranslationKey, useI18n } from '@/lib/i18n';
import { getPageSection } from '@/lib/page';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types/global';
import { Link, router, usePage } from '@inertiajs/react';
import { GraduationCap, Heart, LayoutDashboard, LogOut, Menu, SettingsIcon, UserCircle, X } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

const IntroNavbar = () => {
   const { props } = usePage<SharedData>();
   const { page, auth, customize } = props;
   const navbar = getPageSection(page, 'navbar');
   const { t } = useI18n();

   const user = auth.user;
   const [isSticky, setIsSticky] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const navTitle = (item: { slug?: string; title: string }) => translateNavbarItem(item, t);

   useEffect(() => {
      const handleScroll = () => {
         const scrollPosition = window.scrollY;
         if (scrollPosition > 100) {
            setIsSticky(true);
         } else {
            setIsSticky(false);
         }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <header className={cn('bg-background sticky top-0 z-50 border-b', isSticky && 'shadow-card')}>
         <div className={cn('relative container', customize && 'section-edit')}>
            <div className="flex h-[72px] items-center justify-between">
               {/* Logo */}
               <div className="flex items-center gap-0 sm:gap-4">
                  <Link href="/">
                     <AppLogo />
                  </Link>
               </div>

               {/* Desktop Navigation */}
               <nav className="hidden w-full max-w-[340px] items-center space-x-8 md:flex">
                  <SearchInput
                     className="[&>svg]:text-secondary-foreground md:max-w-[340px] [&>input]:h-10"
                     onChangeValue={(value) => router.get(route('category.courses', { category: 'all', search: value }))}
                  />
               </nav>

               {/* Desktop Auth Buttons */}
               <div className="flex items-center space-x-3">
                  <div className="hidden items-center gap-3 md:flex">
                     {navbar &&
                        navbar.properties.array.map((item) => (
                           <Link key={item.url} href={item.url} className="text-sm font-normal">
                              {navTitle(item)}
                           </Link>
                        ))}

                     <LanguageSwitcher />
                     {!user && <Appearance />}
                  </div>

                  {user ? (
                     <div className="mr-0 flex items-center space-x-2">
                        {user.role === 'admin' && (
                           <Button asChild variant="outline" className="hidden text-sm font-normal sm:block">
                              <Link href={props.customize ? '/' : '?customize=true'}>
                                 {props.customize ? t('common.back') : t('common.customize')}
                              </Link>
                           </Button>
                        )}

                        {user && <Appearance />}

                        <Notification />

                        <DropdownMenu>
                           <DropdownMenuTrigger className="hidden cursor-pointer outline-none md:block">
                              {user && user.photo ? (
                                 <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.photo} alt={user.name ?? ''} className="h-full w-full content-center object-cover" />
                                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                                 </Avatar>
                              ) : (
                                 <UserCircle className="text-muted-foreground h-9 w-9 rounded-full" />
                              )}
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end" className="hidden w-[160px] md:block">
                              {(user.role === 'admin' || user.role === 'instructor') && (
                                 <DropdownMenuItem className="cursor-pointer px-3" onClick={() => router.get(route('dashboard'))}>
                                    <LayoutDashboard className="mr-1 h-4 w-4" />
                                    <span>{t('common.dashboard')}</span>
                                 </DropdownMenuItem>
                              )}

                              {(user.role === 'student' || user.role === 'instructor') &&
                                 studentMenuItems(t).map(({ id, name, Icon, slug }) => (
                                    <DropdownMenuItem
                                       key={id}
                                       className="cursor-pointer px-3"
                                       onClick={() => router.get(route('student.index', { tab: slug }))}
                                    >
                                       <Icon className="mr-1 h-4 w-4" />
                                       <span>{name}</span>
                                    </DropdownMenuItem>
                                 ))}

                              <DropdownMenuItem className="cursor-pointer px-3" onClick={() => router.post(route('logout'))}>
                                 <LogOut className="mr-1 h-4 w-4" />
                                 <span>{t('common.logOut')}</span>
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                  ) : (
                     <div className="hidden items-center gap-3 md:flex">
                        <Button asChild variant="outline" className="h-auto rounded-sm px-5 py-2.5 shadow-none">
                           <Link href={route('register')}>{t('common.signUp')}</Link>
                        </Button>
                        <Button asChild className="h-auto rounded-sm px-5 py-2.5 shadow-none">
                           <Link href={route('login')}>{t('common.logIn')}</Link>
                        </Button>
                     </div>
                  )}

                  {/* Mobile Menu Button */}
                  <Button size="icon" variant="secondary" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                     {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
               </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
               <ScrollArea className="animate-fade-in h-[calc(100vh-72px)] border-t md:hidden">
                  <div className="flex flex-col space-y-4 py-4">
                     <SearchInput
                        className="[&>input]:h-10"
                        onChangeValue={(value) => router.get(route('category.courses', { category: 'all', search: value }))}
                     />

                     {navbar &&
                        navbar.properties.array.map((item) => (
                           <Link key={item.url} href={item.url} className="text-sm font-normal">
                              {navTitle(item)}
                           </Link>
                        ))}

                     {user ? (
                        user.role === 'admin' ? (
                           <>
                              <Link href={route('dashboard')} className="text-sm font-normal">
                                 {t('common.dashboard')}
                              </Link>
                              <Link href={props.customize ? '/' : '?customize=true'} className="block w-full text-sm font-normal sm:hidden">
                                 {props.customize ? t('common.back') : t('common.customize')}
                              </Link>
                              <Button variant="outline">
                                 <Link method="post" href={route('logout')} className="text-sm font-normal">
                                    {t('common.logOut')}
                                 </Link>
                              </Button>
                           </>
                        ) : (
                           <>
                              {user.role === 'instructor' && props.system.sub_type === 'collaborative' && (
                                 <Link href={route('dashboard')} className="text-sm font-normal">
                                    {t('common.dashboard')}
                                 </Link>
                              )}
                              <Link href={route('student.index', { tab: 'courses' })} className="text-sm font-normal">
                                 {t('nav.myCourses')}
                              </Link>
                              <Link href={route('student.index', { tab: 'wishlist' })} className="text-sm font-normal">
                                 {t('nav.wishlist')}
                              </Link>
                              <Link href={route('student.index', { tab: 'profile' })} className="text-sm font-normal">
                                 {t('nav.myProfile')}
                              </Link>
                              <Link href={route('student.index', { tab: 'settings' })} className="text-sm font-normal">
                                 {t('nav.settings')}
                              </Link>
                              <Button asChild variant="secondary">
                                 <Link method="post" href={route('logout')} className="text-sm font-normal">
                                    {t('common.logOut')}
                                 </Link>
                              </Button>
                           </>
                        )
                     ) : (
                        <>
                           <AppearanceToggleTab />
                           <LanguageSwitcher />

                           <div className="flex flex-col space-y-2 border-t pt-4">
                              <Button asChild variant="ghost" className="justify-start">
                                 <Link href={route('register')}>{t('common.signUp')}</Link>
                              </Button>
                              <Button asChild className="bg-primary hover:bg-primary/90 justify-start">
                                 <Link href={route('login')}>{t('common.logIn')}</Link>
                              </Button>
                           </div>
                        </>
                     )}
                  </div>
               </ScrollArea>
            )}
         </div>
      </header>
   );
};

const studentMenuItems = (t: ReturnType<typeof useI18n>['t']) => [
   {
      id: nanoid(),
      name: t('nav.myCourses'),
      slug: 'courses',
      Icon: GraduationCap,
   },
   {
      id: nanoid(),
      name: t('nav.wishlist'),
      slug: 'wishlist',
      Icon: Heart,
   },
   {
      id: nanoid(),
      name: t('nav.myProfile'),
      slug: 'profile',
      Icon: UserCircle,
   },
   {
      id: nanoid(),
      name: t('nav.settings'),
      slug: 'settings',
      Icon: SettingsIcon,
   },
];

const navbarTranslationKeys: Record<string, TranslationKey> = {
   courses: 'nav.courses',
   'about-us': 'nav.aboutUs',
   'our-team': 'nav.ourTeam',
   careers: 'nav.careers',
   blogs: 'nav.blogs',
   search: 'common.search',
   theme: 'nav.theme',
   notification: 'nav.notification',
   profile: 'nav.profile',
};

const navbarTitleKeys: Record<string, TranslationKey> = {
   Courses: 'nav.courses',
   'About Us': 'nav.aboutUs',
   'Our Team': 'nav.ourTeam',
   Careers: 'nav.careers',
   Blogs: 'nav.blogs',
   Search: 'common.search',
   Theme: 'nav.theme',
   Notification: 'nav.notification',
   Profile: 'nav.profile',
};

const translateNavbarItem = (item: { slug?: string; title: string }, t: ReturnType<typeof useI18n>['t']) => {
   const key = (item.slug && navbarTranslationKeys[item.slug]) || navbarTitleKeys[item.title];

   return key ? t(key) : item.title;
};

export default IntroNavbar;
