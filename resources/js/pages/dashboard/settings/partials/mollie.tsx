import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import mollieCurrencies from '@/data/currency/mollie';
import { onHandleChange } from '@/lib/inertia';
import { useForm } from '@inertiajs/react';

interface MollieProps {
   payment: Settings<MollieFields>;
}

const Mollie = ({ payment }: MollieProps) => {
   const { data, setData, post, errors, processing } = useForm({
      ...(payment.fields as MollieFields),
      type: 'mollie',
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      post(route('settings.payment.update', { id: payment.id }));
   };

   return (
      <Card className="p-4 sm:p-6">
         <div className="mb-6 flex items-center justify-between">
            <div>
               <h2 className="text-xl font-semibold">Mollie Settings</h2>
               <p className="text-gray-500">Configure Mollie payment gateway</p>
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
                        {mollieCurrencies.map((currency) => (
                           <SelectItem key={currency.value} value={currency.value}>
                              {currency.label} ({currency.value})
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  <InputError message={errors.currency} />
               </div>

               <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Test Mode:</span>
                  <Switch id="status" checked={data.test_mode} onCheckedChange={(checked) => setData('test_mode', checked)} />
                  <Label htmlFor="status" className="text-gray-500">
                     {data.test_mode ? 'Using Test Environment' : 'Using Live Environment'}
                  </Label>
               </div>
            </div>

            {/* API Credentials Section */}
            <div className="border-b pb-6">
               <h3 className="mb-4 text-lg font-medium">API Credentials</h3>
               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                     <Label>Test API Key</Label>
                     <Input
                        name="test_api_key"
                        value={data.test_api_key || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder="Enter Mollie test api key"
                     />
                     <InputError message={errors.test_api_key} />
                     <p className="mt-1 text-sm text-gray-500">{data.test_mode ? 'Use your test mode api key' : 'Use your live mode api key'}</p>
                  </div>

                  <div>
                     <Label>Live API Key</Label>
                     <Input
                        name="live_api_key"
                        value={data.live_api_key || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder="Enter Mollie live api key"
                        type="password"
                     />
                     <InputError message={errors.live_api_key} />
                     <p className="mt-1 text-sm text-gray-500">{data.test_mode ? 'Use your test mode api key' : 'Use your live mode api key'}</p>
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="text-sm text-gray-500">{data.active ? 'Mollie is currently enabled' : 'Mollie is currently disabled'}</div>
               <LoadingButton loading={processing}>Save Changes</LoadingButton>
            </div>
         </form>
      </Card>
   );
};

export default Mollie;
