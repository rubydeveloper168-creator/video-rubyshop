import DashboardLayout from '@/layouts/dashboard/layout';
import { useI18n } from '@/lib/i18n';
import { SharedData } from '@/types/global';
import { Head, usePage } from '@inertiajs/react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { ReactNode } from 'react';
import ApplicationBackup from './partials/application-backup';
import ApplicationBackupList from './partials/application-backup-list';
import ApplicationUpdate from './partials/application-update';

export interface MaintenancePageProps extends SharedData {
   version: string;
   recentBackups: ApplicationBackup[];
}

const Maintenance = ({ version }: MaintenancePageProps) => {
   const { text } = useI18n();
   const page = usePage<MaintenancePageProps>();

   return (
      <>
         <Head title={text('App Maintenance')} />

         <div className="md:px-3">
            <div className="mb-6 flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
               <div>
                  <h1 className="text-2xl font-bold text-nowrap">{text('App Maintenance')}</h1>
                  <p className="text-muted-foreground text-sm md:text-base">{text('Update, backup and restore your application safely and automatically.')}</p>
               </div>

               <div>
                  <h1 className="text-2xl font-bold text-nowrap">{text('App Version')}</h1>
                  <p className="text-muted-foreground text-sm text-nowrap md:text-base">
                     {text('Current Version:')} <span className="text-primary font-bold">{version}</span>
                  </p>
               </div>
            </div>

            {/* Flash Messages */}
            {page.props.flash?.success && (
               <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="flex items-start">
                     <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                     <div className="ml-3">
                        <p className="text-sm text-green-800">{String(page.props.flash.success)}</p>
                     </div>
                  </div>
               </div>
            )}

            {page.props.flash?.error && (
               <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex items-start">
                     <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />
                     <div className="ml-3">
                        <p className="text-sm text-red-800">{String(page.props.flash.error)}</p>
                     </div>
                  </div>
               </div>
            )}

            <div className="space-y-6">
               {/* Update Section */}
               <ApplicationUpdate />

               {/* Backup Section */}
               <ApplicationBackup />

               {/* Backup History Section */}
               <ApplicationBackupList />
            </div>
         </div>
      </>
   );
};

Maintenance.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Maintenance;
