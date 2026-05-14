import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import TagInput from '@/components/tag-input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { onHandleChange } from '@/lib/inertia';
import { SharedData } from '@/types/global';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const BecomeInstructor = ({ instructor }: { instructor: Instructor }) => {
   const { props } = usePage<SharedData>();
   const [isEditing, setIsEditing] = useState(instructor ? false : true);

   // Parse the options and answers if they're strings
   const initialOptions = instructor?.skills ? (typeof instructor.skills === 'string' ? JSON.parse(instructor.skills) : instructor.skills) : [];

   const { data, setData, post, processing, errors } = useForm({
      user_id: props.auth.user.id,
      skills: initialOptions,
      designation: instructor?.designation || '',
      biography: instructor?.biography || '',
      resume: null,
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (instructor) {
         post(route('become-instructor.update', instructor.id));
      } else {
         post(route('become-instructor.store'));
      }
   };

   return (
      <Card className="p-4 sm:p-6">
         {!isEditing ? (
            <div className="space-y-6 text-center">
               {instructor.status === 'rejected' ? (
                  <>
                     <p className="text-red-600">
                        Unfortunately, your application has been rejected. Please review the requirements and submit again with updated information.
                     </p>

                     <Button type="button" onClick={() => setIsEditing(true)} variant="destructive" className="text-primary-foreground capitalize">
                        Application is {instructor.status} - Reapply
                     </Button>
                  </>
               ) : (
                  <>
                     <p>Your application is currently under review by our team. We will get back to you as soon as possible.</p>

                     <Button type="button" className="capitalize">
                        Application is {instructor.status}
                     </Button>
                  </>
               )}
            </div>
         ) : (
            <form onSubmit={handleSubmit} className="relative space-y-4">
               <div>
                  <Label>Designation</Label>
                  <Input type="text" name="designation" onChange={(e) => onHandleChange(e, setData)} placeholder="Enter your designation" />
                  <InputError message={errors.designation} />
               </div>

               <div>
                  <Label>Resume</Label>
                  <Input readOnly type="file" name="resume" onChange={(e) => onHandleChange(e, setData)} />
                  <InputError message={errors.resume} />
               </div>

               <div>
                  <Label>Skills</Label>
                  <TagInput defaultTags={data.skills} placeholder="Enter the skills as a tag" onChange={(values: any) => setData('skills', values)} />
                  <InputError message={errors.skills} />
               </div>

               <div className="pb-3">
                  <Label>Biography</Label>
                  <Textarea
                     rows={5}
                     required
                     name="biography"
                     value={data.biography}
                     onChange={(e) => onHandleChange(e, setData)}
                     placeholder="Write about yourself"
                  />
                  <InputError message={errors.biography} />
               </div>

               <LoadingButton loading={processing} className="mt-2">
                  {instructor ? 'Update Application' : 'Submit Application'}
               </LoadingButton>
            </form>
         )}
      </Card>
   );
};

export default BecomeInstructor;
