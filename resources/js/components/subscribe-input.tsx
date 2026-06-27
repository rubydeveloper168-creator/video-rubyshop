import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import ButtonGradientPrimary from './button-gradient-primary';
import InputError from './input-error';

interface SubscribeInputProps {
   className?: string;
   buttonText?: string;
}

const SubscribeInput = ({ className, buttonText }: SubscribeInputProps) => {
   const { text } = useI18n();
   const { data, setData, post, errors } = useForm({
      email: '',
   });

   const submit: FormEventHandler = (e) => {
      e.preventDefault();

      post(route('subscribes.store'));
   };

   return (
      <form onSubmit={submit} className={cn('relative z-10', className)}>
         <div className="bg-background text-primary flex items-center justify-between gap-2 rounded-md border border-gray-400">
            <input
               type="email"
               name="email"
               value={data.email}
               onChange={(e) => setData('email', e.target.value)}
               className="h-[50px] w-full px-4 focus:outline-0"
               placeholder={text('Enter your email address')}
            />
            <ButtonGradientPrimary type="submit" shadow={false} className="mr-1">
               {buttonText || text('Subscribe')}
            </ButtonGradientPrimary>
         </div>

         <InputError message={errors.email} />
      </form>
   );
};

export default SubscribeInput;
