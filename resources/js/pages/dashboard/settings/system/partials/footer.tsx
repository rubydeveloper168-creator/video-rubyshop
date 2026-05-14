import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import FooterEditor from '@/layouts/footer/footer-editor';
import FooterPreview from '@/layouts/footer/footer-preview';
import { usePage } from '@inertiajs/react';
import { Edit, Eye, X } from 'lucide-react';
import { useState } from 'react';
import { SystemProps } from '../index';

const Footer = () => {
   const { props } = usePage<SystemProps>();
   const { footer } = props;
   const [showEditor, setShowEditor] = useState(false);

   if (!footer) {
      return (
         <Card>
            <CardContent className="flex items-center justify-center py-8">
               <p className="text-muted-foreground">Footer configuration not found.</p>
            </CardContent>
         </Card>
      );
   }

   return (
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <div>
                  <CardTitle className="flex items-center gap-2">
                     <Eye className="h-5 w-5" />
                     Live Footer Preview
                  </CardTitle>
                  <CardDescription className="hidden sm:block">
                     Interactive preview of {footer.title} ({footer.slug})
                  </CardDescription>
               </div>

               {showEditor ? (
                  <Button onClick={() => setShowEditor(false)} variant="outline">
                     <X className="mr-2 h-4 w-4" />
                     Close
                  </Button>
               ) : (
                  <Button onClick={() => setShowEditor(true)} className="flex items-center gap-2">
                     <Edit className="h-4 w-4" />
                     Edit Footer
                  </Button>
               )}
            </div>
         </CardHeader>

         <Separator />

         {showEditor ? (
            <FooterEditor footer={footer} />
         ) : (
            <CardContent className="p-5">
               <FooterPreview />
            </CardContent>
         )}
      </Card>
   );
};

export default Footer;
