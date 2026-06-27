import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { SystemProps } from '@/pages/dashboard/settings/system';
import { Link, usePage } from '@inertiajs/react';
import { DynamicIcon } from 'lucide-react/dynamic';

const Index = () => {
   const { props } = usePage<SystemProps>();
   const { footer } = props;
   const { locale, field } = useI18n();

   const sortedItems = footer.footer_items.sort((a, b) => a.sort - b.sort);
   const listItems = sortedItems.filter((item) => item.type === 'list' && item.active);
   const copyrightItem = sortedItems.find((item) => item.type === 'copyright' && item.active);
   const socialMediaItem = sortedItems.find((item) => item.type === 'social_media' && item.active);
   const paymentMethodsItem = sortedItems.find((item) => item.type === 'payment_methods' && item.active);
   const getTranslatedItems = (item: FooterItem) => {
      if (locale === 'en') return item.items || [];

      return (item.items || []).map((footerItem: any, index: number) => ({
         ...footerItem,
         ...(item.translations?.[locale]?.items?.[index] || {}),
      }));
   };

   const footerDescription =
      locale === 'th'
         ? 'RUBYSHOP จำหน่ายเครื่องมือช่างและอุปกรณ์ก่อสร้างคุณภาพสำหรับงานมืออาชีพ พร้อมคำแนะนำสินค้า อะไหล่ บริการหลังการขาย และจัดส่งทั่วไทย'
         : 'RUBYSHOP supplies quality professional tools and construction equipment with product guidance, spare parts, after-sales support, and nationwide delivery.';

   return (
      <div className="overflow-hidden bg-[rgba(255,222,99,0.06)]">
         <div className="container space-y-9 pt-[60px] pb-5">
            <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
               <div className="w-full space-y-5 md:max-w-[300px]">
                  <div>
                     <Link href="/">
                        <AppLogo className="h-7" />
                     </Link>
                  </div>

                  <p className="text-muted-foreground text-sm">{footerDescription}</p>

                  {socialMediaItem && (
                     <div className="flex flex-wrap gap-3">
                        {socialMediaItem.items &&
                           Array.isArray(socialMediaItem.items) &&
                           socialMediaItem.items.map((socialItem: any, idx: number) => (
                              <Button
                                 key={idx}
                                 size="icon"
                                 variant="ghost"
                                 className="bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground rounded-full transition-colors"
                                 asChild
                              >
                                 <a href={socialItem.url} target="_blank" rel="noopener noreferrer">
                                    <DynamicIcon name={socialItem.icon} className="h-5 w-5" />
                                    <span className="sr-only">{socialItem.title}</span>
                                 </a>
                              </Button>
                           ))}
                     </div>
                  )}
               </div>

               <div className="flex w-full flex-col justify-between gap-10 md:max-w-[640px] md:flex-row">
                  {listItems.map((section) => (
                     <div className="relative w-full">
                        <p className="mb-3 text-lg font-semibold">{field(section, 'title')}</p>
                        <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
                           {getTranslatedItems(section).map((item, itemIndex) =>
                              section.slug === 'address' ? (
                                 <li key={`item-${itemIndex}`}>{item.title}</li>
                              ) : (
                                 <li key={`item-${itemIndex}`}>
                                    <Link href={item.url}>{item.title}</Link>
                                 </li>
                              ),
                           )}
                        </ul>
                     </div>
                  ))}
               </div>
            </div>

            {paymentMethodsItem && (
               <div className="space-y-3">
                  <h3 className="text-base font-medium">{field(paymentMethodsItem, 'title')}</h3>
                  <div className="flex flex-wrap gap-3">
                     {paymentMethodsItem.items &&
                        Array.isArray(paymentMethodsItem.items) &&
                        paymentMethodsItem.items.map((paymentItem: any, idx: number) => (
                           <div key={idx} className="flex h-7 items-center justify-center gap-5 md:justify-start">
                              {paymentItem.image && (
                                 <img src={paymentItem.image} alt={`Payment method ${idx + 1}`} className="h-full w-auto object-contain" />
                              )}
                           </div>
                        ))}
                  </div>
               </div>
            )}
         </div>

         {/* Copyright Section */}
         {copyrightItem && (
            <div className="px-6 py-8 text-center">
               <p className="text-muted-foreground text-sm">{field(copyrightItem, 'title')}</p>
            </div>
         )}
      </div>
   );
};

export default Index;
