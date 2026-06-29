import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { AppLocale } from '@/lib/i18n';

const PayoutsTableColumn = (text: (value?: string | null) => string, _locale: AppLocale): ColumnDef<Payout>[] => [
   {
      accessorKey: 'profile',
      header: () => <div className="pl-4">{text('Name')}</div>,
      cell: ({ row }) => (
         <div className="flex items-center gap-2 pl-4 capitalize">
            <Avatar>
               <AvatarImage src={row.original.user.photo || ''} alt={row.original.user.name} className="object-cover" />
               <AvatarFallback>{row.original.user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div>
               <p>{row.original.user.name}</p>
               <p>{row.original.user.email}</p>
            </div>
         </div>
      ),
   },
   {
      accessorKey: 'amount',
      header: () => <div className="text-center">{text('Payout amount')}</div>,
      cell: ({ row }) => (
         <div className="text-center capitalize">
            <p>{row.original.amount}$</p>
         </div>
      ),
   },
   {
      accessorKey: 'status',
      header: () => <div className="text-center">{text('Status')}</div>,
      cell: ({ row }) => <div className="text-center capitalize">{row.getValue('status')}</div>,
   },
   {
      id: 'action',
      header: () => <div className="pr-4 text-end">{text('Action')}</div>,
      cell: ({ row }) => (
         <div className="pr-4 text-end">
            <Button asChild type="button">
               <a href={route('payouts.gateway.index', { slug: 'web', request_id: row.original.id })}>{text('Pay')}</a>
            </Button>
         </div>
      ),
   },
];

export default PayoutsTableColumn;
