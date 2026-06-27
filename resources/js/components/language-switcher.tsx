import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AppLocale, useI18n } from '@/lib/i18n';
import { Languages } from 'lucide-react';

const locales: { value: AppLocale; labelKey: 'common.english' | 'common.thai'; shortLabel: string }[] = [
   { value: 'en', labelKey: 'common.english', shortLabel: 'EN' },
   { value: 'th', labelKey: 'common.thai', shortLabel: 'TH' },
];

const LanguageSwitcher = ({ compact = false, showLabel = false }: { compact?: boolean; showLabel?: boolean }) => {
   const { locale, setLocale, t } = useI18n();
   const currentLocale = locales.find((item) => item.value === locale) || locales[0];

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" size={compact ? 'icon' : 'sm'} className={compact ? 'h-9 w-9' : 'h-9 gap-2 px-3'}>
               <Languages className="h-4 w-4" />
               {!compact && <span>{showLabel ? `${t('common.language')}: ${currentLocale.shortLabel}` : currentLocale.shortLabel}</span>}
               <span className="sr-only">{t('common.language')}</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="min-w-[120px]">
            {locales.map((item) => (
               <DropdownMenuItem key={item.value} className="cursor-pointer" onClick={() => setLocale(item.value)}>
                  <span className={item.value === locale ? 'font-semibold' : ''}>{t(item.labelKey)}</span>
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default LanguageSwitcher;
