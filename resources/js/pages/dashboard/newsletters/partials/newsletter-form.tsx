import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import TiptapEditor from '@/components/text-editor/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { onHandleChange } from '@/lib/inertia';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   handler: React.ReactNode;
   newsletter?: Newsletter;
}

const NewsletterForm = ({ title, newsletter, handler }: Props) => {
   const { text } = useI18n();
   const [open, setOpen] = useState(false);

   const { data, setData, post, put, errors, processing } = useForm({
      subject: newsletter ? newsletter.subject : '',
      description: newsletter ? newsletter.description : '',
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (newsletter) {
         put(route('newsletters.update', { id: newsletter.id }), {
            onSuccess: () => setOpen(false),
         });
      } else {
         post(route('newsletters.store'), {
            onSuccess: () => setOpen(false),
         });
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger>{handler}</DialogTrigger>

         <DialogContent className="p-0">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-6">
                  <DialogTitle>{title}</DialogTitle>
               </DialogHeader>

               <form onSubmit={handleSubmit} className="space-y-4 p-0.5">
                  <div>
                     <Label>{text('Subject')}</Label>
                     <Input
                        required
                        type="text"
                        name="subject"
                        value={data.subject}
                        placeholder={text('Enter your subject')}
                        onChange={(e) => onHandleChange(e, setData)}
                     />
                     <InputError message={errors.subject} />
                  </div>

                  <div>
                     <Label>{text('Description')}</Label>
                     <TiptapEditor
                        ssr={true}
                        output="html"
                        placeholder={{
                           paragraph: text('Type your content here...'),
                           imageCaption: text('Type caption for image (optional)'),
                        }}
                        contentMinHeight={256}
                        contentMaxHeight={640}
                        initialContent={data.description}
                        onContentChange={(value) =>
                           setData((prev) => ({
                              ...prev,
                              description: value as string,
                           }))
                        }
                     />
                     <InputError message={errors.description} />
                  </div>

                  <DialogFooter className="flex justify-end space-x-2 pt-4">
                     <DialogClose asChild>
                        <Button type="button" variant="outline">
                           {text('Close')}
                        </Button>
                     </DialogClose>

                     <LoadingButton loading={processing}>{text('Submit')}</LoadingButton>
                  </DialogFooter>
               </form>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
};

export default NewsletterForm;
