import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';

const Details = ({ course }: { course: Course }) => {
   return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
         <div>
            <h6 className="mb-4 text-xl font-semibold">Requirements</h6>

            <Separator className="my-4" />

            <div className="space-y-4">
               {course.requirements?.map(({ id, requirement }) => (
                  <div key={id} className="flex gap-3">
                     <div className="bg-secondary-light mt-0.5 flex h-5 w-full max-w-5 items-center justify-center rounded-full">
                        <Check className="text-secondary-foreground h-4 w-4 shrink-0" />
                     </div>
                     <p className="text-muted-foreground">{requirement}</p>
                  </div>
               ))}
            </div>
         </div>

         <div>
            <h6 className="mb-4 text-xl font-semibold">Outcomes</h6>

            <Separator className="my-4" />

            <div className="space-y-4">
               {course.outcomes?.map(({ id, outcome }) => (
                  <div key={id} className="flex gap-3">
                     <div className="bg-secondary-light mt-0.5 flex h-5 w-full max-w-5 items-center justify-center rounded-full">
                        <Check className="text-secondary-foreground h-4 w-4 shrink-0" />
                     </div>
                     <p className="text-muted-foreground">{outcome}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Details;
