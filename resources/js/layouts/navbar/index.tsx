import AppLogo from '@/components/app-logo';
import Appearance from '@/components/appearance';
import LanguageSwitcher from '@/components/language-switcher';
import Notification from '@/components/notification';
import ProfileToggle from '@/components/profile-toggle';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/use-auth';
import useScreen from '@/hooks/use-screen';
import { TranslationKey, useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types/global';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';

interface NavbarProps {
   heightCover?: boolean;
   customizable?: boolean;
}

const Navbar = ({ heightCover = true, customizable = true }: NavbarProps) => {
   const { props } = usePage<SharedData>();
   const { ziggy, navbar } = props;
   const { isAdmin, isLoggedIn } = useAuth();
   const [isSticky, setIsSticky] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const { screen } = useScreen();
   const { t } = useI18n();

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

   const renderNavItems = (item: NavbarItem) => {
      switch (item.type) {
         case 'url':
            return (
               <Link
                  key={item.id}
                  href={item.value || ''}
                  className={cn(
                     'hover:bg-primary/10 hover:text-primary focus-visible:ring-ring inline-flex min-h-9 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
                     isNavItemActive(item) && 'bg-primary/10 text-primary',
                  )}
               >
                  {translateNavbarItem(item, t)}
               </Link>
            );

         case 'dropdown':
            return (
               <DropdownMenu key={item.id}>
                  <DropdownMenuTrigger
                     className={cn(
                        'hover:bg-primary/10 hover:text-primary focus-visible:ring-ring inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
                        isNavItemActive(item) && 'bg-primary/10 text-primary',
                     )}
                  >
                     {translateNavbarItem(item, t)}
                     <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-20">
                     {item.items &&
                        Array.isArray(item.items) &&
                        item.items.map((subItem: any, idx: number) => (
                           <DropdownMenuItem key={idx} asChild className="cursor-pointer px-5">
                              <Link href={subItem.url || subItem.value || ''}>{translateNavbarItem(subItem, t)}</Link>
                           </DropdownMenuItem>
                        ))}
                  </DropdownMenuContent>
               </DropdownMenu>
            );

         default:
            return null;
      }
   };

   const sortedItems = navbar.navbar_items.sort((a, b) => a.sort - b.sort);
   const customizeLink = props.customize ? ziggy.location : '?customize=true';

   return (
      <>
         <div className={cn('fixed top-0 z-30 w-full', isMenuOpen && 'bg-background')}>
            <div
               className={cn(
                  'container mt-0 flex h-[72px] items-center justify-between gap-1 !px-4 transition-all duration-200 md:gap-6',
                  isSticky && 'bg-background shadow-card mx-auto mt-4 h-16 w-full rounded-2xl md:!max-w-6xl',
                  screen < 768 && 'mt-0 h-[72px] rounded-none',
               )}
            >
               {/* Logo */}
               <div className="flex items-center gap-10">
                  <Link href="/">
                     <AppLogo />
                  </Link>

                  {/* Desktop Navigation */}
                  <div className="hidden gap-4 md:flex md:items-center">
                     {sortedItems.map((item) => (
                        <Fragment key={item.id}>{renderNavItems(item)}</Fragment>
                     ))}
                  </div>
               </div>

               <div className="flex items-center gap-2">
                  {customizable && isAdmin && (
                     <Button asChild variant="outline" className="hidden text-sm font-normal sm:block">
                        <Link href={customizeLink}>{props.customize ? t('common.back') : t('common.customize')}</Link>
                     </Button>
                  )}

                  <LanguageSwitcher compact={screen < 640} />

                  {sortedItems.map((item) => {
                     if (item.slug === 'theme') {
                        return <Appearance />;
                     } else {
                        return null;
                     }
                  })}

                  {isLoggedIn ? (
                     sortedItems.map((item) => {
                        if (item.slug === 'notification') {
                           return <Notification />;
                        } else if (item.slug === 'profile') {
                           return <ProfileToggle />;
                        } else {
                           return null;
                        }
                     })
                  ) : (
                     <div className="hidden space-x-2 sm:block">
                        <Button asChild variant="outline" className="">
                           <Link href={route('register')}>{t('common.signUp')}</Link>
                        </Button>
                        <Button asChild className="">
                           <Link href={route('login')}>{t('common.logIn')}</Link>
                        </Button>
                     </div>
                  )}

                  {/* Mobile menu button */}
                  <Button size="icon" variant="secondary" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                     {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
               </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
               <ScrollArea className="bg-background h-[calc(100vh-72px)] border-t md:hidden">
                  <div className="flex flex-col space-y-4 px-6 py-4">
                     {sortedItems.map((item) => (
                        <Fragment key={item.id}>{renderNavItems(item)}</Fragment>
                     ))}

                     {customizable && isAdmin && (
                        <Button asChild variant="outline" className="text-sm font-normal">
                           <Link href={customizeLink}>{props.customize ? t('common.back') : t('common.customize')}</Link>
                        </Button>
                     )}

                     {!isLoggedIn && (
                        <div className="block space-y-2 sm:hidden">
                           <Button asChild variant="outline" className="w-full rounded-sm shadow-none sm:px-5 md:h-10">
                              <Link href={route('register')}>{t('common.signUp')}</Link>
                           </Button>
                           <Button asChild className="w-full rounded-sm shadow-none sm:px-5 md:h-10">
                              <Link href={route('login')}>{t('common.logIn')}</Link>
                           </Button>
                        </div>
                     )}
                  </div>
               </ScrollArea>
            )}
         </div>

         {heightCover && <div className="relative z-20 h-[72px] bg-transparent" />}
      </>
   );
};

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

const translateNavbarItem = (item: Pick<NavbarItem, 'slug' | 'title'>, t: ReturnType<typeof useI18n>['t']) => {
   const key = (item.slug && navbarTranslationKeys[item.slug]) || navbarTitleKeys[item.title];

   return key ? t(key) : item.title;
};

const isNavItemActive = (item: Pick<NavbarItem, 'value'>) => {
   if (typeof window === 'undefined' || !item.value) return false;

   const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
   const itemPath = item.value.replace(/\/$/, '') || '/';

   return currentPath === itemPath || (itemPath !== '/' && currentPath.startsWith(`${itemPath}/`));
};

export default Navbar;
