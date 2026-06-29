import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard/layout';
import { useI18n } from '@/lib/i18n';
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ReactNode } from 'react';
import TableColumn from './partials/request-table-columns';

const Request = ({ payouts }: { payouts: Pagination<Payout> }) => {
   const { locale, text } = useI18n();
   const table = useReactTable({
      data: payouts.data,
      columns: TableColumn(text, locale),
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
   });

   return (
      <Card>
         <TableFilter
            data={payouts}
            title={text('Payout Request')}
            globalSearch={true}
            tablePageSizes={[10, 15, 20, 25]}
            routeName="payouts.request.index"
            className="w-full"
         />

         <Table className="border-border border-y">
            <TableHeader table={table} />

            <TableBody>
               {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                     <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                           <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                        ))}
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell className="h-24 text-center">{text('No results.')}</TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>

         <TableFooter className="mt-1 p-5 sm:p-7" routeName="payouts.request.index" paginationInfo={payouts} />
      </Card>
   );
};

Request.layout = (children: ReactNode) => <DashboardLayout>{children}</DashboardLayout>;

export default Request;
