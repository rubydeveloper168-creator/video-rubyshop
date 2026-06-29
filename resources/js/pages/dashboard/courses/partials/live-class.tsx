import DeleteModal from '@/components/inertia/delete-modal';
import TiptapRenderer from '@/components/text-editor/tiptap-renderer/client-renderer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n';
import { zoomIsEnabled } from '@/lib/zoom';
import { Link, usePage } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, Plus, Trash2, Users } from 'lucide-react';
import { CourseUpdateProps } from '../update';
import LiveClassForm from './forms/live-class-form';
import LiveClassStatus from './live-class-status';

const LiveClass = () => {
   const { props } = usePage<CourseUpdateProps>();
   const { course, zoomConfig } = props;
   const isZoomEnabled = zoomIsEnabled(zoomConfig);
   const { text } = useI18n();

   // Get live classes from course data
   const liveClasses = course.live_classes || [];

   return (
      <Card className="container p-4 sm:p-6">
         <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-bold">{text('Live Classes')}</h2>

               <div className="flex items-center gap-3">
                  {/* Create New Live Class Dialog */}
                  {isZoomEnabled ? (
                     <LiveClassForm
                        courseId={course.id}
                        title={text('Schedule New Live Class')}
                        handler={
                           <Button className="flex items-center gap-2">
                              <Plus className="h-4 w-4" />
                              {text('Schedule Live Class')}
                           </Button>
                        }
                     />
                  ) : (
                     <Button disabled className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        {text('Schedule Live Class')}
                     </Button>
                  )}
               </div>
            </div>

            {/* Live Classes List */}
            <div className="space-y-4">
               {liveClasses.length === 0 ? (
                  <div>
                     <p className="bg-destructive/5 dark:bg-destructive/30 rounded-lg p-3 text-center text-sm text-red-500">
                        {text('Zoom is not enabled for this course. Please enable Zoom to schedule live classes.')}{' '}
                        <Link href={route('settings.live-class')} className="text-blue-500 hover:underline">
                           {text('Enable Zoom')}
                        </Link>
                     </p>

                     <div className="p-8 text-center">
                        <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <h3 className="mb-2 text-lg font-medium">{text('No Live Classes Scheduled')}</h3>
                        <p className="text-gray-500">{text('Schedule your first live class to get started with Zoom.')}</p>
                     </div>
                  </div>
               ) : (
                  liveClasses.map((liveClass) => {
                     return (
                        <Card key={liveClass.id} className="p-6">
                           <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
                              <div className="flex-1">
                                 <h3 className="mb-4 text-lg font-semibold">{liveClass.class_topic}</h3>

                                 <div className="text-muted-foreground mb-4 space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                       <Calendar className="h-4 w-4" />
                                       <span>{format(parseISO(liveClass.class_date_and_time), 'PPP')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                       <Clock className="h-4 w-4" />
                                       <span>{format(parseISO(liveClass.class_date_and_time), 'p')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                       <Users className="h-4 w-4" />
                                       <span>{text('Instructor:')} {course.instructor?.user?.name || text('Unknown')}</span>
                                    </div>
                                 </div>
                              </div>

                              <div className="flex flex-col gap-2">
                                 <LiveClassStatus courseId={course.id} liveClass={liveClass} zoomConfig={zoomConfig} />

                                 <DeleteModal
                                    routePath={route('live-class.destroy', liveClass.id)}
                                    actionComponent={
                                       <Button size="sm" variant="outline" className="flex w-full items-center gap-1 text-red-600 hover:text-red-700">
                                          <Trash2 className="h-3 w-3" />
                                          {text('Delete Class')}
                                       </Button>
                                    }
                                 />
                              </div>
                           </div>

                           {liveClass.class_note && (
                              <Accordion type="single" collapsible className="mt-4 w-full">
                                 <AccordionItem value="item-1" className="bg-muted overflow-hidden rounded-lg border-none">
                                    <AccordionTrigger className="[&[data-state=open]]:!bg-secondary-lighter px-4 py-2 text-base font-medium hover:no-underline">
                                       {text('Class Note')}
                                    </AccordionTrigger>
                                    <AccordionContent className="p-4">
                                       <TiptapRenderer>{liveClass.class_note}</TiptapRenderer>
                                    </AccordionContent>
                                 </AccordionItem>
                              </Accordion>
                           )}
                        </Card>
                     );
                  })
               )}
            </div>
         </div>
      </Card>
   );
};

export default LiveClass;
