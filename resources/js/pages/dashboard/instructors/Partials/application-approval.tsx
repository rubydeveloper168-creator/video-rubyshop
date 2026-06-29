import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import TiptapEditor from '@/components/text-editor/tiptap-editor';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

interface Props {
   instructor: Instructor;
   actionComponent: ReactNode;
}

const ApplicationApproval = ({ instructor, actionComponent }: Props) => {
   const { text } = useI18n();
   const [open, setOpen] = useState(false);
   const statuses = ['pending', 'approved', 'rejected'].filter((status) => status !== instructor.status);

   const { data, put, setData, processing, errors, reset } = useForm({
      status: '',
      feedback: '',
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      put(route('instructors.status', { id: instructor.id }), {
         onSuccess: () => {
            reset();
            setOpen(false);
         },
      });
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{actionComponent}</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{text('Are you absolutely sure?')}</DialogTitle>

               {/* add a form where admin can select status then write a feedback and submit */}
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                     <Label>{text('Approval Status')} *</Label>
                     <Select required value={data.status} onValueChange={(value) => setData('status', value as any)}>
                        <SelectTrigger>
                           <SelectValue placeholder={text('Select the approval status')} />
                        </SelectTrigger>
                        <SelectContent>
                           {statuses.map((status) => (
                              <SelectItem key={status} value={status} className="capitalize">
                                 {text(status)}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                     <InputError message={errors.status} />
                  </div>

                  <div className="pb-6">
                     <Label>{text('Feedback')}</Label>
                     <TiptapEditor
                        ssr={true}
                        output="html"
                        placeholder={{
                           paragraph: text('Type your content here...'),
                           imageCaption: text('Type caption for image (optional)'),
                        }}
                        contentMinHeight={256}
                        contentMaxHeight={640}
                        initialContent={data.feedback}
                        onContentChange={(value) =>
                           setData((prev) => ({
                              ...prev,
                              feedback: value as string,
                           }))
                        }
                     />
                     <InputError message={errors.feedback} />
                  </div>

                  <LoadingButton loading={processing} className="w-full">
                     {text('Submit')}
                  </LoadingButton>
               </form>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   );
};

export default ApplicationApproval;
