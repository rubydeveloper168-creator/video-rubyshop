import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Input } from '@/components/ui/input';
import { onHandleChange } from '@/lib/inertia';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';

const OutcomeForm = ({ outcome }: { outcome: CourseOutcome }) => {
   const { text } = useI18n();
   const {
      data,
      setData,
      put,
      delete: destroy,
      errors,
      processing,
   } = useForm({
      outcome: outcome ? outcome.outcome : '',
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      put(route('outcomes.update', { outcome: outcome.id }));
   };

   const handleDelete = () => {
      destroy(route('outcomes.destroy', { outcome: outcome.id }));
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-2">
         <div>
            <Input
               required
               type="text"
               name="outcome"
               value={data.outcome || ''}
               placeholder={text('Outcome')}
               onChange={(e) => onHandleChange(e, setData)}
            />

            <InputError message={errors.outcome} />
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

export default OutcomeForm;
