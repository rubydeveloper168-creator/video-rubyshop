import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { Power, Shield } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function SystemRebootConfirm() {
   const { post, processing } = useForm();

   const handleReboot: FormEventHandler = (e) => {
      e.preventDefault();
      post('/system/reboot/execute');
   };

   return (
      <AuthLayout title="System Reboot Confirmation" description="Please review the warnings before proceeding">
         <Head title="System Reboot Confirmation" />

         <div className="space-y-6">
            {/* Admin Info */}
            <Card className="border-blue-200 bg-blue-50">
               <CardHeader className="p-4">
                  <div className="flex items-center gap-2">
                     <Shield className="h-5 w-5 text-blue-600" />
                     <CardTitle className="text-lg text-blue-900">Admin Verified</CardTitle>
                  </div>
               </CardHeader>
            </Card>

            {/* Actions to be performed */}
            <Card className="border-yellow-200 bg-yellow-50">
               <CardHeader className="p-4">
                  <CardTitle className="text-lg text-yellow-900">System Operations</CardTitle>
                  <CardDescription className="text-yellow-700">The following operations will be performed:</CardDescription>
               </CardHeader>
               <CardContent className="space-y-2 p-4 text-sm text-yellow-800">
                  <div className="flex items-center gap-2">
                     <span className="font-semibold">1.</span>
                     <span>Clear and rebuild application cache, route, view and config</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="font-semibold">5.</span>
                     <span>Bring application out of maintenance mode</span>
                  </div>
               </CardContent>
            </Card>

            {/* Reboot Button */}
            <form onSubmit={handleReboot} className="space-y-4">
               <Button type="submit" className="w-full bg-orange-600 text-white hover:bg-orange-700" disabled={processing} size="lg">
                  <Power className="mr-2 h-4 w-4" />
                  {processing ? 'Rebooting System...' : 'Reboot System'}
               </Button>

               <Button type="button" variant="secondary" className="w-full" onClick={() => window.history.back()} disabled={processing}>
                  Cancel
               </Button>
            </form>
         </div>
      </AuthLayout>
   );
}
