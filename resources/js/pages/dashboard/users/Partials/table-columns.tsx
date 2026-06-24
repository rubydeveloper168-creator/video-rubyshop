import DeleteModal from '@/components/inertia/delete-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import VerifiedBadge from '@/components/verified-badge';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import EditForm from './edit-form';

const TableColumn: ColumnDef<User>[] = [
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
               <AvatarImage src={row.original.photo || ''} className="object-cover" />
               <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
               <p className="mb-0.5 flex items-center gap-1.5 text-base font-medium">
                  {row.original.name}
                  {row.original.is_verified && <VerifiedBadge />}
               </p>
               <p className="text-muted-foreground text-xs">{row.original.email}</p>
            </div>
         </div>
      ),
   },
   {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
         <div className="capitalize">
            <span>{row.original.status === 1 ? 'Active' : 'Inactive'}</span>
         </div>
      ),
   },
   {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
         <div className="capitalize">
            <span>{row.original.role}</span>
         </div>
      ),
   },
   {
      id: 'actions',
      header: () => <div className="text-end">Action</div>,
      cell: ({ row }) => {
         return (
            <div className="flex justify-end gap-2 py-1">
               <EditForm
                  user={row.original}
                  actionComponent={
                     <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Pencil />
                     </Button>
                  }
               />

               <DeleteModal
                  routePath={route('users.destroy', row.original.id)}
                  message="After deleting the instructor, the admin will be the assign as a new instructor, of this instructor all the courses."
                  actionComponent={
                     <Button size="icon" variant="ghost" className="bg-destructive/8 hover:bg-destructive/6 h-8 w-8 p-0">
                        <Trash2 className="text-destructive text-sm" />
                     </Button>
                  }
               />
            </div>
         );
      },
   },
];

export default TableColumn;
