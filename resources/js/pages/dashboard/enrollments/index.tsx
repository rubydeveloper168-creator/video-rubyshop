import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import TableHeader from '@/components/table/table-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard/layout';
import { useI18n } from '@/lib/i18n';
import { SharedData } from '@/types/global';
import { Link } from '@inertiajs/react';
import { SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import * as React from 'react';
import { ReactNode } from 'react';
import AdminTableColumn from './partials/admin-table-columns';
import InstructorTableColumn from './partials/instructor-table-columns';

interface Props extends SharedData {
   enrollments: Pagination<Enrollment>;
}

const Index = (props: Props) => {
   const { locale, text } = useI18n();
   const [sorting, setSorting] = React.useState<SortingState>([]);

   const table = useReactTable({
      data: props.enrollments.data,
      columns: props.auth.user.role === 'admin' ? AdminTableColumn(text, locale) : InstructorTableColumn(text, locale),
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting },
   });

   return (
      <div>
         <Link href={route('enrollments.create')}>
            <Button>{text('Add New Enrollment')}</Button>
         </Link>

         <Separator className="my-6" />

         <Card>
            <TableFilter
               data={props.enrollments}
               title={text('Enrollment List')}
               globalSearch={true}
               tablePageSizes={[10, 15, 20, 25]}
               routeName="enrollments.index"
               // Icon={<Users className="h-6 w-6 text-primary" />}
               // exportPath={route('users.export')}
            />

            <Table className="border-border border-y">
               <TableHeader table={table} />

               <TableBody>
                  {props.enrollments.data && props.enrollments.data.length > 0 ? (
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

            <TableFooter className="p-5 sm:p-7" routeName="enrollments.index" paginationInfo={props.enrollments} />
         </Card>
      </div>
   );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;
