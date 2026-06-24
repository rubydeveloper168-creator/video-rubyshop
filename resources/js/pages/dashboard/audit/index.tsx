import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard/layout';
import { SharedData } from '@/types/global';
import { Link } from '@inertiajs/react';
import { Activity, Eye, MonitorPlay, UserRound } from 'lucide-react';
import { ReactNode } from 'react';

interface AuditUser extends User {
   audit_sessions_count: number;
   page_visits_count: number;
   video_events_count: number;
}

interface Props extends SharedData {
   users: Pagination<AuditUser>;
   summary: {
      sessions: number;
      page_visits: number;
      video_events: number;
   };
}

const Index = ({ users, summary }: Props) => {
   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-2xl font-semibold">Audit Timeline</h1>
            <p className="text-muted-foreground text-sm">Track logins, visited pages, session time, and video watch activity.</p>
         </div>

         <div className="grid gap-4 md:grid-cols-3">
            <Card>
               <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sessions</CardTitle>
                  <UserRound className="text-muted-foreground size-4" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-semibold">{summary.sessions}</div>
               </CardContent>
            </Card>
            <Card>
               <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Page Visits</CardTitle>
                  <Activity className="text-muted-foreground size-4" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-semibold">{summary.page_visits}</div>
               </CardContent>
            </Card>
            <Card>
               <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Video Events</CardTitle>
                  <MonitorPlay className="text-muted-foreground size-4" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-semibold">{summary.video_events}</div>
               </CardContent>
            </Card>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Sessions</TableHead>
                        <TableHead>Pages</TableHead>
                        <TableHead>Videos</TableHead>
                        <TableHead className="w-20"></TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {users.data.map((user) => (
                        <TableRow key={user.id}>
                           <TableCell className="font-medium">{user.name}</TableCell>
                           <TableCell>{user.email}</TableCell>
                           <TableCell>
                              <Badge variant="secondary">{user.audit_sessions_count}</Badge>
                           </TableCell>
                           <TableCell>
                              <Badge variant="secondary">{user.page_visits_count}</Badge>
                           </TableCell>
                           <TableCell>
                              <Badge variant="secondary">{user.video_events_count}</Badge>
                           </TableCell>
                           <TableCell>
                              <Button asChild size="sm" variant="outline">
                                 <Link href={route('audit.show', user.id)}>
                                    <Eye className="size-4" />
                                 </Link>
                              </Button>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>
      </div>
   );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;
