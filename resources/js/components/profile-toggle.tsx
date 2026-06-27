import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useI18n } from '@/lib/i18n';
import { SharedData } from '@/types/global';
import { router, usePage } from '@inertiajs/react';
import { GraduationCap, Heart, LayoutDashboard, LogOut, SettingsIcon, UserCircle } from 'lucide-react';
import { nanoid } from 'nanoid';

const ProfileToggle = () => {
   const { props } = usePage<SharedData>();
   const { user } = props.auth;
   const { t } = useI18n();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="cursor-pointer outline-none">
            {user && user.photo ? (
               <Avatar className="h-9 w-9">
                  <AvatarImage src={user.photo} alt={user.name ?? ''} className="h-full w-full content-center object-cover" />
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
               </Avatar>
            ) : (
               <UserCircle className="text-muted-foreground h-9 w-9 rounded-full" />
            )}
         </DropdownMenuTrigger>

         <DropdownMenuContent align="end" className="w-[160px]">
            {(user.role === 'admin' || user.role === 'instructor') && (
               <DropdownMenuItem className="cursor-pointer px-3" onClick={() => router.get(route('dashboard'))}>
                  <LayoutDashboard className="mr-1 h-4 w-4" />
                  <span>{t('common.dashboard')}</span>
               </DropdownMenuItem>
            )}

            {(user.role === 'student' || user.role === 'instructor') &&
               studentMenuItems(t).map(({ id, name, Icon, slug }) => (
                  <DropdownMenuItem key={id} className="cursor-pointer px-3" onClick={() => router.get(route('student.index', { tab: slug }))}>
                     <Icon className="mr-1 h-4 w-4" />
                     <span>{name}</span>
                  </DropdownMenuItem>
               ))}

            <DropdownMenuItem className="cursor-pointer px-3" onClick={() => router.post('/logout')}>
               <LogOut className="mr-1 h-4 w-4" />
               <span>{t('common.logOut')}</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
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

export default ProfileToggle;
