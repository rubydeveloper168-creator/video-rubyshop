import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/video-player';
import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LandingFooter from '@/layouts/partials/landing-footer';
import Main from '@/layouts/main';
import { useI18n } from '@/lib/i18n';
import { Head, Link, useForm } from '@inertiajs/react';
import { BookOpen, Lock, Play } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

interface PublicVideoSource {
   src: string;
   type?: string;
   label?: string;
}

interface PublicCourseLessonProps {
   course: { id: number | string; title: string };
   lesson: { id: number | string; duration?: string; thumbnail?: string };
   section: { id: number | string; title: string } | null;
   sections: Array<{ id: number | string; title: string; lessons: Array<{ id: number | string; title: string; duration?: string }> }>;
   unlocked: boolean;
   sources: PublicVideoSource[];
}

const PublicCourseLesson = ({ course, lesson, section, sections, unlocked, sources }: PublicCourseLessonProps) => {
   const { text } = useI18n();
   const { data, setData, post, transform, processing, errors } = useForm({ access_key: '' });
   const [fromQr] = useState(() => typeof window !== 'undefined' && new URLSearchParams(window.location.hash.slice(1)).has('key'));
   const [opening, setOpening] = useState(fromQr && !unlocked);

   useEffect(() => {
      const key = new URLSearchParams(window.location.hash.slice(1)).get('key');
      if (!key) {
         setOpening(false);
         return;
      }
      window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
      if (unlocked) {
         setOpening(false);
         return;
      }
      transform(() => ({ access_key: key }));
      post(route('public.lesson.unlock', { course: course.id }), {
         preserveScroll: true,
         onFinish: () => setOpening(false),
      });
   }, [course.id, lesson.id]);

   const submit: FormEventHandler = (e) => {
      e.preventDefault();
      post(route('public.lesson.unlock', { course: course.id }));
   };

   return (
      <>
         <Head title={course.title} />
         <Main>
            <SidebarProvider className="min-h-screen flex-col">
               <header className="bg-primary text-primary-foreground sticky top-0 z-40 flex h-[60px] items-center justify-between px-4 md:px-8">
                  <Link href="/" className="font-bold">RUBYSHOP</Link>
                  <span className="truncate px-4 text-center font-semibold">{course.title}</span>
                  <BookOpen className="h-5 w-5 shrink-0" />
               </header>

               <div className="flex w-full flex-row-reverse">
                  {unlocked && (
                     <Sidebar side="right" className="top-[60px] shadow-lg">
                        <div className="h-[calc(100vh-60px)] overflow-y-auto p-4">
                           <h2 className="mb-4 text-lg font-semibold">{text('Course content')}</h2>
                           {sections.map((courseSection, sectionIndex) => (
                              <details key={courseSection.id} open={courseSection.id === section?.id} className="mb-3 rounded-lg border">
                                 <summary className="cursor-pointer px-4 py-3 font-medium">{sectionIndex + 1}. {courseSection.title}</summary>
                                 <div className="space-y-1 p-2">
                                    {courseSection.lessons.map((item, lessonIndex) => (
                                       <Link
                                          key={item.id}
                                          href={route('public.lesson.show', { course: course.id, lesson: item.id })}
                                          preserveScroll
                                          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${item.id === lesson.id ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted'}`}
                                       >
                                          <Play className="h-4 w-4 shrink-0" />
                                          <span className="min-w-0 flex-1">{displayLessonTitle(item.title, lessonIndex, text)}</span>
                                          {item.duration && <span className="text-muted-foreground text-xs">{item.duration}</span>}
                                       </Link>
                                    ))}
                                    {courseSection.lessons.length === 0 && <p className="text-muted-foreground px-3 py-2 text-sm">{text('No videos in this section')}</p>}
                                 </div>
                              </details>
                           ))}
                        </div>
                     </Sidebar>
                  )}

                  <SidebarInset>
                     <main className="min-h-[calc(100vh-60px)] px-4 py-8 md:px-10">
                        <div className="mx-auto w-full max-w-5xl space-y-5">
                           <div>
                              <h1 className="text-2xl font-semibold">{course.title}</h1>
                              {unlocked && section && <p className="text-muted-foreground mt-1">{section.title}</p>}
                           </div>

                           {unlocked ? (
                              <Card className="overflow-hidden p-0">
                                 <VideoPlayer
                                    source={{ type: 'video', sources: sources.length ? sources : [{ src: '', type: 'video/mp4', label: 'Unavailable' }] }}
                                    debugLabel={`public-lesson-${lesson.id}`}
                                 />
                              </Card>
                           ) : opening ? (
                              <Card className="p-6 text-center" role="status">{text('Opening video…')}</Card>
                           ) : fromQr ? (
                              <Card className="p-6 text-center" role="alert">{text('This QR code is no longer valid. Please ask for a new QR code.')}</Card>
                           ) : (
                              <Card className="mx-auto max-w-sm space-y-4 p-6">
                                 <div className="flex flex-col items-center gap-2 text-center">
                                    <Lock className="h-8 w-8" />
                                    <p className="font-medium">{text('This video is locked')}</p>
                                    <p className="text-muted-foreground text-sm">{text('Enter the access key shared with you to watch it.')}</p>
                                 </div>
                                 <form className="space-y-3" onSubmit={submit}>
                                    <div className="space-y-2">
                                       <Label htmlFor="access_key">{text('Access key')}</Label>
                                       <Input id="access_key" autoFocus value={data.access_key} onChange={(e) => setData('access_key', e.target.value)} />
                                       <InputError message={errors.access_key} />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={processing}>{text('Unlock')}</Button>
                                 </form>
                              </Card>
                           )}
                        </div>
                     </main>
                     <LandingFooter />
                  </SidebarInset>
               </div>
            </SidebarProvider>
         </Main>
      </>
   );
};

function displayLessonTitle(title: string, index: number, text: (value: string) => string): string {
   return /\.[a-z0-9]{2,6}$/i.test(title) ? `${text('Lesson')} ${index + 1}` : title;
}

export default PublicCourseLesson;
