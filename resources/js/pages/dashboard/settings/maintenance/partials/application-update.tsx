import ChunkedUploaderInput from '@/components/chunked-uploader-input';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';
import { AlertTriangle, CheckCircle, RefreshCw, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';

const ApplicationUpdate = () => {
   const { text } = useI18n();
   const [open, setOpen] = useState(false);
   const [isSubmit, setIsSubmit] = useState(false);
   const [isFileSelected, setIsFileSelected] = useState(false);
   const [selectedFileName, setSelectedFileName] = useState<string>('');

   const { data, setData, post, errors, processing, reset } = useForm({
      update_file_url: '',
   });

   const refreshForm = useForm({});
   const handleRefreshServer = () => {
      refreshForm.post(route('settings.app.refresh'));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (isFileSelected) {
         setIsSubmit(true);
         return;
      }
   };

   const onResetHandler = () => {
      setIsSubmit(false);
      setIsFileSelected(false);
      setSelectedFileName('');
      reset('update_file_url');
   };

   // Auto-submit form when upload completes and file URL is set
   useEffect(() => {
      if (data.update_file_url && isSubmit) {
         post(route('settings.app.update'), {
            onSuccess: () => {
               setOpen(false);
               onResetHandler();
            },
            onError: () => {
               onResetHandler();
            },
         });
      }
   }, [data.update_file_url]);

   const handleOpenChange = (open: boolean) => {
      if (isSubmit) {
         setOpen(true);
      } else {
         setOpen(open);
         if (!open) {
            onResetHandler();
         }
      }
   };

   return (
      <>
         {/* Confirmation Dialog */}
         <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
               {processing && (
                  <div className="bg-background/80 absolute inset-0 z-50 flex items-center justify-center rounded-lg backdrop-blur-sm">
                     <div className="text-center">
                        <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
                        <p className="text-sm font-medium">{text('Updating application...')}</p>
                        <p className="text-muted-foreground mt-1 text-xs">{text('Please do not close this window')}</p>
                     </div>
                  </div>
               )}

               <ScrollArea className="max-h-[90vh]">
                  <DialogHeader>
                     <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        {text('Confirm Application Update')}
                     </DialogTitle>
                     <DialogDescription className="space-y-4 text-left">
                        <p>
                           {text('Are you sure you want to update the application with')} <strong>"{selectedFileName}"</strong>?
                        </p>

                        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                           <p className="mb-2 font-medium text-orange-800">{text('This update will:')}</p>
                           <ul className="list-inside list-disc space-y-1 text-sm text-orange-700">
                              <li>{text('Put the site in maintenance mode')}</li>
                              <li>{text('Replace all application files')}</li>
                              <li>{text('Run database migrations')}</li>
                              <li>{text('Process may take several minutes')}</li>
                           </ul>
                        </div>

                        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                           <p className="mb-1 font-medium text-red-800">⚠️ {text('Important:')}</p>
                           <p className="text-sm text-red-700">{text('Make sure you have created a backup first! This action cannot be undone.')}</p>
                        </div>
                     </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                     <div>
                        <Label>{text('Select File (.zip only)')}</Label>

                        <ChunkedUploaderInput
                           isSubmit={isSubmit}
                           storage="local"
                           filetype="zip"
                           delayUpload={false}
                           onFileSelected={(file) => {
                              setIsFileSelected(true);
                              setSelectedFileName(file.name);
                           }}
                           onFileUploaded={(fileData) => {
                              setData('update_file_url', fileData.file_url);
                           }}
                           onError={(errors) => {
                              onResetHandler();
                           }}
                           onCancelUpload={() => {
                              onResetHandler();
                           }}
                        />

                        <InputError message={String(errors.update_file_url || '')} />
                     </div>

                     {isFileSelected && selectedFileName && (
                        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                           <div className="flex items-start">
                              <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                              <div className="ml-2">
                                 <p className="text-sm text-green-800">
                                    <strong>{text('Selected file:')}</strong> {selectedFileName}
                                 </p>
                                 <p className="mt-1 text-xs text-blue-600">{text('File selected successfully. Click "Update Application" to proceed.')}</p>
                              </div>
                           </div>
                        </div>
                     )}

                     <DialogFooter className="w-full justify-between space-x-2 pt-8">
                        <DialogClose asChild>
                           <Button type="button" variant="outline">
                              {text('Close')}
                           </Button>
                        </DialogClose>

                        <LoadingButton
                           type={!isFileSelected ? 'button' : 'submit'}
                           disabled={processing || isSubmit || !isFileSelected}
                           loading={processing || isSubmit}
                        >
                           {isSubmit ? text('Uploading...') : text('Update Application')}
                        </LoadingButton>
                     </DialogFooter>
                  </form>
               </ScrollArea>
            </DialogContent>
         </Dialog>

         <Card className="border-2">
            <CardHeader className="p-4 sm:p-6">
               <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <Upload className="text-warning h-5 w-5" />
                  {text('Application Update')}
               </h2>
               <p className="text-muted-foreground mt-1 text-sm">{text('Upload and install the latest version of your application')}</p>
            </CardHeader>

            <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
               <div className="dark:bg-secondary dark:border-border rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start">
                     <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                     </div>
                     <div className="ml-3">
                        <h3 className="text-sm font-medium text-amber-800">{text('Important Update Guidelines')}</h3>
                        <div className="mt-2 text-sm text-amber-700">
                           <ul className="list-inside list-disc space-y-1">
                              <li>
                                 <strong>{text('Refresh Server:')}</strong> {text('Every time refresh server before updating')}
                              </li>
                              <li>
                                 <strong>{text('Backup First:')}</strong> {text('Always create a backup before updating')}
                              </li>
                              <li>
                                 <strong>{text('File Format:')}</strong> {text('Upload must be a valid ZIP file')}
                              </li>
                              <li>
                                 <strong>{text('Maintenance Mode:')}</strong> {text('Site will be temporarily unavailable during update')}
                              </li>
                              <li>
                                 <strong>{text('Migrations:')}</strong> {text('Database migrations will be automatically applied')}
                              </li>
                              <li>
                                 <strong>{text('Downtime:')}</strong> {text('Update process may take several minutes')}
                              </li>
                              <li>
                                 <strong>{text('Browser:')}</strong> {text('Do not refresh or close browser during update')}
                              </li>
                              <li>
                                 <strong>{text('Compatibility:')}</strong> {text('Ensure the update is compatible with your system')}
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col gap-3 sm:flex-row">
                  <LoadingButton
                     type="button"
                     variant="secondary"
                     onClick={handleRefreshServer}
                     loading={refreshForm.processing}
                     disabled={processing || isSubmit}
                  >
                     <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4" />
                        <span>{text('Refresh Server')}</span>
                     </div>
                  </LoadingButton>

                  <Button type="button" onClick={() => setOpen(true)}>
                     <Upload className="h-4 w-4" />
                     <span>{isSubmit ? text('Uploading...') : processing ? text('Updating Application...') : text('Update Application')}</span>
                  </Button>
               </div>
            </CardContent>
         </Card>
      </>
   );
};

export default ApplicationUpdate;
