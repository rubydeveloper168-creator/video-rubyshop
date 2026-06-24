import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { SharedData } from '@/types/global';
import { Link } from '@inertiajs/react';
import { Activity, ArrowLeft, LogIn, LogOut, MonitorPlay, MousePointerClick } from 'lucide-react';
import { ReactNode } from 'react';

interface AuditSession {
   id: number;
   ip_address?: string | null;
   started_at?: string | null;
   ended_at?: string | null;
   last_activity_at?: string | null;
   active_seconds: number;
   idle_seconds: number;
}

interface PageVisit {
   id: number;
   url: string;
   title?: string | null;
   entered_at?: string | null;
   left_at?: string | null;
   duration_seconds: number;
}

interface VideoEvent {
   id: number;
   event_type: string;
   playback_position: number;
   watched_seconds: number;
   percent_watched?: number | null;
   created_at: string;
   course?: { title: string } | null;
   lesson?: { title: string } | null;
}

interface ActivityEvent {
   id: number;
   event_type: string;
   created_at: string;
}

interface Props extends SharedData {
   auditUser: User;
   sessions: AuditSession[];
   pageVisits: PageVisit[];
   videoEvents: VideoEvent[];
   activityEvents: ActivityEvent[];
}

const formatDate = (value?: string | null) => (value ? new Date(value).toLocaleString() : '-');

const formatSeconds = (seconds = 0) => {
   const minutes = Math.floor(seconds / 60);
   const remaining = seconds % 60;
   return minutes > 0 ? `${minutes}m ${remaining}s` : `${remaining}s`;
};

const Show = ({ auditUser, sessions, pageVisits, videoEvents, activityEvents }: Props) => {
   const timeline = [
      ...activityEvents.map((event) => ({
         id: `activity-${event.id}`,
         at: event.created_at,
         type: event.event_type,
         title: event.event_type === 'login' ? 'Login' : event.event_type === 'logout' ? 'Logout' : event.event_type,
         detail: '',
      })),
      ...pageVisits.map((visit) => ({
         id: `page-${visit.id}`,
         at: visit.entered_at || '',
         type: 'page',
         title: visit.title || 'Page visit',
         detail: `${visit.url} | ${formatSeconds(visit.duration_seconds)}`,
      })),
      ...videoEvents.map((event) => ({
         id: `video-${event.id}`,
         at: event.created_at,
         type: 'video',
         title: `${event.event_type} video`,
         detail: `${event.lesson?.title || 'Lesson'} | ${formatSeconds(event.watched_seconds)} watched | ${event.percent_watched ?? 0}%`,
      })),
   ].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());

   const latestSession = sessions[0];

   return (
      <div className="space-y-6">
         <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
               <h1 className="text-2xl font-semibold">{auditUser.name}</h1>
               <p className="text-muted-foreground text-sm">{auditUser.email}</p>
            </div>
            <Button asChild variant="outline">
               <Link href={route('audit.index')}>
                  <ArrowLeft className="size-4" />
                  Back
               </Link>
            </Button>
         </div>

         <div className="grid gap-4 md:grid-cols-4">
            <Card>
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Sessions</CardTitle>
               </CardHeader>
               <CardContent className="text-2xl font-semibold">{sessions.length}</CardContent>
            </Card>
            <Card>
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pages</CardTitle>
               </CardHeader>
               <CardContent className="text-2xl font-semibold">{pageVisits.length}</CardContent>
            </Card>
            <Card>
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Videos</CardTitle>
               </CardHeader>
               <CardContent className="text-2xl font-semibold">{videoEvents.length}</CardContent>
            </Card>
            <Card>
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Last Active</CardTitle>
               </CardHeader>
               <CardContent className="text-sm">{formatDate(latestSession?.last_activity_at)}</CardContent>
            </Card>
         </div>

         <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <Card>
               <CardHeader>
                  <CardTitle>Timeline</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-5">
                     {timeline.map((item) => {
                        const Icon =
                           item.type === 'login'
                              ? LogIn
                              : item.type === 'logout'
                                ? LogOut
                                : item.type === 'video'
                                  ? MonitorPlay
                                  : item.type === 'page'
                                    ? MousePointerClick
                                    : Activity;

                        return (
                           <div key={item.id} className="flex gap-4">
                              <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md">
                                 <Icon className="size-4" />
                              </div>
                              <div className="min-w-0 flex-1 border-b pb-5">
                                 <div className="flex flex-wrap items-center gap-2">
                                    <p className="font-medium">{item.title}</p>
                                    <Badge variant="outline">{item.type}</Badge>
                                 </div>
                                 {item.detail && <p className="text-muted-foreground mt-1 truncate text-sm">{item.detail}</p>}
                                 <p className="text-muted-foreground mt-1 text-xs">{formatDate(item.at)}</p>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Recent Sessions</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  {sessions.map((session) => (
                     <div key={session.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between gap-3">
                           <p className="text-sm font-medium">{session.ip_address || 'Unknown IP'}</p>
                           <Badge variant={session.ended_at ? 'secondary' : 'default'}>{session.ended_at ? 'Ended' : 'Active'}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs">Started {formatDate(session.started_at)}</p>
                        <p className="text-muted-foreground text-xs">
                           Active {formatSeconds(session.active_seconds)} | Idle {formatSeconds(session.idle_seconds)}
                        </p>
                     </div>
                  ))}
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

Show.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Show;
