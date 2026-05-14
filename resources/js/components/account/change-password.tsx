import InputError from '@/components/input-error';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import LoadingButton from '../loading-button';

const ChangePassword = () => {
   const { props } = usePage();
   const { errors } = props;

   const { data, setData, put, processing } = useForm({
      current_password: '',
      password: '',
      password_confirmation: '',
   });

   const onHandleChange = (event: any) => {
      setData(event.target.name, event.target.value);
   };

   const submit: FormEventHandler = (e) => {
      e.preventDefault();

      put(route('account.change-password'));
   };

   return (
      <Card className="border-none">
         <div className="border-b-border border-b px-7 pt-7 pb-4">
            <p className="text18 font-bold">Change Password</p>
         </div>

         <form onSubmit={submit} className="flex flex-col gap-5 px-7 py-8">
            <div>
               <Label>Current Password</Label>

               <Input
                  required
                  type="password"
                  name="current_password"
                  value={data.current_password}
                  placeholder="Enter your current password"
                  onChange={onHandleChange}
               />

               <InputError message={errors.current_password} className="mt-2" />
            </div>

            <div>
               <Label>New Password</Label>

               <Input
                  required
                  type="password"
                  name="password"
                  value={data.password}
                  placeholder="Enter your new password"
                  onChange={onHandleChange}
               />

               <InputError message={errors.password} className="mt-2" />
            </div>

            <div>
               <Label>Confirm New Password</Label>

               <Input
                  required
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  placeholder="Rewrite your new password"
                  onChange={onHandleChange}
               />
            </div>

            <div>
               <LoadingButton loading={processing} className="h-9">
                  Change Password
               </LoadingButton>
            </div>
         </form>
      </Card>
   );
};

export default ChangePassword;
