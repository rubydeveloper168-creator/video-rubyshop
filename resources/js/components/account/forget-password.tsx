import InputError from '@/components/input-error';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SharedData } from '@/types/global';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import LoadingButton from '../loading-button';

const ForgetPassword = () => {
   const { props } = usePage<SharedData>();
   const { email } = props.auth.user;

   const { data, post, errors, clearErrors, processing } = useForm({
      email: email,
   });

   const submit: FormEventHandler = (e) => {
      e.preventDefault();
      clearErrors();

      post(route('account.forgot-password'));
   };

   return (
      <Card className="border-none">
         <div className="border-b-border border-b px-7 pt-7 pb-4">
            <p className="text18 font-bold">Forget Password</p>
         </div>

         <form onSubmit={submit} className="px-7 py-8">
            <div>
               <Label>Your Email</Label>

               <Input readOnly required type="email" value={data.email} />

               <InputError message={errors.email} className="mt-2" />
            </div>

            <LoadingButton className="mt-5 h-9" loading={processing}>
               Get Password Reset Link
            </LoadingButton>
         </form>
      </Card>
   );
};

export default ForgetPassword;
