import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';
import { Download, RefreshCw } from 'lucide-react';

const ApplicationBackup = () => {
   const { text } = useI18n();
   // Form for backup functionality
   const { post, errors, processing } = useForm({});

   const refreshForm = useForm({});
   const handleRefreshServer = () => {
      refreshForm.post(route('settings.app.refresh'));
   };

   const handleBackup = (e: React.FormEvent) => {
      e.preventDefault();

      post(route('settings.app.backup'));
   };

   return (
      <>
         <Card className="p-4 sm:p-6">
            <div className="mb-4">
               <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <Download className="h-5 w-5" />
                  {text('Application Backup')}
               </h2>
               <p className="text-muted-foreground mt-1 text-sm">{text('Create a complete backup of your application including files and database')}</p>
            </div>

            <form onSubmit={handleBackup}>
               <div className="space-y-6">
                  <div className="dark:bg-secondary dark:border-border rounded-lg border border-blue-200 bg-blue-50 p-4">
                     <div className="flex items-start">
                        <div className="flex-shrink-0">
                           <Download className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                           <h3 className="text-sm font-medium text-blue-800">{text('What will be backed up?')}</h3>
                           <div className="mt-2 text-sm text-blue-700">
                              <ul className="list-inside list-disc space-y-1">
                                 <li>
                                    <strong>{text('Source Code:')}</strong> {text('All application files and code')}
                                 </li>
                                 <li>
                                    <strong>{text('Database:')}</strong> {text('Complete MySQL database dump')}
                                 </li>
                                 <li>
                                    <strong>{text('Configuration:')}</strong> {text('Environment and config files')}
                                 </li>
                                 <li>
                                    <strong>{text('Assets:')}</strong> {text('Uploaded media and public files')}
                                 </li>
                              </ul>
                           </div>
                           <div className="mt-3 text-xs text-blue-600">
                              <p>
                                 <strong>{text('Note:')}</strong> {text('Every time refresh server before backup.')}
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {errors && Object.keys(errors).length > 0 && (
                     <div className="space-y-1">
                        {Object.entries(errors).map(([key, error]) => (
                           <InputError key={key} message={String(error)} />
                        ))}
                     </div>
                  )}

                  <div className="flex flex-col gap-3 sm:flex-row">
                     <LoadingButton
                        type="button"
                        variant="secondary"
                        onClick={handleRefreshServer}
                        loading={refreshForm.processing}
                        disabled={processing}
                     >
                        <div className="flex items-center gap-2">
                           <RefreshCw className="h-4 w-4" />
                           <span>{text('Refresh Server')}</span>
                        </div>
                     </LoadingButton>

                     <LoadingButton type="submit" loading={processing}>
                        <div className="flex items-center gap-2">
                           <Download className="h-4 w-4" />
                           <span>{processing ? text('Creating Backup...') : text('Create Backup')}</span>
                        </div>
                     </LoadingButton>
                  </div>
               </div>
            </form>
         </Card>
      </>
   );
};

export default ApplicationBackup;
