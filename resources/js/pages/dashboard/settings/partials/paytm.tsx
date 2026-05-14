import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { onHandleChange } from '@/lib/inertia';
import { useForm } from '@inertiajs/react';

interface PaytmProps {
   payment: Settings<PaytmFields>;
}

const Paytm = ({ payment }: PaytmProps) => {
   const { data, setData, post, errors, processing } = useForm({
      ...(payment.fields as PaytmFields),
      type: 'paytm',
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      post(route('settings.payment.update', { id: payment.id }));
   };

   return (
      <Card className="p-4 sm:p-6">
         <div className="mb-6 flex items-center justify-between">
            <div>
               <h2 className="text-xl font-semibold">Paytm Settings</h2>
               <p className="text-gray-500">Configure Paytm payment gateway</p>
            </div>

            <div className="flex items-center space-x-2">
               <Label htmlFor="status">{data.active ? 'Enabled' : 'Disabled'}</Label>
               <Switch id="status" checked={data.active} onCheckedChange={(checked) => setData('active', checked)} />
            </div>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               <div>
                  <Label>Currency</Label>
                  <Select value={data.currency} onValueChange={(value) => setData('currency', value)}>
                     <SelectTrigger>
                        <SelectValue placeholder="Select Currency" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                     </SelectContent>
                  </Select>
                  <InputError message={errors.currency} />
               </div>

               <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Test Mode:</span>
                  <Switch id="status" checked={data.test_mode} onCheckedChange={(checked) => setData('test_mode', checked)} />
                  <Label htmlFor="status" className="text-gray-500">
                     {data.test_mode ? 'Using Staging Environment' : 'Using Production Environment'}
                  </Label>
               </div>
            </div>

            {/* API Credentials Section */}
            <div className="border-b pb-6">
               <h3 className="mb-4 text-lg font-medium">API Credentials</h3>
               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                     <Label>Merchant ID/Public Key *</Label>
                     <Input
                        name="public_key"
                        value={data.public_key || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder="Enter Paytm merchant ID"
                     />
                     <InputError message={errors.public_key} />
                     <p className="mt-1 text-sm text-gray-500">
                        {data.test_mode ? 'Use your staging merchant ID' : 'Use your production merchant ID'}
                     </p>
                  </div>

                  <div>
                     <Label>Merchant Key/Secret Key *</Label>
                     <Input
                        name="secret_key"
                        value={data.secret_key || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder="Enter Paytm merchant key"
                        type="password"
                     />
                     <InputError message={errors.secret_key} />
                     <p className="mt-1 text-sm text-gray-500">
                        {data.test_mode ? 'Use your staging merchant key' : 'Use your production merchant key'}
                     </p>
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="text-sm text-gray-500">{data.active ? 'Paytm is currently enabled' : 'Paytm is currently disabled'}</div>
               <LoadingButton loading={processing}>Save Changes</LoadingButton>
            </div>
         </form>
      </Card>
   );
};

export default Paytm;
