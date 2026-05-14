import DataSortModal from '@/components/data-sort-modal';
import DeleteByInertia from '@/components/inertia/delete-modal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import useScreen from '@/hooks/use-screen';
import { router, usePage } from '@inertiajs/react';
import { ArrowDownUp, ListOrdered, MoreVertical, Pencil, Plus, Trash2 } from 'lucide-react';
import { CourseUpdateProps } from '../update';
import LessonForm from './forms/lesson-form';
import QuestionQuestions from './forms/question-questions';
import QuizForm from './forms/quiz-form';
import SectionForm from './forms/section-form';

const Curriculum = () => {
   const { props } = usePage<CourseUpdateProps>();
   const { screen } = useScreen();

   return (
      <Card className="p-4 sm:p-6">
         <div className="flex flex-wrap items-center gap-4">
            <SectionForm
               title="Add Section"
               handler={
                  <Button variant="ghost" className="bg-muted hover:!bg-muted-foreground/10">
                     Add Section
                  </Button>
               }
            />

            <DataSortModal
               title="Sort Items"
               data={props.course.sections}
               handler={
                  <Button variant="ghost" className="bg-muted hover:!bg-muted-foreground/10">
                     Sort Section
                  </Button>
               }
               onOrderChange={(newOrder) => {
                  router.post(
                     route('section.sort'),
                     {
                        sortedData: newOrder,
                     },
                     { preserveScroll: true },
                  );
               }}
               renderContent={(item) => (
                  <Card className="w-full px-4 py-3">
                     <p>{item.title}</p>
                  </Card>
               )}
            />
         </div>

         <Separator className="my-6" />

         <Accordion type="single" collapsible className="space-y-4">
            {props.course.sections.map((section, index) => (
               <AccordionItem key={section.id} value={section.id as string} className="w-full overflow-hidden rounded-lg border">
                  <AccordionTrigger className="[&[data-state=open]]:!bg-muted px-4 py-3 text-base hover:no-underline">
                     <div className="flex w-full items-center justify-between pr-4">
                        <span>
                           {index + 1}. {section.title}
                        </span>

                        {screen > 1024 ? (
                           <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <QuizForm
                                 title="Add Quiz"
                                 sectionId={section.id}
                                 handler={
                                    <Button variant="ghost" className="bg-muted hover:!bg-muted-foreground/10 h-8">
                                       <Plus className="h-4 w-4" />
                                       <span>Quiz</span>
                                    </Button>
                                 }
                              />

                              <LessonForm
                                 title="Add Lesson"
                                 sectionId={section.id}
                                 handler={
                                    <Button variant="ghost" className="bg-muted hover:!bg-muted-foreground/10 h-8">
                                       <Plus className="h-4 w-4" />
                                       <span>Lesson</span>
                                    </Button>
                                 }
                              />

                              <DataSortModal
                                 title="Sort Items"
                                 data={section.section_lessons}
                                 handler={
                                    <Button variant="ghost" className="bg-muted hover:!bg-muted-foreground/10 h-8 w-8">
                                       <ArrowDownUp className="h-4 w-4" />
                                    </Button>
                                 }
                                 onOrderChange={(newOrder) => {
                                    router.post(
                                       route('lesson.sort'),
                                       {
                                          sortedData: newOrder,
                                       },
                                       { preserveScroll: true },
                                    );
                                 }}
                                 renderContent={(lesson) => (
                                    <Card className="w-full px-4 py-3">
                                       <p>{lesson.title}</p>
                                    </Card>
                                 )}
                              />

                              <SectionForm
                                 title="Update Section"
                                 section={section}
                                 handler={
                                    <Button variant="ghost" className="bg-muted hover:!bg-muted-foreground/10 h-8 w-8">
                                       <Pencil className="text-secondary-foreground h-3 w-3" />
                                    </Button>
                                 }
                              />

                              <DeleteByInertia
                                 routePath={route('section.delete', {
                                    id: section.id,
                                 })}
                                 actionComponent={
                                    <Button variant="ghost" className="bg-muted hover:!bg-muted-foreground/10 h-8 w-8">
                                       <Trash2 className="text-destructive h-3 w-3" />
                                    </Button>
                                 }
                              />
                           </div>
                        ) : (
                           <Popover>
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
                              <PopoverContent align="end" className="flex w-[140px] flex-col space-y-1 p-2">
                                 <QuizForm
                                    title="Add Quiz"
                                    sectionId={section.id}
                                    handler={
                                       <Button variant="ghost" className="bg-muted hover:!bg-muted-foreground/10 h-8 w-full">
                                          Add Quiz
                                       </Button>
                                    }
                                 />

                                 <LessonForm
                                    title="Add Lesson"
                                    sectionId={section.id}
                                    handler={
                                       <Button variant="ghost" className="bg-muted hover:!bg-muted-foreground/10 h-8 w-full">
                                          Add Lesson
                                       </Button>
                                    }
                                 />

                                 <DataSortModal
                                    title="Sort Items"
                                    data={section.section_lessons}
                                    handler={
                                       <Button variant="ghost" className="bg-muted hover:!bg-muted-foreground/10 h-8 w-full">
                                          Sort Lessons
                                       </Button>
                                    }
                                    onOrderChange={(newOrder) => {
                                       router.post(
                                          route('lesson.sort'),
                                          {
                                             sortedData: newOrder,
                                          },
                                          { preserveScroll: true },
                                       );
                                    }}
                                    renderContent={(lesson) => (
                                       <Card className="w-full px-4 py-3">
                                          <p>{lesson.title}</p>
                                       </Card>
                                    )}
                                 />

                                 <SectionForm
                                    title="Update Section"
                                    section={section}
                                    handler={
                                       <Button variant="ghost" className="bg-muted hover:!bg-muted-foreground/10 h-8 w-full">
                                          Edit Section
                                       </Button>
                                    }
                                 />

                                 <DeleteByInertia
                                    routePath={route('section.delete', {
                                       id: section.id,
                                    })}
                                    actionComponent={
                                       <Button variant="ghost" className="bg-muted hover:!bg-muted-foreground/10 h-8 w-full">
                                          Delete Section
                                       </Button>
                                    }
                                 />
                              </PopoverContent>
                           </Popover>
                        )}
                     </div>
                  </AccordionTrigger>

                  <AccordionContent className="space-y-2 p-4">
                     {section.section_lessons.length > 0 ? (
                        section.section_lessons.map((lesson: SectionLesson) => (
                           <div key={lesson.id} className="group border-border flex w-full items-center justify-between rounded-md border px-4 py-3">
                              <p>{lesson.title}</p>

                              <div className="invisible flex items-center gap-2 group-hover:visible">
                                 <DeleteByInertia
                                    routePath={route('lesson.delete', {
                                       id: lesson.id,
                                    })}
                                    actionComponent={
                                       <Button size="icon" variant="secondary" className="text-destructive h-7 w-7">
                                          <Trash2 className="h-3 w-3" />
                                       </Button>
                                    }
                                 />

                                 <LessonForm
                                    lesson={lesson}
                                    sectionId={section.id}
                                    title="Update Lesson"
                                    handler={
                                       <Button size="icon" variant="secondary" className="h-7 w-7">
                                          <Pencil className="h-3 w-3" />
                                       </Button>
                                    }
                                 />
                              </div>
                           </div>
                        ))
                     ) : (
                        <div className="px-4 py-3 text-center">
                           <p>There is no lesson added</p>
                        </div>
                     )}

                     {section.section_quizzes.map((quiz: SectionQuiz) => (
                        <div key={quiz.id} className="group border-border flex w-full items-center justify-between rounded-md border px-4 py-3">
                           <p>{quiz.title}</p>

                           <div className="invisible flex items-center gap-2 group-hover:visible">
                              <QuestionQuestions
                                 quiz={quiz}
                                 title="Quiz Questions"
                                 handler={
                                    <Button size="icon" variant="secondary" className="h-7 w-7">
                                       <ListOrdered className="h-3 w-3" />
                                    </Button>
                                 }
                              />

                              <DeleteByInertia
                                 routePath={route('quiz.delete', {
                                    id: quiz.id,
                                 })}
                                 actionComponent={
                                    <Button size="icon" variant="secondary" className="text-destructive h-7 w-7">
                                       <Trash2 className="h-3 w-3" />
                                    </Button>
                                 }
                              />

                              <QuizForm
                                 quiz={quiz}
                                 title="Update Quiz"
                                 sectionId={section.id}
                                 handler={
                                    <Button size="icon" variant="secondary" className="h-7 w-7">
                                       <Pencil className="h-3 w-3" />
                                    </Button>
                                 }
                              />
                           </div>
                        </div>
                     ))}
                  </AccordionContent>
               </AccordionItem>
            ))}
         </Accordion>
      </Card>
   );
};

export default Curriculum;
