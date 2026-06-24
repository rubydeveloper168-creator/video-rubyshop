import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import VerifiedBadge from '@/components/verified-badge';
import { useInitials } from '@/hooks/use-initials';

export function UserInfo({ user, showEmail = false }: { user: User; showEmail?: boolean }) {
   const getInitials = useInitials();

   return (
      <>
         <Avatar className="h-8 w-8 overflow-hidden rounded-full">
            <AvatarImage src={user.photo || ''} alt={user.name} className="object-cover" />
            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
               {getInitials(user.name)}
            </AvatarFallback>
         </Avatar>
         <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="flex items-center gap-1 truncate font-medium">
               {user.name}
               {user.is_verified && <VerifiedBadge size={14} />}
            </span>
            {showEmail && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
         </div>
      </>
   );
}
