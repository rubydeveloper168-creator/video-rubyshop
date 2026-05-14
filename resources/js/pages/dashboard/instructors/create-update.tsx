import Combobox from '@/components/combobox';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import TagInput from '@/components/tag-input';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/layouts/dashboard/layout';
import { onHandleChange } from '@/lib/inertia';
import { SharedData } from '@/types/global';
import { useForm } from '@inertiajs/react';
import { ReactNode } from 'react';

interface Props extends SharedData {
   users: User[];
   instructor?: Instructor;
}

const CreateUpdate = ({ instructor, users }: Props) => {
   // Parse the options and answers if they're strings
   const initialOptions = instructor?.skills ? (typeof instructor.skills === 'string' ? JSON.parse(instructor.skills) : instructor.skills) : [];

   const { data, setData, post, processing, errors, reset } = useForm({
      user_id: '',
      designation: instructor?.designation || '',
      skills: initialOptions,
      biography: instructor?.biography || '',
      resume: null,
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (instructor) {
         post(route('become-instructor.update', { id: instructor.id }));
      } else {
         post(route('become-instructor.store'), {
            onSuccess: () => {
               reset();
            },
         });
      }
   };

   const transformedUsers = users.map((user) => ({
      value: user.id.toString(),
      label: user.name,
   }));

   return (
      <Card className="p-4 sm:p-6">
         <form onSubmit={handleSubmit} className="relative space-y-4">
            <div>
               <Label>Course Instructor *</Label>
               <Combobox data={transformedUsers} placeholder="Select an user" onSelect={(selected) => setData('user_id', selected.value)} />
               <InputError message={errors.user_id} />
            </div>

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
      </Card>
   );
};

CreateUpdate.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default CreateUpdate;
