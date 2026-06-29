import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { onHandleChange } from '@/lib/inertia';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';

const FaqForm = ({ faq }: { faq: CourseFaq }) => {
   const { text } = useI18n();
   const {
      data,
      setData,
      put,
      delete: destroy,
      errors,
      processing,
   } = useForm({
      question: faq ? faq.question : '',
      answer: faq ? faq.answer : '',
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      put(route('faqs.update', { faq: faq.id }));
   };

   const handleDelete = () => {
      destroy(route('faqs.destroy', { faq: faq.id }));
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-2">
         <div>
            <Input
               required
               type="text"
               name="question"
               value={data.question || ''}
               placeholder={text('Question')}
               onChange={(e) => onHandleChange(e, setData)}
            />

            <InputError message={errors.question} />
         </div>

         <div>
            <Textarea required name="answer" value={data.answer || ''} placeholder={text('Answer')} onChange={(e) => onHandleChange(e, setData)} />

            <InputError message={errors.question} />
         </div>

         <div className="flex items-center justify-end gap-2">
            <LoadingButton
               type="button"
               variant="outline"
               loading={processing}
               onClick={handleDelete}
               className="h-7 w-full bg-red-50 text-xs hover:bg-red-100"
            >
               {text('Remove')}
            </LoadingButton>
            <LoadingButton variant="secondary" className="h-7 w-full text-xs" loading={processing}>
               {text('Save')}
            </LoadingButton>
         </div>
      </form>
   );
};

export default FaqForm;
