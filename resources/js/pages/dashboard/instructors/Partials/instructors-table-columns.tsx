import DeleteModal from '@/components/inertia/delete-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import ApplicationApproval from './application-approval';

const InstructorsTableColumn = (isAdmin: boolean): ColumnDef<Instructor>[] => [
   {
      accessorKey: 'name',
      header: ({ column }) => {
         return (
            <div className="flex items-center">
               <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                  Name
                  <ArrowUpDown />
               </Button>
            </div>
         );
      },
      cell: ({ row }) => (
         <div className="flex items-center gap-2">
            <Avatar className="h-11 w-11">
               <AvatarImage src={row.original.user.photo || ''} className="object-cover" />
               <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
               <p className="mb-0.5 text-base font-medium">{row.original.user.name}</p>
               <p className="text-muted-foreground text-xs">{row.original.user.email}</p>
            </div>
         </div>
      ),
   },
   {
      accessorKey: 'courses',
      header: 'Number Of Course',
      cell: ({ row }) => (
         <div className="capitalize">
            <p>{row.original.courses_count} Courses</p>
         </div>
      ),
   },
   {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
         <div className="capitalize">
            <span>{row.original.status}</span>
         </div>
      ),
   },
   {
      id: 'actions',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row }) => {
         return (
            <div className="flex justify-end gap-2 py-1">
               <ApplicationApproval
                  instructor={row.original}
                  actionComponent={
                     <Button variant="secondary" className="h-8">
                        <Pencil />
                        Status
                     </Button>
                  }
               />

               {isAdmin && (
                  <DeleteModal
                     routePath={route('instructors.destroy', row.original.id)}
                     message="After deleting the instructor, the admin will be the assign as a new instructor, of this instructor all the courses."
                     actionComponent={
                        <Button size="icon" variant="ghost" className="bg-destructive/8 hover:bg-destructive/6 h-8 w-8 p-0">
                           <Trash2 className="text-destructive text-sm" />
                        </Button>
                     }
                  />
               )}
            </div>
         );
      },
   },
];

export default InstructorsTableColumn;
