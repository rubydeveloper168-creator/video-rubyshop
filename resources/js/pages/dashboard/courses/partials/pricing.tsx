import { DateTimePicker } from '@/components/datetime-picker';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import DashboardLayout from '@/layouts/dashboard/layout';
import { onHandleChange } from '@/lib/inertia';
import { useI18n } from '@/lib/i18n';
import { useForm, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { CourseUpdateProps } from '../update';

const Pricing = () => {
   const { props } = usePage<CourseUpdateProps>();
   const { tab, prices, expiries, course } = props;
   const { text } = useI18n();

   const { data, setData, post, errors, processing } = useForm({
      tab: tab,
      pricing_type: course.pricing_type || '',
      price: course.price || '',
      discount: Boolean(course.discount) || false,
      discount_price: course.discount_price || '',
      expiry_type: course.expiry_type || '',
      expiry_duration: course.expiry_duration ? new Date(course.expiry_duration) : new Date(),
   });

   // Handle form submission
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      post(route('courses.update', { id: course.id }));
   };

   return (
      <Card className="container p-4 sm:p-6">
         <form onSubmit={handleSubmit} className="space-y-4">
            <Accordion collapsible type="single" value={data.pricing_type as string}>
               <div>
                  <Label>{text('Pricing type')} *</Label>
                  <RadioGroup
                     defaultValue={data.pricing_type as string}
                     className="flex items-center space-x-4 pt-2 pb-1"
                     onValueChange={(value) => setData('pricing_type', value)}
                  >
                     {prices.map((price) => (
                        <div key={price} className="flex items-center space-x-2">
                           <RadioGroupItem className="cursor-pointer" id={price} value={price} />
                           <Label htmlFor={price} className="capitalize">
                              {price}
                           </Label>
                        </div>
                     ))}
                  </RadioGroup>
                  <InputError message={errors.pricing_type} />
               </div>

               <AccordionItem value={prices[1]} className="border-none">
                  <AccordionContent className="space-y-4 p-0.5">
                     <div className="pt-3">
                        <Label>{text('Price')} *</Label>
                        <Input
                           type="number"
                           name="price"
                           value={data.price}
                           onChange={(e) => onHandleChange(e, setData)}
                           placeholder={text('Enter your course price ($0)')}
                        />
                        <InputError message={errors.price} />
                     </div>

                     <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                           <Checkbox
                              id="discount"
                              name="discount"
                              checked={data.discount as any}
                              onCheckedChange={(checked: boolean) => {
                                 setData('discount', checked as any);
                              }}
                           />
                           <Label htmlFor="discount">{text('Check if this course has discount')}</Label>
                        </div>

                        {data.discount && (
                           <div>
                              <Input
                                 type="number"
                                 name="discount_price"
                                 value={data.discount_price}
                                 onChange={(e) => onHandleChange(e, setData)}
                                 placeholder={text('Enter your discount price ($0)')}
                              />
                              <InputError message={errors.discount_price} />
                           </div>
                        )}
                     </div>
                  </AccordionContent>
               </AccordionItem>
            </Accordion>

            <Accordion collapsible type="single" value={data.expiry_type}>
               <div>
                  <Label>{text('Expiry period type')}</Label>
                  <RadioGroup
                     defaultValue={data.expiry_type}
                     className="flex items-center space-x-4 pt-2 pb-1"
                     onValueChange={(value) => setData('expiry_type', value)}
                  >
                     {expiries.map((expiry) => (
                        <div key={expiry} className="flex items-center space-x-2">
                           <RadioGroupItem className="cursor-pointer" id={expiry} value={expiry} />
                           <Label htmlFor={expiry} className="capitalize">
                              {expiry}
                           </Label>
                        </div>
                     ))}
                  </RadioGroup>
                  <InputError message={errors.expiry_type} />
               </div>

               <AccordionItem value={expiries[1]} className="border-none">
                  <AccordionContent className="space-y-4 p-0.5">
                     <div className="pt-3">
                        <Label>{text('Expiry date')}</Label>
                        <DateTimePicker date={data.expiry_duration} setDate={(date) => setData('expiry_duration', date)} />
                        <InputError message={errors.expiry_duration} />
                     </div>
                  </AccordionContent>
               </AccordionItem>
            </Accordion>

            <div className="mt-8">
               <LoadingButton loading={processing}>{text('Save Changes')}</LoadingButton>
            </div>
         </form>
      </Card>
   );
};

Pricing.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Pricing;
