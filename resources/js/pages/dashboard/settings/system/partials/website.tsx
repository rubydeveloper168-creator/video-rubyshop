import Combobox from '@/components/combobox';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import currencies from '@/data/currencies';
import { onHandleChange } from '@/lib/inertia';
import { useI18n } from '@/lib/i18n';
import { SharedData } from '@/types/global';
import { useForm, usePage } from '@inertiajs/react';
import { SystemProps } from '..';

interface MediaFields {
   new_logo_dark: null | File;
   new_logo_light: null | File;
   new_favicon: null | File;
   new_banner: null | File;
}

const Website = () => {
   const { props } = usePage<SharedData & SystemProps>();
   const { text } = useI18n();

   const mediaFields: MediaFields = {
      new_logo_dark: null,
      new_logo_light: null,
      new_favicon: null,
      new_banner: null,
   };

   const { data, setData, post, errors, processing } = useForm({
      ...(props.system.fields as SystemFields),
      ...(mediaFields as MediaFields),
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      post(route('settings.system.update', { id: props.system.id }));
   };

   return (
      <Card className="p-4 sm:p-6">
         <form onSubmit={handleSubmit} className="space-y-6">
            {/* Website Information */}
            <div className="border-b pb-6">
               <h2 className="mb-4 text-xl font-semibold">{text('Website Information')}</h2>

               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                     <Label>{text('Website Name')} *</Label>
                     <Input name="name" value={data.name || ''} onChange={(e) => onHandleChange(e, setData)} placeholder={text('Enter Website Name')} />
                     <InputError message={errors.name} />
                  </div>

                  <div>
                     <Label>{text('Website Title')} *</Label>
                     <Input name="title" value={data.title || ''} onChange={(e) => onHandleChange(e, setData)} placeholder={text('Enter Website Title')} />
                     <InputError message={errors.title} />
                  </div>

                  <div className="md:col-span-2">
                     <Label>{text('Keywords')}</Label>
                     <Input name="keywords" value={data.keywords || ''} onChange={(e) => onHandleChange(e, setData)} placeholder={text('Enter Keywords')} />
                     <InputError message={errors.keywords} />
                  </div>

                  <div className="md:col-span-2">
                     <Label>{text('Description')}</Label>
                     <Textarea
                        rows={4}
                        name="description"
                        value={data.description || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter Website Description')}
                     />
                     <InputError message={errors.description} />
                  </div>

                  <div>
                     <Label>{text('Author')}</Label>
                     <Input name="author" value={data.author || ''} onChange={(e) => onHandleChange(e, setData)} placeholder={text('Enter Author Name')} />
                     <InputError message={errors.author} />
                  </div>

                  <div>
                     <Label>{text('Slogan')}</Label>
                     <Input name="slogan" value={data.slogan || ''} onChange={(e) => onHandleChange(e, setData)} placeholder={text('Enter Website Slogan')} />
                     <InputError message={errors.slogan} />
                  </div>
               </div>
            </div>

            {/* Contact Information */}
            <div className="border-b pb-6">
               <h2 className="mb-4 text-xl font-semibold">{text('Contact Information')}</h2>

               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                     <Label>{text('System Email')} *</Label>
                     <Input
                        type="email"
                        name="email"
                        value={data.email || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter System Email')}
                     />
                     <InputError message={errors.email} />
                  </div>

                  <div>
                     <Label>{text('Phone')}</Label>
                     <Input name="phone" value={data.phone || ''} onChange={(e) => onHandleChange(e, setData)} placeholder={text('Enter Phone Number')} />
                     <InputError message={errors.phone} />
                  </div>
               </div>
            </div>

            {/* Media Settings */}
            <div className="border-b pb-6">
               <h2 className="mb-4 text-xl font-semibold">{text('Media')}</h2>

               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                     <Label>{text('Logo Dark')}</Label>
                     <Input
                        type="file"
                        name="new_logo_dark"
                        accept="image/*"
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Select Logo')}
                     />
                     <InputError message={errors.new_logo_dark} />
                  </div>

                  <div>
                     <Label>{text('Logo Light')}</Label>
                     <Input
                        type="file"
                        name="new_logo_light"
                        accept="image/*"
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Select Logo')}
                     />
                     <InputError message={errors.new_logo_light} />
                  </div>

                  <div>
                     <Label>{text('Favicon')}</Label>
                     <Input
                        type="file"
                        name="new_favicon"
                        accept="image/*"
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Select Favicon')}
                     />
                     <InputError message={errors.new_favicon} />
                  </div>

                  <div>
                     <Label>{text('Banner')}</Label>
                     <Input type="file" name="new_banner" accept="image/*" onChange={(e) => onHandleChange(e, setData)} placeholder={text('Select Banner')} />
                     <InputError message={errors.new_banner} />
                  </div>
               </div>
            </div>

            {/* Other Settings */}
            {props.system.sub_type === 'collaborative' && (
               <div>
                  <h2 className="mb-4 text-xl font-semibold">{text('Additional Settings')}</h2>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                     <div>
                        <Label>{`${text('Course Selling Currency')} (${data.selling_currency})`}</Label>
                        <Combobox
                           data={currencies}
                           defaultValue={data.selling_currency || ''}
                           placeholder={text('Select a selling currency')}
                           onSelect={(selected) => setData('selling_currency', selected.value)}
                        />
                        <InputError message={errors.selling_currency} />
                     </div>

                     <div>
                        <Label>{text('Course Selling Tax (%)')}</Label>
                        <Input
                           name="selling_tax"
                           value={data.selling_tax || ''}
                           onChange={(e) => onHandleChange(e, setData)}
                           placeholder={text('Enter Course Selling Tax Percentage')}
                        />
                        <InputError message={errors.selling_tax} />
                     </div>

                     <div>
                        <Label>{text('Instructor Revenue (%)')}</Label>
                        <Input
                           name="instructor_revenue"
                           value={data.instructor_revenue || ''}
                           onChange={(e) => onHandleChange(e, setData)}
                           placeholder={text('Enter Instructor Revenue Percentage')}
                        />
                        <InputError message={errors.instructor_revenue} />
                     </div>
                  </div>
               </div>
            )}

            <div className="flex justify-end">
               <LoadingButton loading={processing}>{text('Save Changes')}</LoadingButton>
            </div>
         </form>
      </Card>
   );
};

export default Website;
