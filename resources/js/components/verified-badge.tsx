import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { BadgeCheck } from 'lucide-react';

interface VerifiedBadgeProps {
   className?: string;
   size?: number;
}

const VerifiedBadge = ({ className, size = 16 }: VerifiedBadgeProps) => {
   return (
      <TooltipProvider delayDuration={0}>
         <Tooltip>
            <TooltipTrigger asChild>
               <BadgeCheck className={cn('fill-blue-500 text-white', className)} size={size} aria-label="Verified" />
            </TooltipTrigger>
            <TooltipContent>Verified</TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};

export default VerifiedBadge;
