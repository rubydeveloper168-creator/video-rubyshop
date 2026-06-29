import DeleteModal from '@/components/inertia/delete-modal';
import TableFilter from '@/components/table/table-filter';
import TableFooter from '@/components/table/table-footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { useI18n } from '@/lib/i18n';
import { SharedData } from '@/types/global';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
   Briefcase,
   BriefcaseBusiness,
   Building2,
   Calendar,
   Clock,
   Edit,
   Eye,
   MapPin,
   PauseCircle,
   PlayCircle,
   Plus,
   Trash2,
   TrendingUp,
} from 'lucide-react';
import { ReactNode } from 'react';

interface JobCircularsPageProps extends SharedData {
   jobCirculars: Pagination<JobCircular>;
   jobTypes: Record<string, string>;
   workTypes: Record<string, string>;
   experienceLevels: Record<string, string>;
   statuses: Record<string, string>;
   statistics: {
      total: number;
      active: number;
      draft: number;
      closed: number;
      expired: number;
   };
}

const JobCircularsIndex = () => {
   const { locale, text } = useI18n();
   const { props } = usePage<JobCircularsPageProps>();
   const { jobCirculars, statistics, jobTypes, workTypes, experienceLevels, statuses } = props;

   const getStatusBadge = (status: string) => {
      const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
         draft: 'outline',
         active: 'default',
         paused: 'secondary',
         closed: 'destructive',
         expired: 'destructive',
      };

      return <Badge variant={variants[status] || 'outline'}>{statuses[status] || status}</Badge>;
   };

   const handleToggleStatus = (jobId: number) => {
      router.put(
         route('job-circulars.toggle-status', jobId),
         {},
         {
            preserveState: true,
            preserveScroll: true,
         },
      );
   };

   return (
      <>
         <Head title={text('Job Circulars')} />

         <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
               <h1 className="text-xl font-semibold">{text('Job Circulars')}</h1>

               <Button asChild>
                  <Link href={route('job-circulars.create')}>
                     <Plus className="mr-2 h-4 w-4" />
                     {text('Create Job Circular')}
                  </Link>
               </Button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">{text('Total Jobs')}</CardTitle>
                     <Briefcase className="text-muted-foreground h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{statistics.total}</div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">{text('Active')}</CardTitle>
                     <PlayCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold text-green-600">{statistics.active}</div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">{text('Draft')}</CardTitle>
                     <Edit className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold text-yellow-600">{statistics.draft}</div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">{text('Closed')}</CardTitle>
                     <Clock className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold text-orange-600">{statistics.closed}</div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">{text('Expired')}</CardTitle>
                     <Clock className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold text-red-600">{statistics.expired}</div>
                  </CardContent>
               </Card>
            </div>

            {/* Job Circulars List */}
            <Card>
               <TableFilter
                  data={jobCirculars}
                  title={text('Job Circulars')}
                  globalSearch={true}
                  tablePageSizes={[10, 15, 20, 25]}
                  routeName="job-circulars.index"
                  // Icon={<Users className="h-6 w-6 text-primary" />}
                  // exportPath={route('users.export')}
               />

               <CardContent className="p-4 sm:p-6">
                  {jobCirculars.data.length > 0 ? (
                     <div className="space-y-4">
                        {jobCirculars.data.map((job) => (
                           <div key={job.id} className="hover:bg-muted/50 rounded-lg border p-4 transition-colors">
                              <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:gap-4">
                                 <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-2">
                                       <h3 className="text-lg font-semibold">{job.title}</h3>
                                       {getStatusBadge(job.status)}
                                    </div>

                                    <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                                       <div className="flex items-center gap-1">
                                          <MapPin className="h-4 w-4" />
                                          {job.location}
                                       </div>
                                       <div className="flex items-center gap-1">
                                          <Briefcase className="h-4 w-4" />
                                          {jobTypes[job.job_type]}
                                       </div>
                                       <div className="flex items-center gap-1">
                                          <Building2 className="h-4 w-4" />
                                          {workTypes[job.work_type]}
                                       </div>
                                       <div className="flex items-center gap-1">
                                          <TrendingUp className="h-4 w-4" />
                                          {experienceLevels[job.experience_level]}
                                       </div>
                                       <div className="flex items-center gap-1">
                                          <BriefcaseBusiness className="h-4 w-4" />
                                          {job.positions_available} {job.positions_available !== 1 ? text('Positions') : text('Position')}
                                       </div>
                                       <div className="flex items-center gap-1">
                                          <Calendar className="h-4 w-4" />
                                          {new Date(job.application_deadline).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
                                             year: 'numeric',
                                             month: 'long',
                                             day: 'numeric',
                                          })}
                                       </div>
                                    </div>
                                 </div>

                                 <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                       <Link href={route('job-circulars.show', job.id)}>
                                          <Eye className="h-4 w-4" />
                                       </Link>
                                    </Button>

                                    <Button variant="outline" size="sm" asChild>
                                       <Link href={route('job-circulars.edit', job.id)}>
                                          <Edit className="h-4 w-4" />
                                       </Link>
                                    </Button>

                                    <Button variant="outline" size="sm" onClick={() => handleToggleStatus(Number(job.id))}>
                                       {job.status === 'active' ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                                    </Button>

                                    <DeleteModal
                                       routePath={route('job-circulars.destroy', job.id)}
                                       actionComponent={
                                          <Button variant="outline" size="sm">
                                             <Trash2 className="text-destructive h-4 w-4" />
                                          </Button>
                                       }
                                    />
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <div className="py-12 text-center">
                        <Briefcase className="text-muted-foreground mx-auto h-12 w-12" />
                        <h3 className="mt-4 text-lg font-semibold">{text('No job circulars found')}</h3>
                        <p className="text-muted-foreground mt-2">{text('Get started by creating your first job circular')}</p>

                        <Button className="mt-4" asChild>
                           <Link href={route('job-circulars.create')}>
                              <Plus className="mr-2 h-4 w-4" />
                              {text('Create Job Circular')}
                           </Link>
                        </Button>
                     </div>
                  )}
               </CardContent>

               <TableFooter className="p-5 sm:p-7" routeName="job-circulars.index" paginationInfo={jobCirculars} />
            </Card>
         </div>
      </>
   );
};

JobCircularsIndex.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default JobCircularsIndex;
