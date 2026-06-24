import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import VerifiedBadge from '@/components/verified-badge';
import { useInitials } from '@/hooks/use-initials';
import DashboardLayout from '@/layouts/dashboard/layout';
import { SharedData } from '@/types/global';
import { Link, router } from '@inertiajs/react';
import {
   Activity,
   ArrowLeft,
   BadgeCheck,
   Clock,
   FileText,
   Laptop,
   LogIn,
   LogOut,
   Monitor,
   MonitorPlay,
   MousePointerClick,
   ShieldX,
   Smartphone,
   Tablet,
} from 'lucide-react';
import { ReactNode, useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface AuditSession {
   id: number;
   ip_address?: string | null;
   started_at?: string | null;
   ended_at?: string | null;
   last_activity_at?: string | null;
   active_seconds: number;
   idle_seconds: number;
   browser?: string;
   os?: string;
   device_type?: 'desktop' | 'mobile' | 'tablet';
   is_online?: boolean;
}

interface PageVisit {
   id: number;
   url: string;
   title?: string | null;
   referrer?: string | null;
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

interface DailyActivity {
   date: string;
   page_minutes: number;
   video_minutes: number;
}

interface TopPage {
   url: string;
   title?: string | null;
   visits: number;
   total_seconds: number;
}

interface TopVideo {
   lesson_id: number;
   total_seconds: number;
   max_percent?: number | null;
   lesson?: { title: string } | null;
}

interface Totals {
   sessions: number;
   page_visits: number;
   video_events: number;
   active_seconds: number;
   idle_seconds: number;
}

interface Props extends SharedData {
   auditUser: User;
   sessions: AuditSession[];
   pageVisits: PageVisit[];
   videoEvents: VideoEvent[];
   activityEvents: ActivityEvent[];
   dailyActivity: DailyActivity[];
   topPages: TopPage[];
   topVideos: TopVideo[];
   totals: Totals;
}

const formatDate = (value?: string | null) => (value ? new Date(value).toLocaleString() : '-');

const formatSeconds = (seconds = 0) => {
   const hours = Math.floor(seconds / 3600);
   const minutes = Math.floor((seconds % 3600) / 60);
   const remaining = seconds % 60;

   if (hours > 0) return `${hours}h ${minutes}m`;
   if (minutes > 0) return `${minutes}m ${remaining}s`;
   return `${remaining}s`;
};

const timeAgo = (value?: string | null) => {
   if (!value) return '-';

   const diffMs = Date.now() - new Date(value).getTime();
   const diffSeconds = Math.max(0, Math.floor(diffMs / 1000));

   if (diffSeconds < 60) return 'just now';
   if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
   if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
   return `${Math.floor(diffSeconds / 86400)}d ago`;
};

const dayLabel = (value: string) => {
   const date = new Date(value);
   const today = new Date();
   const yesterday = new Date();
   yesterday.setDate(today.getDate() - 1);

   if (date.toDateString() === today.toDateString()) return 'Today';
   if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

   return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
};

const DeviceIcon = ({ deviceType }: { deviceType?: string }) => {
   if (deviceType === 'mobile') return <Smartphone className="size-4" />;
   if (deviceType === 'tablet') return <Tablet className="size-4" />;
   return <Monitor className="size-4" />;
};

const Show = ({ auditUser, sessions, pageVisits, videoEvents, activityEvents, dailyActivity, topPages, topVideos, totals }: Props) => {
   const getInitials = useInitials();

   const isOnline = sessions.some((session) => session.is_online);

   const timeline = useMemo(
      () =>
         [
            ...activityEvents.map((event) => ({
               id: `activity-${event.id}`,
               at: event.created_at,
               type: event.event_type === 'login' || event.event_type === 'logout' ? 'login' : 'activity',
               title: event.event_type === 'login' ? 'Logged in' : event.event_type === 'logout' ? 'Logged out' : event.event_type,
               detail: '',
            })),
            ...pageVisits.map((visit) => ({
               id: `page-${visit.id}`,
               at: visit.entered_at || '',
               type: 'page',
               title: visit.title || 'Page visit',
               detail: `${visit.url} · ${formatSeconds(visit.duration_seconds)}`,
            })),
            ...videoEvents.map((event) => ({
               id: `video-${event.id}`,
               at: event.created_at,
               type: 'video',
               title: `${event.event_type} video`,
               detail: `${event.lesson?.title || 'Lesson'} · ${formatSeconds(event.watched_seconds)} watched · ${event.percent_watched ?? 0}%`,
            })),
         ].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()),
      [activityEvents, pageVisits, videoEvents],
   );

   const groupByDay = (items: typeof timeline) => {
      const groups: { day: string; items: typeof timeline }[] = [];

      items.forEach((item) => {
         if (!item.at) return;
         const day = new Date(item.at).toDateString();
         const group = groups.find((g) => g.day === day);

         if (group) {
            group.items.push(item);
         } else {
            groups.push({ day, items: [item] });
         }
      });

      return groups;
   };

   const groupedAll = useMemo(() => groupByDay(timeline), [timeline]);

   const sortedSessions = useMemo(
      () => [...sessions].sort((a, b) => new Date(b.started_at || 0).getTime() - new Date(a.started_at || 0).getTime()),
      [sessions],
   );

   return (
      <div className="space-y-6">
         <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
               <Avatar className="size-12">
                  <AvatarImage src={auditUser.photo || ''} alt={auditUser.name} className="object-cover" />
                  <AvatarFallback className="bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                     {getInitials(auditUser.name)}
                  </AvatarFallback>
               </Avatar>
               <div>
                  <div className="flex items-center gap-2">
                     <h1 className="text-2xl font-semibold">{auditUser.name}</h1>
                     {auditUser.is_verified && <VerifiedBadge size={20} />}
                     <Badge variant={isOnline ? 'default' : 'secondary'}>{isOnline ? 'Online' : 'Offline'}</Badge>
                     <Badge variant="outline" className="capitalize">
                        {auditUser.role}
                     </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{auditUser.email}</p>
                  {auditUser.is_verified && auditUser.verified_at && (
                     <p className="text-muted-foreground text-xs">Verified {formatDate(auditUser.verified_at)}</p>
                  )}
               </div>
            </div>
            <div className="flex items-center gap-2">
               <Button
                  variant={auditUser.is_verified ? 'outline' : 'default'}
                  onClick={() => router.post(route('audit.verify', auditUser.id))}
               >
                  {auditUser.is_verified ? (
                     <>
                        <ShieldX className="size-4" />
                        Unverify User
                     </>
                  ) : (
                     <>
                        <BadgeCheck className="size-4" />
                        Verify User
                     </>
                  )}
               </Button>
               <Button asChild variant="outline">
                  <Link href={route('audit.index')}>
                     <ArrowLeft className="size-4" />
                     Back
                  </Link>
               </Button>
            </div>
         </div>

         <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            <Card>
               <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Time</CardTitle>
                  <Clock className="text-muted-foreground size-4" />
               </CardHeader>
               <CardContent className="text-2xl font-semibold">{formatSeconds(totals.active_seconds)}</CardContent>
            </Card>
            <Card>
               <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Idle Time</CardTitle>
                  <Activity className="text-muted-foreground size-4" />
               </CardHeader>
               <CardContent className="text-2xl font-semibold">{formatSeconds(totals.idle_seconds)}</CardContent>
            </Card>
            <Card>
               <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sessions</CardTitle>
                  <Laptop className="text-muted-foreground size-4" />
               </CardHeader>
               <CardContent className="text-2xl font-semibold">{totals.sessions}</CardContent>
            </Card>
            <Card>
               <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pages Visited</CardTitle>
                  <FileText className="text-muted-foreground size-4" />
               </CardHeader>
               <CardContent className="text-2xl font-semibold">{totals.page_visits}</CardContent>
            </Card>
            <Card>
               <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Video Events</CardTitle>
                  <MonitorPlay className="text-muted-foreground size-4" />
               </CardHeader>
               <CardContent className="text-2xl font-semibold">{totals.video_events}</CardContent>
            </Card>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>Activity Over the Last 14 Days</CardTitle>
            </CardHeader>
            <CardContent>
               <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={dailyActivity} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
                     <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                     />
                     <YAxis axisLine={false} tickLine={false} tickMargin={0} unit="m" />
                     <Tooltip
                        labelFormatter={(value) => new Date(value).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                        formatter={(value: number, name) => [`${value}m`, name === 'page_minutes' ? 'Page time' : 'Video time']}
                     />
                     <Area
                        type="monotone"
                        dataKey="page_minutes"
                        stackId="1"
                        fill="var(--color-secondary-dark)"
                        stroke="var(--color-secondary-foreground)"
                        fillOpacity={0.4}
                        name="page_minutes"
                     />
                     <Area
                        type="monotone"
                        dataKey="video_minutes"
                        stackId="1"
                        fill="var(--color-primary)"
                        stroke="var(--color-primary)"
                        fillOpacity={0.4}
                        name="video_minutes"
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>

         <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <Card>
               <Tabs defaultValue="all">
                  <CardHeader className="flex-row items-center justify-between space-y-0">
                     <CardTitle>Timeline</CardTitle>
                     <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="login">Logins</TabsTrigger>
                        <TabsTrigger value="page">Pages</TabsTrigger>
                        <TabsTrigger value="video">Videos</TabsTrigger>
                     </TabsList>
                  </CardHeader>
                  <CardContent>
                     <TabsContent value="all">
                        {groupedAll.length === 0 && <p className="text-muted-foreground py-10 text-center text-sm">No activity recorded yet.</p>}

                        <div className="space-y-6">
                           {groupedAll.map((group) => (
                              <div key={group.day}>
                                 <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wide uppercase">
                                    {dayLabel(group.items[0].at)}
                                 </p>
                                 <div className="space-y-5">
                                    {group.items.map((item) => {
                                       const Icon =
                                          item.type === 'login'
                                             ? item.title === 'Logged in'
                                                ? LogIn
                                                : LogOut
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
                                                <p className="text-muted-foreground mt-1 text-xs" title={formatDate(item.at)}>
                                                   {timeAgo(item.at)}
                                                </p>
                                             </div>
                                          </div>
                                       );
                                    })}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </TabsContent>

                     <TabsContent value="login">
                        {sortedSessions.length === 0 && <p className="text-muted-foreground py-10 text-center text-sm">No login sessions yet.</p>}

                        <div className="space-y-4">
                           {sortedSessions.map((session) => {
                              const sessionRatio =
                                 session.active_seconds + session.idle_seconds > 0
                                    ? Math.round((session.active_seconds / (session.active_seconds + session.idle_seconds)) * 100)
                                    : 0;

                              return (
                                 <div key={session.id} className="flex gap-4 border-b pb-5 last:border-b-0 last:pb-0">
                                    <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md">
                                       <DeviceIcon deviceType={session.device_type} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                       <div className="flex flex-wrap items-center gap-2">
                                          <p className="font-medium">
                                             {session.browser} on {session.os}
                                          </p>
                                          <Badge variant={session.is_online ? 'default' : 'secondary'}>
                                             {session.is_online ? 'Active' : 'Ended'}
                                          </Badge>
                                       </div>
                                       <p className="text-muted-foreground mt-1 text-sm">{session.ip_address || 'Unknown IP'}</p>
                                       <div className="text-muted-foreground mt-1 grid gap-1 text-xs sm:grid-cols-2">
                                          <span>Login: {formatDate(session.started_at)}</span>
                                          <span>{session.ended_at ? `Logout: ${formatDate(session.ended_at)}` : `Last seen: ${timeAgo(session.last_activity_at)}`}</span>
                                       </div>
                                       <div className="mt-2 max-w-sm space-y-1">
                                          <Progress value={sessionRatio} />
                                          <p className="text-muted-foreground text-xs">
                                             Active {formatSeconds(session.active_seconds)} · Idle {formatSeconds(session.idle_seconds)} ·{' '}
                                             {sessionRatio}% engaged
                                          </p>
                                       </div>
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </TabsContent>

                     <TabsContent value="page">
                        {pageVisits.length === 0 ? (
                           <p className="text-muted-foreground py-10 text-center text-sm">No page visits yet.</p>
                        ) : (
                           <Table>
                              <TableHeader>
                                 <TableRow>
                                    <TableHead>Page</TableHead>
                                    <TableHead>Entered</TableHead>
                                    <TableHead>Left</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Referrer</TableHead>
                                 </TableRow>
                              </TableHeader>
                              <TableBody>
                                 {pageVisits.map((visit) => (
                                    <TableRow key={visit.id}>
                                       <TableCell className="max-w-[260px]">
                                          <p className="truncate font-medium">{visit.title || 'Page visit'}</p>
                                          <p className="text-muted-foreground truncate text-xs">{visit.url}</p>
                                       </TableCell>
                                       <TableCell className="text-xs whitespace-nowrap">{formatDate(visit.entered_at)}</TableCell>
                                       <TableCell className="text-xs whitespace-nowrap">{formatDate(visit.left_at)}</TableCell>
                                       <TableCell className="text-xs whitespace-nowrap">{formatSeconds(visit.duration_seconds)}</TableCell>
                                       <TableCell className="max-w-[180px] truncate text-xs">{visit.referrer || '-'}</TableCell>
                                    </TableRow>
                                 ))}
                              </TableBody>
                           </Table>
                        )}
                     </TabsContent>

                     <TabsContent value="video">
                        {videoEvents.length === 0 ? (
                           <p className="text-muted-foreground py-10 text-center text-sm">No video activity yet.</p>
                        ) : (
                           <Table>
                              <TableHeader>
                                 <TableRow>
                                    <TableHead>Course / Lesson</TableHead>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Watched</TableHead>
                                    <TableHead>%</TableHead>
                                    <TableHead>When</TableHead>
                                 </TableRow>
                              </TableHeader>
                              <TableBody>
                                 {videoEvents.map((event) => (
                                    <TableRow key={event.id}>
                                       <TableCell className="max-w-[220px]">
                                          <p className="truncate font-medium">{event.lesson?.title || 'Lesson'}</p>
                                          <p className="text-muted-foreground truncate text-xs">{event.course?.title || '-'}</p>
                                       </TableCell>
                                       <TableCell>
                                          <Badge variant="outline" className="capitalize">
                                             {event.event_type}
                                          </Badge>
                                       </TableCell>
                                       <TableCell className="text-xs whitespace-nowrap">{formatSeconds(event.playback_position)}</TableCell>
                                       <TableCell className="text-xs whitespace-nowrap">{formatSeconds(event.watched_seconds)}</TableCell>
                                       <TableCell className="text-xs whitespace-nowrap">{event.percent_watched ?? 0}%</TableCell>
                                       <TableCell className="text-xs whitespace-nowrap">{timeAgo(event.created_at)}</TableCell>
                                    </TableRow>
                                 ))}
                              </TableBody>
                           </Table>
                        )}
                     </TabsContent>
                  </CardContent>
               </Tabs>
            </Card>

            <div className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Sessions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {sessions.length === 0 && <p className="text-muted-foreground text-sm">No sessions recorded yet.</p>}
                     {sessions.map((session) => {
                        const sessionRatio =
                           session.active_seconds + session.idle_seconds > 0
                              ? Math.round((session.active_seconds / (session.active_seconds + session.idle_seconds)) * 100)
                              : 0;

                        return (
                           <div key={session.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                              <div className="flex items-center justify-between gap-3">
                                 <div className="flex items-center gap-2">
                                    <DeviceIcon deviceType={session.device_type} />
                                    <p className="text-sm font-medium">
                                       {session.browser} on {session.os}
                                    </p>
                                 </div>
                                 <Badge variant={session.is_online ? 'default' : 'secondary'}>{session.is_online ? 'Active' : 'Ended'}</Badge>
                              </div>
                              <p className="text-muted-foreground mt-1 text-xs">{session.ip_address || 'Unknown IP'}</p>
                              <p className="text-muted-foreground text-xs">Started {formatDate(session.started_at)}</p>
                              <div className="mt-2 space-y-1">
                                 <Progress value={sessionRatio} />
                                 <p className="text-muted-foreground text-xs">
                                    Active {formatSeconds(session.active_seconds)} · Idle {formatSeconds(session.idle_seconds)}
                                 </p>
                              </div>
                           </div>
                        );
                     })}
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle>Top Pages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {topPages.length === 0 && <p className="text-muted-foreground text-sm">No page visits yet.</p>}
                     {topPages.map((page) => (
                        <div key={page.url} className="flex items-center justify-between gap-3 text-sm">
                           <div className="min-w-0">
                              <p className="truncate font-medium">{page.title || page.url}</p>
                              <p className="text-muted-foreground truncate text-xs">{page.url}</p>
                           </div>
                           <div className="text-muted-foreground shrink-0 text-right text-xs">
                              <p>{page.visits} visits</p>
                              <p>{formatSeconds(page.total_seconds)}</p>
                           </div>
                        </div>
                     ))}
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle>Most Watched Videos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {topVideos.length === 0 && <p className="text-muted-foreground text-sm">No video activity yet.</p>}
                     {topVideos.map((video) => (
                        <div key={video.lesson_id} className="flex items-center justify-between gap-3 text-sm">
                           <p className="min-w-0 truncate font-medium">{video.lesson?.title || 'Lesson'}</p>
                           <div className="text-muted-foreground shrink-0 text-right text-xs">
                              <p>{formatSeconds(video.total_seconds)}</p>
                              <p>{video.max_percent ?? 0}% watched</p>
                           </div>
                        </div>
                     ))}
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
};

Show.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Show;
