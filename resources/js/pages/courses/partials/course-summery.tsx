import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CourseSummery = () => {
   return (
      <Tabs defaultValue="summery" className="bg-card rounded-md border shadow">
         <TabsList className="overflow-hidden rounded-none bg-transparent px-0 py-6">
            {tabs.map(({ label, value }) => (
               <TabsTrigger
                  key={value}
                  value={value}
                  className="border-primary data-[state=active]:!bg-muted data-[state=active]:before:bg-primary relative flex items-center justify-start gap-3 rounded-none bg-transparent px-8 py-4 text-start !shadow-none before:absolute before:right-0 before:bottom-0 before:left-0 before:h-1 before:rounded-t-xl data-[state=active]:before:content-['.']"
               >
                  <span>{label}</span>
               </TabsTrigger>
            ))}
         </TabsList>

         <Separator className="mt-[1px]" />

         {tabs.map(({ value, Component }) => (
            <TabsContent key={value} value={value} className="m-0 p-5">
               {Component}
            </TabsContent>
         ))}
      </Tabs>
   );
};

const tabs = [
   {
      value: 'summery',
      label: 'Summery',
      Component: <h1>Summery</h1>,
   },
   {
      value: 'certificate',
      label: 'Certificate',
      Component: <h1>Certificate</h1>,
   },
   {
      value: 'forum',
      label: 'Forum',
      Component: <h1>Forum</h1>,
   },
];

export default CourseSummery;
