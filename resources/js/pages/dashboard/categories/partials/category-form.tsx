import IconPicker from '@/components/icon-picker';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { onHandleChange } from '@/lib/inertia';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
   title: string;
   handler: React.ReactNode;
   category?: CourseCategory;
   lastPosition: number;
}

const CategoryForm = ({ title, category, lastPosition, handler }: Props) => {
   const { text } = useI18n();
   const [open, setOpen] = useState(false);
   const [openIcon, setOpenIcon] = useState(false);

   const { data, setData, post, errors, processing, reset } = useForm({
      title: category ? category.title : '',
      icon: category ? category.icon : '',
      sort: category ? category.sort : lastPosition + 1,
      status: category ? category.status : 1,
      description: category ? category.description : '',
      thumbnail: null,
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (category) {
         post(route('categories.update', category.id), {
            onSuccess: () => setOpen(false),
         });
      } else {
         post(route('categories.store'), {
            onSuccess: () => {
               reset();
               setOpen(false);
            },
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
                  <DialogDescription>{text('Manage category information and settings')}</DialogDescription>
               </DialogHeader>

               <form onSubmit={handleSubmit} className="space-y-4 p-0.5">
                  <div>
                     <Label>{text('Category Name')}</Label>
                     <Input
                        required
                        type="text"
                        name="title"
                        value={data.title}
                        placeholder={text('Enter your category name')}
                        onChange={(e) => onHandleChange(e, setData)}
                     />
                     <InputError message={errors.title} />
                  </div>
                  <div>
                     <Label>{text('Category Icon')}</Label>
                     <Input
                        required
                        readOnly
                        type="text"
                        name="icon"
                        value={data.icon}
                        placeholder={text('Pick your category icon')}
                        onClick={() => setOpenIcon(true)}
                     />
                     <InputError message={errors.icon} />

                     <Dialog open={openIcon} onOpenChange={setOpenIcon}>
                        <DialogContent className="p-0">
                           <ScrollArea className="max-h-[90vh] p-6">
                              <DialogHeader className="mb-6">
                                 <DialogTitle>{text('Icon Picker')}</DialogTitle>
                                 <DialogDescription>{text('Choose an icon for the category')}</DialogDescription>
                              </DialogHeader>

                              <IconPicker
                                 onSelect={(icon) => {
                                    setData('icon', icon);
                                    setOpenIcon(false);
                                 }}
                              />
                           </ScrollArea>
                        </DialogContent>
                     </Dialog>
                  </div>
                  <div>
                     <Label>{text('Category Status')}</Label>
                     <Select value={JSON.stringify(data.status)} onValueChange={(e) => setData('status', JSON.parse(e))}>
                        <SelectTrigger>
                           <SelectValue placeholder={text('Select the status')} />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="1">{text('Active')}</SelectItem>
                           <SelectItem value="0">{text('Deactive')}</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div>
                     <Label>{text('Category Description (optional)')}</Label>
                     <Textarea
                        name="description"
                        value={data.description}
                        placeholder={text('Enter your description')}
                        onChange={(e) => onHandleChange(e, setData)}
                     />
                     <InputError message={errors.description} />
                  </div>
                  <div>
                     <Label>{text('Thumbnail (optional)')}</Label>
                     <Input type="file" name="thumbnail" onChange={(e) => onHandleChange(e, setData)} />
                     <InputError message={errors.thumbnail} />
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

export default CategoryForm;
