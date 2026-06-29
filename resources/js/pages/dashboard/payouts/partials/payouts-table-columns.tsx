import { ColumnDef } from '@tanstack/react-table';
import { AppLocale } from '@/lib/i18n';

const PayoutsTableColumn = (text: (value?: string | null) => string, locale: AppLocale): ColumnDef<Payout>[] => [
   {
      accessorKey: 'payout_amount',
      header: () => <div className="pl-4">{text('Payout amount')}</div>,
      cell: ({ row }) => (
         <div className="pl-4 capitalize">
            <p>{row.original.amount}</p>
            <p>{new Date(row.original.created_at).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
         </div>
      ),
   },
   {
      accessorKey: 'status',
      header: () => <div className="text-center">{text('Status')}</div>,
      cell: ({ row }) => <div className="text-center capitalize">{row.getValue('status')}</div>,
   },
   {
      accessorKey: 'payout_method',
      header: () => <div className="text-center">{text('Payout Method')}</div>,
      cell: ({ row }) => (
         <div className="text-center capitalize">
            <p>{row.original.payout_method}</p>
         </div>
      ),
   },
   {
      id: 'processed',
      header: () => <div className="pr-4 text-end">{text('Processed Date')}</div>,
      cell: ({ row }) => <div className="pr-4 text-end">{new Date(row.original.updated_at).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>,
   },
];

export default PayoutsTableColumn;
