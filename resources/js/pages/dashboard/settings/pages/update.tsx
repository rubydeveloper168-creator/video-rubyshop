import InputError from '@/components/input-error';
import TiptapEditor from '@/components/text-editor/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/layouts/dashboard/layout';
import { onHandleChange } from '@/lib/inertia';
import { SharedData } from '@/types/global';
import { Head, useForm } from '@inertiajs/react';

interface Props extends SharedData {
   page: Page;
}

const Update = ({ page }: Props) => {
   const { data, setData, put, errors, processing } = useForm({
      name: page.name,
      slug: page.slug,
      title: page.title,
      description: page.description,
      meta_description: page.meta_description,
      meta_keywords: page.meta_keywords,
      translations: page.translations || { th: {} },
      active: page.active,
   });

   // Handle form submission
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      put(route('settings.custom-page.update', page.id));
   };

   const handleThaiTranslationChange = (key: string, value: string) => {
      setData((currentData) => ({
         ...currentData,
         translations: {
            ...(currentData.translations || {}),
            th: {
               ...(currentData.translations?.th || {}),
               [key]: value,
            },
         },
      }));
   };

   return (
      <>
         <Head title="Edit Custom Page" />

         <div className="container mx-auto space-y-10 px-4 py-6">
            <div className="mb-6 flex items-center justify-between">
               <h1 className="text-2xl font-bold text-gray-800">Edit Custom Page</h1>
            </div>

            <Card className="p-4 sm:p-6">
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                     <Label>Name</Label>
                     <Input name="name" value={data.name} onChange={(e) => onHandleChange(e, setData)} placeholder="Enter Page Name" />
                     <InputError message={errors.name} />
                  </div>

                  <div>
                     <Label>Title</Label>
                     <Input name="title" value={data.title} onChange={(e) => onHandleChange(e, setData)} placeholder="Enter Page Title" />
                     <InputError message={errors.title} />
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

                  <div className="rounded-lg border p-4">
                     <h2 className="mb-4 text-lg font-semibold">Thai Translations</h2>

                     <div className="mb-4">
                        <Label>Thai Name</Label>
                        <Input
                           value={data.translations?.th?.name || ''}
                           onChange={(e) => handleThaiTranslationChange('name', e.target.value)}
                           placeholder="Enter Thai Page Name"
                        />
                     </div>

                     <div className="mb-4">
                        <Label>Thai Title</Label>
                        <Input
                           value={data.translations?.th?.title || ''}
                           onChange={(e) => handleThaiTranslationChange('title', e.target.value)}
                           placeholder="Enter Thai Page Title"
                        />
                     </div>

                     <div className="mb-4">
                        <Label>Thai Description</Label>
                        <TiptapEditor
                           ssr={true}
                           output="html"
                           placeholder={{
                              paragraph: 'Type Thai content here...',
                              imageCaption: 'Type caption for image (optional)',
                           }}
                           contentMinHeight={256}
                           contentMaxHeight={640}
                           initialContent={data.translations?.th?.description || ''}
                           onContentChange={(value) => handleThaiTranslationChange('description', value as string)}
                        />
                     </div>

                     <div className="mb-4">
                        <Label>Thai Meta Description</Label>
                        <Textarea
                           rows={3}
                           value={data.translations?.th?.meta_description || ''}
                           onChange={(e) => handleThaiTranslationChange('meta_description', e.target.value)}
                           placeholder="Enter Thai Meta Description"
                        />
                     </div>

                     <div>
                        <Label>Thai Meta Keywords</Label>
                        <Input
                           value={data.translations?.th?.meta_keywords || ''}
                           onChange={(e) => handleThaiTranslationChange('meta_keywords', e.target.value)}
                           placeholder="Enter Thai Meta Keywords"
                        />
                     </div>
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
            </Card>
         </div>
      </>
   );
};

Update.layout = (page: React.ReactNode) => <DashboardLayout children={page} />;

export default Update;
