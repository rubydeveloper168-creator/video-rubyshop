import DataSortModal from '@/components/data-sort-modal';
import DeleteModal from '@/components/inertia/delete-modal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/layouts/dashboard/layout';
import { useI18n } from '@/lib/i18n';
import { SharedData } from '@/types/global';
import { router } from '@inertiajs/react';
import { ArrowDownUp, Pencil, Plus, Trash2 } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { ReactNode } from 'react';
import AddCategoryChild from './partials/category-child-form';
import CategoryForm from './partials/category-form';

interface Props extends SharedData {
   categories: CourseCategory[];
   lastPosition: number;
   lastChildPosition: number;
}

const Index = (props: Props) => {
   const { isAdmin } = useAuth();
   const { categories, lastPosition, lastChildPosition } = props;
   const { text } = useI18n();

   const defaultCategory = categories.find((category) => category.slug === 'default');
   const otherCategories = categories.filter((category) => category.slug !== 'default');

   return (
      <div>
         <div className="flex items-center gap-6">
            <CategoryForm title={text('Add New Category')} handler={<Button>{text('Add New Category')}</Button>} lastPosition={lastPosition} />

            <DataSortModal
               title={text('Sort Categories')}
               data={categories}
               handler={
                  <Button variant="ghost" className="bg-muted hover:bg-muted-foreground/6">
                     {text('Sort Categories')}
                  </Button>
               }
               onOrderChange={(newOrder, setOpen) => {
                  router.post(
                     route('categories.sort'),
                     {
                        sortedData: newOrder,
                     },
                     {
                        preserveScroll: true,
                        onSuccess: () => setOpen && setOpen(false),
                     },
                  );
               }}
               renderContent={(item) => (
                  <Card className="w-full px-4 py-3">
                     <p>{item.title}</p>
                  </Card>
               )}
            />
         </div>

         {categories.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 border-t border-gray-300 py-6 md:grid-cols-2 lg:grid-cols-4">
               {defaultCategory && (
                  <Card key={defaultCategory.id} className="p-6">
                     <div className="flex items-center gap-2">
                        <DynamicIcon size={20} name={defaultCategory.icon as any} />
                        <h2>{defaultCategory.title}</h2>
                     </div>

                     <Separator className="my-4" />

                     <div className="space-y-1">
                        <p className="font-medium">{text('Protected Category')}</p>
                        <p className="text-muted-foreground text-sm">
                           {text(
                              'When a specific category is deleted, all courses in that category will be moved to this default category. So default category cannot be edited or removed.',
                           )}
                        </p>
                     </div>
                  </Card>
               )}

               {otherCategories.map((category) => (
                  <Card key={category.id} className="p-6">
                     <div className="relative text-center">
                        <div className="flex items-center gap-2">
                           <DynamicIcon size={20} name={category.icon as any} />
                           <h2>{category.title}</h2>
                        </div>

                        <div className="absolute -top-1 right-0 space-x-1">
                           <CategoryForm
                              title={text('Update The Category')}
                              category={category}
                              lastPosition={lastPosition}
                              handler={
                                 <Button size="icon" variant="ghost" className="bg-muted hover:bg-muted-foreground/10 h-8 w-8 rounded-full p-0">
                                    <Pencil className="text-sm" />
                                 </Button>
                              }
                           />

                           {isAdmin && (
                              <DeleteModal
                                 message={text('After deleting the category, all the courses of this category will be moved to the default category.')}
                                 routePath={route('categories.destroy', category.id)}
                                 actionComponent={
                                    <Button size="icon" variant="ghost" className="bg-destructive/8 hover:bg-destructive/6 h-8 w-8 rounded-full p-0">
                                       <Trash2 className="text-destructive text-sm" />
                                    </Button>
                                 }
                              />
                           )}
                        </div>
                     </div>

                     <Separator className="my-4" />

                     <div className="space-y-3">
                        {category.category_children?.map((child) => (
                           <div key={child.id} className="border-border relative rounded-md border px-2 py-1">
                              <div className="flex items-center gap-2">
                                 <DynamicIcon size={16} name={child.icon as any} />
                                 <p>{child.title}</p>
                              </div>

                              <div className="absolute top-0 right-0 flex items-center gap-1">
                                 <AddCategoryChild
                                    categoryChild={child}
                                    categoryId={Number(category.id)}
                                    title={text('Update Child Category')}
                                    handler={
                                       <Button size="icon" variant="ghost" className="h-8 w-8 p-0">
                                          <Pencil className="text-sm" />
                                       </Button>
                                    }
                                    lastChildPosition={lastChildPosition}
                                 />

                                 {isAdmin && (
                                    <div>
                                       <DeleteModal
                                          message={text('After deleting the child category, all the courses of this category will be moved to the parent category.')}
                                          routePath={route('category-child.destroy', child.id)}
                                          actionComponent={
                                             <Button size="icon" variant="ghost" className="hover:bg-destructive/6 h-8 w-8">
                                                <Trash2 className="text-destructive text-sm" />
                                             </Button>
                                          }
                                       />
                                    </div>
                                 )}
                              </div>
                           </div>
                        ))}

                        <div className="flex items-center justify-baseline gap-3">
                           <AddCategoryChild
                              categoryId={Number(category.id)}
                              title={text('Add New Child Category')}
                              handler={
                                 <Button size="sm" variant="ghost" className="bg-muted hover:!bg-muted-foreground/10 w-full">
                                    <Plus className="text-sm" />
                                    <span>{text('Add')}</span>
                                 </Button>
                              }
                              lastChildPosition={lastChildPosition}
                           />

                           <DataSortModal
                              title={text('Sort Child Categories')}
                              data={category.category_children || []}
                              handler={
                                 <Button size="sm" variant="ghost" className="bg-muted hover:!bg-muted-foreground/10 w-full">
                                    <ArrowDownUp className="text-sm" />
                                    <span>{text('Sort')}</span>
                                 </Button>
                              }
                              onOrderChange={(newOrder, setOpen) => {
                                 router.post(
                                    route('category-child.sort'),
                                    {
                                       sortedData: newOrder,
                                    },
                                    {
                                       preserveScroll: true,
                                       onSuccess: () => setOpen && setOpen(false),
                                    },
                                 );
                              }}
                              renderContent={(item) => (
                                 <Card className="w-full px-4 py-3">
                                    <p>{item.title}</p>
                                 </Card>
                              )}
                           />
                        </div>
                     </div>
                  </Card>
               ))}
            </div>
         ) : (
            <Card className="mt-6 border-t border-gray-300 p-6">
               <h2 className="text-center">{text('There no category created')}</h2>
            </Card>
         )}
      </div>
   );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;
