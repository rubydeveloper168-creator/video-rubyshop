import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useI18n } from '@/lib/i18n';
import { router, useForm, usePage } from '@inertiajs/react';
import { AlertTriangle, Calendar, Download, HardDrive, RefreshCw, RotateCcw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { MaintenancePageProps } from '..';

interface Backup {
   id: number | string;
   backup_name: string;
   source_code_zip: string;
   database_zip: string;
   source_code_size: number;
   database_size: number;
   status: string;
   notes: string | null;
   created_at: string;
   updated_at: string;
}

const ApplicationBackupList = () => {
   const { locale, text } = useI18n();
   const page = usePage<MaintenancePageProps>();
   const { recentBackups } = page.props;

   // Dialog state management
   const [isProcessing, setIsProcessing] = useState(false);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [showRestoreDialog, setShowRestoreDialog] = useState(false);
   const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);

   const refreshForm = useForm({});
   const handleRefreshServer = () => {
      refreshForm.post(route('settings.app.refresh'));
   };

   const handleDeleteClick = (backup: Backup) => {
      setSelectedBackup(backup);
      setShowDeleteDialog(true);
   };

   const handleRestoreClick = (backup: Backup) => {
      setSelectedBackup(backup);
      setShowRestoreDialog(true);
   };

   const handleConfirmDelete = () => {
      if (!selectedBackup) return;

      setIsProcessing(true);
      router.delete(route('settings.app.backup.delete', selectedBackup.id), {
         onSuccess: () => {
            setShowDeleteDialog(false);
            setSelectedBackup(null);
            setIsProcessing(false);
         },
         onError: () => {
            setIsProcessing(false);
         },
      });
   };

   const handleConfirmRestore = () => {
      if (!selectedBackup) return;

      setIsProcessing(true);
      router.post(
         route('settings.app.backup.restore', selectedBackup.id),
         {},
         {
            onSuccess: () => {
               setShowRestoreDialog(false);
               setSelectedBackup(null);
               setIsProcessing(false);
            },
            onError: () => {
               setIsProcessing(false);
            },
         },
      );
   };

   const handleCancelDialog = () => {
      if (!isProcessing) {
         setShowDeleteDialog(false);
         setShowRestoreDialog(false);
         setSelectedBackup(null);
      }
   };

   const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
   };

   const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleString(locale === 'th' ? 'th-TH' : 'en-US');
   };

   return (
      <>
         {/* Delete Confirmation Dialog */}
         <Dialog
            open={showDeleteDialog}
            onOpenChange={(open) => {
               if (!isProcessing) {
                  setShowDeleteDialog(open);
                  if (!open) setSelectedBackup(null);
               }
            }}
         >
            <DialogContent
               className="sm:max-w-[500px]"
               onInteractOutside={(e) => {
                  if (isProcessing) e.preventDefault();
               }}
               onEscapeKeyDown={(e) => {
                  if (isProcessing) e.preventDefault();
               }}
            >
               {isProcessing && (
                  <div className="bg-background/80 absolute inset-0 z-10 flex items-center justify-center rounded-lg backdrop-blur-sm">
                     <div className="text-center">
                        <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
                        <p className="text-sm font-medium">{text('Deleting backup...')}</p>
                        <p className="text-muted-foreground mt-1 text-xs">{text('Please wait')}</p>
                     </div>
                  </div>
               )}

               <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                     <Trash2 className="h-5 w-5 text-red-600" />
                     {text('Delete Backup')}
                  </DialogTitle>
                  <DialogDescription className="space-y-4 text-left">
                     <p>
                        {text('Are you sure you want to delete the backup')} <strong>"{selectedBackup?.backup_name}"</strong>?
                     </p>

                     <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <p className="mb-2 font-medium text-red-800">⚠️ {text('This action will:')}</p>
                        <ul className="list-inside list-disc space-y-1 text-sm text-red-700">
                           <li>{text('Permanently delete the backup files from storage')}</li>
                           <li>{text('Remove the backup record from the database')}</li>
                           <li>{text('Cannot be undone or recovered')}</li>
                        </ul>
                     </div>

                     <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                        <p className="text-sm text-amber-700">
                           <strong>{text('Backup Details:')}</strong>
                           <br />
                           {text('Source Code:')} {selectedBackup ? formatFileSize(selectedBackup.source_code_size) : ''}
                           <br />
                           {text('Database:')} {selectedBackup ? formatFileSize(selectedBackup.database_size) : ''}
                           <br />
                           {text('Created:')} {selectedBackup ? formatDate(selectedBackup.created_at) : ''}
                        </p>
                     </div>
                  </DialogDescription>
               </DialogHeader>
               <DialogFooter className="flex-col gap-2 sm:flex-row">
                  <Button variant="outline" onClick={handleCancelDialog} disabled={isProcessing} className="w-full sm:w-auto">
                     {text('Cancel')}
                  </Button>
                  <Button variant="destructive" onClick={handleConfirmDelete} disabled={isProcessing} className="w-full sm:w-auto">
                     {isProcessing ? (
                        <>
                           <span className="mr-2 animate-spin">⏳</span>
                           {text('Deleting...')}
                        </>
                     ) : (
                        <>
                           <Trash2 className="mr-2 h-4 w-4" />
                           {text('Delete Backup')}
                        </>
                     )}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>

         {/* Restore Confirmation Dialog */}
         <Dialog
            open={showRestoreDialog}
            onOpenChange={(open) => {
               if (!isProcessing) {
                  setShowRestoreDialog(open);
                  if (!open) setSelectedBackup(null);
               }
            }}
         >
            <DialogContent
               className="sm:max-w-[500px]"
               onInteractOutside={(e) => {
                  if (isProcessing) e.preventDefault();
               }}
               onEscapeKeyDown={(e) => {
                  if (isProcessing) e.preventDefault();
               }}
            >
               {isProcessing && (
                  <div className="bg-background/80 absolute inset-0 z-10 flex items-center justify-center rounded-lg backdrop-blur-sm">
                     <div className="text-center">
                        <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
                        <p className="text-sm font-medium">{text('Restoring backup...')}</p>
                        <p className="text-muted-foreground mt-1 text-xs">{text('Please do not close this window')}</p>
                     </div>
                  </div>
               )}

               <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                     <RotateCcw className="h-5 w-5 text-blue-600" />
                     {text('Restore Backup')}
                  </DialogTitle>
                  <DialogDescription className="space-y-4 text-left">
                     <p>
                        {text('Are you sure you want to restore the backup')} <strong>"{selectedBackup?.backup_name}"</strong>?
                     </p>

                     <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                        <p className="mb-2 font-medium text-orange-800">{text('This restore will:')}</p>
                        <ul className="list-inside list-disc space-y-1 text-sm text-orange-700">
                           <li>{text('Put the site in maintenance mode')}</li>
                           <li>{text('Overwrite all current application files')}</li>
                           <li>{text('Replace the entire database with backup data')}</li>
                           <li>{text('Process may take several minutes')}</li>
                        </ul>
                     </div>

                     <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <p className="mb-1 font-medium text-red-800">⚠️ {text('Critical Warning:')}</p>
                        <p className="text-sm text-red-700">
                           {text('All current data and files will be lost! Make sure you have a recent backup of your current state if needed. This action cannot be undone.')}
                        </p>
                     </div>

                     <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <p className="text-sm text-blue-700">
                           <strong>{text('Backup Details:')}</strong>
                           <br />
                           {text('Created:')} {selectedBackup ? formatDate(selectedBackup.created_at) : ''}
                           <br />
                           {text('Source Code:')} {selectedBackup ? formatFileSize(selectedBackup.source_code_size) : ''}
                           <br />
                           {text('Database:')} {selectedBackup ? formatFileSize(selectedBackup.database_size) : ''}
                           <br />
                           {text('Status:')} {selectedBackup?.status || ''}
                        </p>
                     </div>
                  </DialogDescription>
               </DialogHeader>
               <DialogFooter className="flex-col gap-2 sm:flex-row">
                  <Button variant="outline" onClick={handleCancelDialog} disabled={isProcessing} className="w-full sm:w-auto">
                     {text('Cancel')}
                  </Button>
                  <Button variant="destructive" onClick={handleConfirmRestore} disabled={isProcessing} className="w-full sm:w-auto">
                     {isProcessing ? (
                        <>
                           <span className="mr-2 animate-spin">⏳</span>
                           {text('Restoring...')}
                        </>
                     ) : (
                        <>
                           <RotateCcw className="mr-2 h-4 w-4" />
                           {text('Confirm Restore')}
                        </>
                     )}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>

         <Card className="p-4 sm:p-6">
            <div className="mb-4">
               <h2 className="text-xl font-semibold">{text('Recent Backups')}</h2>
               <p className="text-muted-foreground mt-1 text-sm">{text('View and manage your recent application backups')}</p>
            </div>

            <div className="dark:bg-secondary dark:border-border mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
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
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

            {recentBackups && recentBackups.length > 0 ? (
               <div className="space-y-4">
                  {recentBackups.map((backup) => (
                     <div key={backup.id} className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                           <div className="flex-1">
                              <div className="mb-2 flex items-center gap-3">
                                 <div className="flex items-center gap-1">
                                    <Download className="h-4 w-4 text-blue-600" />
                                    <span className="font-medium">{backup.backup_name}</span>
                                 </div>
                                 <span
                                    className={`rounded-full px-2 py-1 text-xs ${
                                       backup.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}
                                 >
                                    {backup.status}
                                 </span>
                              </div>

                              <div className="text-muted-foreground grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                                 <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(backup.created_at)}</span>
                                 </div>

                                 <div className="flex items-center gap-2">
                                    <HardDrive className="h-4 w-4" />
                                    <span>{text('Source:')} {formatFileSize(backup.source_code_size)}</span>
                                 </div>

                                 <div className="flex items-center gap-2">
                                    <HardDrive className="h-4 w-4" />
                                    <span>{text('Database:')} {formatFileSize(backup.database_size)}</span>
                                 </div>
                              </div>

                              {backup.notes && (
                                 <div className="mt-2 text-sm text-gray-500">
                                    <strong>{text('Notes:')}</strong> {backup.notes}
                                 </div>
                              )}
                           </div>

                           <div className="flex items-center gap-2">
                              <LoadingButton
                                 type="button"
                                 variant="ghost"
                                 onClick={handleRefreshServer}
                                 loading={refreshForm.processing}
                                 disabled={refreshForm.processing}
                              >
                                 <div className="text-secondary-foreground flex items-center gap-2">
                                    <RefreshCw className="h-4 w-4" />
                                    <span>{text('Refresh')}</span>
                                 </div>
                              </LoadingButton>

                              <Button
                                 variant="ghost"
                                 onClick={() => handleRestoreClick(backup)}
                                 className="flex items-center gap-1 rounded-md px-3 py-2 text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
                                 title={text('Restore backup')}
                              >
                                 <RotateCcw className="h-4 w-4" />
                                 <span className="text-sm">{text('Restore')}</span>
                              </Button>

                              <Button
                                 variant="ghost"
                                 onClick={() => handleDeleteClick(backup)}
                                 className="flex items-center gap-1 rounded-md px-3 py-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-800"
                                 title={text('Delete backup')}
                              >
                                 <Trash2 className="h-4 w-4" />
                                 <span className="text-sm">{text('Delete')}</span>
                              </Button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="py-8 text-center text-gray-500">
                  <Download className="mx-auto mb-3 h-12 w-12 opacity-50" />
                  <p>{text('No recent backups found.')}</p>
                  <p className="text-sm">{text('Create your first backup using the form above.')}</p>
               </div>
            )}
         </Card>
      </>
   );
};

export default ApplicationBackupList;
