import InputError from '@/components/input-error';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SharedData } from '@/types/global';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useI18n } from '@/lib/i18n';
import LoadingButton from '../loading-button';

const ChangeEmail = () => {
   const { props } = usePage<SharedData>();
   const { email } = props.auth.user;
   const { errors } = props;
   const { text } = useI18n();

   const { data, setData, post, processing } = useForm({
      current_email: email,
      new_email: '',
   });

   const onHandleChange = (event: any) => {
      setData(event.target.name, event.target.value);
   };

   const submit: FormEventHandler = (e) => {
      e.preventDefault();

      post(route('account.change-email'));
   };

   return (
      <Card className="border-none">
         <div className="border-b-border border-b px-7 pt-7 pb-4">
            <p className="text18 font-bold">{text('Change Email')}</p>
         </div>
         <form onSubmit={submit} className="px-7 py-8">
            <div>
               <Label>{text('Current Email')}</Label>

               <Input required readOnly type="email" name="current_email" value={data.current_email} placeholder={text('Enter your current email')} />

               <InputError message={errors.current_email} className="mt-2" />
            </div>

            <div className="py-5">
               <Label>{text('New Email')}</Label>

               <Input required type="email" name="new_email" value={data.new_email} placeholder={text('Enter your new email')} onChange={onHandleChange} />

               <InputError message={errors.new_email} className="mt-2" />
            </div>

            <LoadingButton loading={processing}>{text('Get Email Change Link')}</LoadingButton>
         </form>
      </Card>
   );
};

export default ChangeEmail;
