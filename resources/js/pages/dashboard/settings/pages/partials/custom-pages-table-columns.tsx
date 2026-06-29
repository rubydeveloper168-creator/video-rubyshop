import DeleteModal from '@/components/inertia/delete-modal';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

const TableColumn = (text: (value?: string | null) => string): ColumnDef<Page>[] => [
   {
      accessorKey: 'name',
      header: () => <p className="px-3">{text('Name')}</p>,
      cell: ({ row }) => <div className="px-3 py-1 text-sm font-medium">{row.getValue('name')}</div>,
   },
   {
      accessorKey: 'slug',
      header: () => <p className="px-3">{text('Slug')}</p>,
      cell: ({ row }) => <div className="text-muted-foreground px-3 py-1 text-sm">{row.getValue('slug')}</div>,
   },
   {
      accessorKey: 'title',
      header: () => <p className="px-3">{text('Title')}</p>,
      cell: ({ row }) => <div className="text-muted-foreground px-3 py-1 text-sm">{row.getValue('title')}</div>,
   },
   {
      accessorKey: 'meta_description',
      header: () => <p className="px-3">{text('Meta Description')}</p>,
      cell: ({ row }) => <div className="text-muted-foreground px-3 py-1 text-sm">{row.getValue('meta_description')}</div>,
   },
   {
      accessorKey: 'meta_keywords',
      header: () => <p className="px-3">{text('Meta Keywords')}</p>,
      cell: ({ row }) => <div className="text-muted-foreground px-3 py-1 text-sm">{row.getValue('meta_keywords')}</div>,
   },
   {
      id: 'action',
      header: () => <div className="px-3 text-center">{text('Action')}</div>,
      cell: ({ row }) => {
         const page = row.original;
         const url = window.location.origin + '/' + page.slug;

         return (
            <Popover>
               <div className="flex justify-end pr-4">
                  <PopoverTrigger asChild>
                     <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-muted hover:!bg-muted-foreground/10 h-8 w-8"
                     >
                        <MoreVertical className="h-4 w-4" />
                     </Button>
                  </PopoverTrigger>
               </div>

               <PopoverContent align="end" className="flex w-[140px] flex-col space-y-1 p-2">
                  <Button
                     size="sm"
                     variant="ghost"
                     className="bg-muted hover:!bg-muted-foreground/10"
                     onClick={() => router.get(route('settings.custom-page.edit', page.id))}
                  >
                     <span>{text('Edit Page')}</span>
                  </Button>

                  <Button
                     size="sm"
                     variant="ghost"
                     className="bg-muted hover:!bg-muted-foreground/10"
                     onClick={() => {
                        navigator.clipboard.writeText(url);
                        toast.success(text('URL copied to clipboard'));
                     }}
                  >
                     <span>{text('Copy URL')}</span>
                  </Button>

                  <Button size="sm" variant="ghost" className="bg-muted hover:!bg-muted-foreground/10">
                     <a target="_blank" href={route('inner.page', page.slug)}>
                        {text('Preview Page')}
                     </a>
                  </Button>

                  {page.slug !== 'about-us' && page.slug !== 'our-team' && page.slug !== 'careers' && (
                     <DeleteModal
                        routePath={route('settings.custom-page.destroy', page.id)}
                        actionComponent={
                           <Button size="sm" variant="destructive">
                              <span>{text('Delete')}</span>
                           </Button>
                        }
                     />
                  )}
               </PopoverContent>
            </Popover>
         );
      },
   },
];

export default TableColumn;
