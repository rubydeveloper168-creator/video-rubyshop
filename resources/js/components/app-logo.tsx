import { cn } from '@/lib/utils';
import { SharedData } from '@/types/global';
import { usePage } from '@inertiajs/react';

const defaultBrandLogo = '/assets/logos/rubyshop-no-bg-removebg-preview.png';

const AppLogo = ({ className, theme }: { theme?: 'light' | 'dark'; className?: string }) => {
   const { system } = usePage<SharedData>().props;

   if (theme && theme === 'dark') {
      return <img src={system.fields.logo_dark || defaultBrandLogo} alt={system.fields.name || ''} className={cn('block max-w-[104px]', className)} />;
   }

   if (theme && theme === 'light') {
      return <img src={system.fields.logo_light || defaultBrandLogo} alt={system.fields.name || ''} className={cn('block max-w-[104px]', className)} />;
   }

   return (
      <>
         <img src={system.fields.logo_dark || defaultBrandLogo} alt={system.fields.name || ''} className={cn('block h-6 w-auto dark:hidden', className)} />
         <img src={system.fields.logo_light || defaultBrandLogo} alt={system.fields.name || ''} className={cn('hidden h-6 w-auto dark:block', className)} />
      </>
   );
};

export default AppLogo;
