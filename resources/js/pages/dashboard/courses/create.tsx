import Combobox from '@/components/combobox';
import { DateTimePicker } from '@/components/datetime-picker';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import TiptapEditor from '@/components/text-editor/tiptap-editor';
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import courseLanguages from '@/data/course-languages';
import DashboardLayout from '@/layouts/dashboard/layout';
import { onHandleChange } from '@/lib/inertia';
import { SharedData } from '@/types/global';
import { router, useForm } from '@inertiajs/react';
import { ReactNode, useMemo } from 'react';

interface Props extends SharedData {
   labels: string[];
   prices: string[];
   expiries: string[];
   categories: CourseCategory[];
   instructors: Instructor[];
}

const Index = (props: Props) => {
   const user = props.auth.user;
   const { labels, prices, expiries, categories, instructors, system } = props;

   const { data, setData, post, errors, processing } = useForm({
      title: '',
      short_description: '',
      description: '',
      status: 'draft',
      level: 'beginner',
      language: 'th',
      pricing_type: 'paid',
      price: '100',
      discount: false as boolean,
      discount_price: '',
      expiry_type: 'lifetime',
      expiry_duration: new Date(),
      drip_content: false as boolean,
      thumbnail: null,
      instructor_id: user.role === 'admin' && system.sub_type === 'collaborative' ? '' : user.instructor_id,
      course_category_id: categories.length > 0 ? categories[0].id.toString() : '',
      course_category_child_id: '',
   });

   // Handle form submission
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      // Serialize form data — convert Date to ISO string for safe FormData transmission
      const payload = new FormData();
      Object.entries(data).forEach(([key, value]) => {
         if (value instanceof File) {
            payload.append(key, value, value.name);
         } else if (value instanceof Date) {
            payload.append(key, value.toISOString());
         } else if (value === null || value === undefined) {
            // skip nulls
         } else {
            payload.append(key, String(value));
         }
      });

      console.log('[DEBUG] Submitting payload keys:', [...payload.keys()]);
      console.log('[DEBUG] expiry_duration value:', payload.get('expiry_duration'));

      router.post(route('courses.store'), payload, {
         onBefore: () => console.log('[DEBUG] Before POST'),
         onSuccess: () => console.log('[DEBUG] POST succeeded ✅'),
         onError: (errors) => console.error('[DEBUG] Validation errors ❌', errors),
         onFinish: () => console.log('[DEBUG] POST finished'),
      });
   };

   const transformedCategories = useMemo(() => {
      return categories.flatMap((category) => {
         // Parent categories
         const categoryItem = {
            label: category.title,
            value: category.title,
            id: category.id,
            child_id: '',
         };

         // Child categories
         const childItems =
            category.category_children?.map((child) => ({
               label: `--${child.title}`,
               value: child.title,
               id: child.course_category_id,
               child_id: child.id,
            })) || [];

         return [categoryItem, ...childItems]; // Combine parent + children
      });
   }, [categories]);

   const transformedInstructors = instructors.map((instructor) => ({
      label: instructor.user.name,
      value: instructor.id as string,
   }));

   return (
      <Card className="container p-6">
         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               {/* Left Column */}
               <div className="space-y-4">
                  <div>
                     <Label>Title *</Label>
                     <Input name="title" value={data.title} onChange={(e) => onHandleChange(e, setData)} placeholder="Enter Course Title" />
                     <InputError message={errors.title} />
                  </div>

                  <div>
                     <Label>Short Description</Label>
                     <Textarea
                        rows={5}
                        name="short_description"
                        value={data.short_description}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder="Enter Short Description"
                     />
                     <InputError message={errors.short_description} />
                  </div>

                  <div>
                     <Label>Description</Label>
                     <TiptapEditor
                        ssr={true}
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

                  {/* <div>
                     <Label>Create as *</Label>
                     <RadioGroup defaultValue={data.status} onValueChange={(value) => setData('status', value)} className="space-y-2 py-3">
                           {statuses.map((status) => (
                              <div key={status} className="flex items-center space-x-2">
                                 <RadioGroupItem className="cursor-pointer" id={status} value={status} />
                                 <Label htmlFor={status} className="capitalize">
                                       {status}
                                 </Label>
                              </div>
                           ))}
                     </RadioGroup>
                     <InputError message={errors.status} />
                  </div> */}

                  <div>
                     <Label>Enable drip content *</Label>
                     <RadioGroup
                        defaultValue={data.drip_content ? 'on' : 'off'}
                        className="flex items-center space-x-4 pt-2 pb-1"
                        onValueChange={(value) => setData('drip_content', value == 'on' ? true : false)}
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
                     <InputError message={errors.drip_content} />
                  </div>
               </div>

               {/* Right Column */}
               <div className="space-y-4">
                  <div>
                     <Label>Category *</Label>
                     <Combobox
                        data={transformedCategories}
                        placeholder="Select a category"
                        defaultValue={transformedCategories.length > 0 ? transformedCategories[0].value : undefined}
                        onSelect={(selected) => {
                           setData('course_category_id', selected.id as string);
                           setData('course_category_child_id', selected.child_id as string);
                        }}
                     />
                     <InputError message={errors.course_category_id} />
                  </div>

                  <div>
                     <Label>Course level *</Label>
                     <Select value={data.level} onValueChange={(value) => setData('level', value)}>
                        <SelectTrigger>
                           <SelectValue placeholder="Select your course level" />
                        </SelectTrigger>
                        <SelectContent>
                           {labels.map((label) => (
                              <SelectItem key={label} value={label} className="capitalize">
                                 {label}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                     <InputError message={errors.level} />
                  </div>

                  {user.role === 'admin' && system.sub_type === 'collaborative' && (
                     <div>
                        <Label>Course Instructor *</Label>
                        <Combobox
                           data={transformedInstructors}
                           placeholder="Select the course instructor"
                           onSelect={(selected) => setData('instructor_id', selected.value)}
                        />
                        <InputError message={errors.instructor_id} />
                     </div>
                  )}

                  <div>
                     <Label>Made in *</Label>
                     <Combobox
                        data={courseLanguages}
                        placeholder="Select your course language"
                        defaultValue="th"
                        onSelect={(selected) => setData('language', selected.value)}
                     />
                     <InputError message={errors.language} />
                  </div>

                  <Accordion collapsible type="single" value={data.pricing_type}>
                     <div>
                        <Label>Pricing type *</Label>
                        <RadioGroup
                           defaultValue={data.pricing_type}
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
                              <Label>Price *</Label>
                              <Input
                                 type="number"
                                 name="price"
                                 value={data.price}
                                 onChange={(e) => onHandleChange(e, setData)}
                                 placeholder="Enter your course price ($0)"
                              />
                              <InputError message={errors.price} />
                           </div>

                           <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                 <Checkbox
                                    id="discount"
                                    name="discount"
                                    checked={data.discount}
                                    onCheckedChange={(checked: boolean) => {
                                       setData('discount', checked);
                                    }}
                                 />
                                 <Label htmlFor="discount">Check if this course has discount</Label>
                              </div>

                              {data.discount && (
                                 <div>
                                    <Input
                                       type="number"
                                       name="discount_price"
                                       value={data.discount_price}
                                       onChange={(e) => onHandleChange(e, setData)}
                                       placeholder="Enter your discount price ($0)"
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
                        <Label>Expiry period type</Label>
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
                              <Label>Expiry date</Label>
                              <DateTimePicker date={data.expiry_duration} setDate={(date) => setData('expiry_duration', date)} />
                              <InputError message={errors.expiry_duration} />
                           </div>
                        </AccordionContent>
                     </AccordionItem>
                  </Accordion>

                  <div>
                     <Label>Thumbnail <span className="text-muted-foreground text-xs">(JPG, PNG, WEBP — max 2MB)</span></Label>
                     <Input type="file" name="thumbnail" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => onHandleChange(e, setData)} />
                     <InputError message={errors.thumbnail} />
                  </div>
               </div>
            </div>

            <div className="col-span-2 mt-6 text-right">
               <LoadingButton loading={processing}>Create Course</LoadingButton>
            </div>
         </form>
      </Card>
   );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;
