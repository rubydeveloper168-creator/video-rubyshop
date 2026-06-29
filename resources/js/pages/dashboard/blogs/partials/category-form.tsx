import IconPicker from '@/components/icon-picker';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Props {
   title: string;
   handler: React.ReactNode;
   category?: BlogCategory;
}

const CategoryForm = ({ title, handler, category }: Props) => {
   const { text } = useI18n();
   const [open, setOpen] = useState(false);
   const [openIcon, setOpenIcon] = useState(false);

   const { data, setData, post, put, processing, errors, reset } = useForm({
      name: category ? category.name : '',
      icon: category ? category.icon : '',
      status: category ? category.status : 'active',
      description: category ? category.description : '',
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (category) {
         put(route('blogs.categories.update', category.id), {
            onSuccess: () => {
               setOpen(false);
               reset();
            },
         });
      } else {
         post(route('blogs.categories.store'), {
            onSuccess: () => {
               setOpen(false);
               reset();
            },
         });
      }
   };

   useEffect(() => {
      if (!open) {
         reset();
      }
   }, [open]);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger>{handler}</DialogTrigger>

         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
               <div className="space-y-4 py-4">
                  <div className="space-y-2">
                     <Label htmlFor="name">{text('Title')}</Label>
                     <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={errors.name ? 'border-red-500' : ''}
                        placeholder={text('Enter category name')}
                     />
                     <InputError message={errors.name} />
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
                     <Label htmlFor="status">{text('Status')}</Label>
                     <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                        <SelectTrigger>
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="active">{text('Active')}</SelectItem>
                           <SelectItem value="inactive">{text('Inactive')}</SelectItem>
                        </SelectContent>
                     </Select>
                     <InputError message={errors.status} />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="description">{text('Subtitle (80 Character)')}</Label>
                     <Textarea
                        id="description"
                        value={data.description || ''}
                        onChange={(e) => setData('description', e.target.value)}
                        className={errors.description ? 'border-red-500' : ''}
                        placeholder={text('Enter category description')}
                        maxLength={80}
                        rows={3}
                     />
                     <InputError message={errors.description} />
                  </div>
               </div>

               <DialogFooter>
                  <DialogClose>
                     <Button type="button" variant="outline">
                        {text('Close')}
                     </Button>
                  </DialogClose>
                  <Button type="submit" disabled={processing}>
                     {category ? text('Update Category') : text('Add Category')}
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};

export default CategoryForm;
