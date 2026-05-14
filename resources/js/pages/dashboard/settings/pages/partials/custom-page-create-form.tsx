import InputError from '@/components/input-error';
import TiptapEditor from '@/components/text-editor/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { onHandleChange } from '@/lib/inertia';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   actionComponent: React.ReactNode;
}

const CustomPageCreateForm = ({ title, actionComponent }: Props) => {
   const [open, setOpen] = useState(false);
   const { data, setData, post, reset, errors, processing } = useForm({
      name: '',
      slug: '',
      title: '',
      description: '',
      meta_description: '',
      meta_keywords: '',
      active: true as boolean,
   });

   // Handle form submission
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      post(route('settings.custom-page.store'), {
         onSuccess: () => {
            reset();
            setOpen(false);
         },
      });
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger>{actionComponent}</DialogTrigger>

         <DialogContent className="p-0">
            <ScrollArea className="max-h-[90vh] p-6">
               <DialogHeader className="mb-6">
                  <DialogTitle>{title}</DialogTitle>
               </DialogHeader>

               <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                     <Label>Name</Label>
                     <Input name="name" value={data.name} onChange={(e) => onHandleChange(e, setData)} placeholder="Enter Page Name" />
                     <InputError message={errors.name} />
                  </div>

                  <div>
                     <Label>Slug</Label>
                     <Input name="slug" value={data.slug} onChange={(e) => onHandleChange(e, setData)} placeholder="Enter Page Slug" />
                     <InputError message={errors.slug} />
                  </div>

                  <div>
                     <Label>Title</Label>
                     <Input name="title" value={data.title} onChange={(e) => onHandleChange(e, setData)} placeholder="Enter Page Title" />
                     <InputError message={errors.title} />
                  </div>

                  <div>
                     <Label>Page Contents</Label>
                     <TiptapEditor
                        ssr={false}
                        output="html"
                        placeholder={{
                           paragraph: 'Type your content here...',
                           imageCaption: 'Type caption for image (optional)',
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

                  <div>
                     <Label>Meta Description</Label>
                     <Textarea
                        rows={3}
                        name="meta_description"
                        value={data.meta_description}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder="Enter Meta Description"
                     />
                     <InputError message={errors.meta_description} />
                  </div>

                  <div>
                     <Label>Meta Keywords</Label>
                     <Input
                        name="meta_keywords"
                        value={data.meta_keywords}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder="Enter Meta Keywords"
                     />
                     <InputError message={errors.meta_keywords} />
                  </div>

                  <div>
                     <Label>Active</Label>
                     <RadioGroup
                        defaultValue={data.active ? 'on' : 'off'}
                        className="flex items-center space-x-4 pt-2 pb-1"
                        onValueChange={(value) => setData('active', value == 'on' ? true : false)}
                     >
                        <div className="flex items-center space-x-2">
                           <RadioGroupItem className="cursor-pointer" id="off" value="off" />
                           <Label htmlFor="off">Off</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                           <RadioGroupItem className="cursor-pointer" id="on" value="on" />
                           <Label htmlFor="on">On</Label>
                        </div>
                     </RadioGroup>
                     <InputError message={errors.active} />
                  </div>

                  <div>
                     <Button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Changes'}
                     </Button>
                  </div>
               </form>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
};

export default CustomPageCreateForm;
