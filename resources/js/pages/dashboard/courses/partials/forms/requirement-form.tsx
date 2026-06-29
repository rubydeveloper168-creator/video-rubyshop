import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Input } from '@/components/ui/input';
import { onHandleChange } from '@/lib/inertia';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';

const RequirementForm = ({ requirement }: { requirement: CourseRequirement }) => {
   const { text } = useI18n();
   const {
      data,
      setData,
      put,
      delete: destroy,
      errors,
      processing,
   } = useForm({
      requirement: requirement ? requirement.requirement : '',
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      put(route('requirements.update', { requirement: requirement.id }));
   };

   const handleDelete = () => {
      destroy(route('requirements.destroy', { requirement: requirement.id }));
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-2">
         <div>
            <Input
               required
               type="text"
               name="requirement"
               value={data.requirement || ''}
               placeholder={text('Requirement')}
               onChange={(e) => onHandleChange(e, setData)}
            />

            <InputError message={errors.requirement} />
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

export default RequirementForm;
