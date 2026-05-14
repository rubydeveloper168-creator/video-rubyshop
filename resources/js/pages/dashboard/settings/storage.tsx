import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/layouts/dashboard/layout';
import { useForm } from '@inertiajs/react';
import { ReactNode } from 'react';

type StorageFormData = StorageFields & Record<string, string>;

interface Props {
   storage: Settings<StorageFormData>;
}

const Storage = ({ storage }: Props) => {
   const { data, setData, post, errors, processing } = useForm<StorageFormData>({
      ...storage.fields,
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      post(route('settings.storage.update', { id: storage.id }));
   };

   return (
      <div className="md:px-3">
         <div className="mb-6">
            <h1 className="text-2xl font-bold">Storage Settings</h1>
            <p className="text-gray-500">Configure your storage settings</p>
         </div>

         <Card className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
               <h2 className="mb-4 text-xl font-semibold">Storage Settings</h2>

               <div>
                  <Label>Storage Driver</Label>
                  <Select value={data.storage_driver} onValueChange={(value) => setData('storage_driver' as keyof StorageFormData, value)}>
                     <SelectTrigger>
                        <SelectValue placeholder="Select Storage Driver" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="local">Local</SelectItem>
                        <SelectItem value="s3">AWS S3</SelectItem>
                     </SelectContent>
                  </Select>
                  <InputError message={errors.storage_driver} />
               </div>

               {data.storage_driver === 's3' && (
                  <>
                     <div>
                        <Label>Access Key ID</Label>
                        <Input
                           name="aws_access_key_id"
                           value={data.aws_access_key_id || ''}
                           onChange={(e) => setData(e.target.name, e.target.value)}
                           placeholder="Enter Access Key ID"
                        />
                        <InputError message={errors.aws_access_key_id} />
                     </div>

                     <div>
                        <Label>Secret Access Key</Label>
                        <Input
                           type="password"
                           name="aws_secret_access_key"
                           value={data.aws_secret_access_key || ''}
                           onChange={(e) => setData(e.target.name, e.target.value)}
                           placeholder="Enter Secret Access Key"
                        />
                        <InputError message={errors.aws_secret_access_key} />
                     </div>
                     <div>
                        <Label>Default Region</Label>
                        <Input
                           name="aws_default_region"
                           value={data.aws_default_region || ''}
                           onChange={(e) => setData(e.target.name, e.target.value)}
                           placeholder="Enter Default Region"
                        />
                        <InputError message={errors.aws_default_region} />
                     </div>
                     <div>
                        <Label>Bucket Name</Label>
                        <Input
                           name="aws_bucket"
                           value={data.aws_bucket || ''}
                           onChange={(e) => setData(e.target.name, e.target.value)}
                           placeholder="Enter Bucket Name"
                        />
                        <InputError message={errors.aws_bucket} />
                     </div>
                  </>
               )}

               <div className="flex items-center justify-between">
                  <LoadingButton loading={processing}>Save Changes</LoadingButton>
               </div>
            </form>
         </Card>
      </div>
   );
};

Storage.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Storage;
