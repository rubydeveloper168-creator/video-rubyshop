import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { onHandleChange } from '@/lib/inertia';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';

interface PaypalSettings {
   active: boolean;
   currency: string;
   test_mode: boolean;
   sandbox_client_id: string;
   sandbox_secret_key: string;
   production_client_id: string;
   production_secret_key: string;
   [key: string]: any;
}

interface PaypalProps {
   payment: Settings;
}

const Paypal = ({ payment }: PaypalProps) => {
   const { text } = useI18n();
   const { data, setData, post, errors, processing } = useForm({
      ...(payment.fields as PaypalSettings),
      type: 'paypal',
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      post(route('payouts.settings.update'));
   };

   return (
      <Card className="p-4 sm:p-6">
         <div className="mb-6 flex items-center justify-between">
            <div>
               <h2 className="text-xl font-semibold">{text('PayPal Settings')}</h2>
               <p className="text-gray-500">{text('Configure PayPal payment gateway')}</p>
            </div>

            <div className="flex items-center space-x-2">
               <Label htmlFor="status">{data.active ? text('Enabled') : text('Disabled')}</Label>
               <Switch id="status" checked={data.active} onCheckedChange={(checked) => setData('active', checked)} />
            </div>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               <div>
                  <Label>{text('Currency')}</Label>
                  <Select value={data.currency} onValueChange={(value) => setData('currency', value)}>
                     <SelectTrigger>
                        <SelectValue placeholder={text('Select Currency')} />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="USD">{text('US Dollar')} (USD)</SelectItem>
                        <SelectItem value="EUR">{text('Euro')} (EUR)</SelectItem>
                        <SelectItem value="GBP">{text('British Pound')} (GBP)</SelectItem>
                        <SelectItem value="CAD">{text('Canadian Dollar')} (CAD)</SelectItem>
                        <SelectItem value="AUD">{text('Australian Dollar')} (AUD)</SelectItem>
                        <SelectItem value="JPY">{text('Japanese Yen')} (JPY)</SelectItem>
                     </SelectContent>
                  </Select>
                  <InputError message={errors.currency} />
               </div>

               <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{text('Test Mode:')}</span>
                  <Switch id="status" checked={data.test_mode} onCheckedChange={(checked) => setData('test_mode', checked)} />
                  <Label htmlFor="status" className="text-gray-500">
                     {data.test_mode ? text('Using Sandbox Environment') : text('Using Production Environment')}
                  </Label>
               </div>
            </div>

            {/* Sandbox Credentials Section */}
            <div className={`border-b pb-6 ${!data.test_mode ? 'opacity-60' : ''}`}>
               <h3 className="mb-4 text-lg font-medium">{text('Sandbox Credentials')}</h3>
               <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                  <div>
                     <Label>{text('Client ID')} *</Label>
                     <Input
                        name="sandbox_client_id"
                        value={data.sandbox_client_id || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter sandbox client ID')}
                        disabled={!data.test_mode}
                     />
                     <InputError message={errors.sandbox_client_id} />
                  </div>

                  <div>
                     <Label>{text('Secret Key')} *</Label>
                     <Input
                        name="sandbox_secret_key"
                        value={data.sandbox_secret_key || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter sandbox secret key')}
                        disabled={!data.test_mode}
                        type="password"
                     />
                     <InputError message={errors.sandbox_secret_key} />
                  </div>
               </div>
            </div>

            {/* Production Credentials Section */}
            <div className={`border-b pb-6 ${data.test_mode ? 'opacity-60' : ''}`}>
               <h3 className="mb-4 text-lg font-medium">{text('Production Credentials')}</h3>
               <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                  <div>
                     <Label>{text('Client ID')} *</Label>
                     <Input
                        name="production_client_id"
                        value={data.production_client_id || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter production client ID')}
                        disabled={data.test_mode}
                     />
                     <InputError message={errors.production_client_id} />
                  </div>

                  <div>
                     <Label>{text('Secret Key')} *</Label>
                     <Input
                        name="production_secret_key"
                        value={data.production_secret_key || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter production secret key')}
                        disabled={data.test_mode}
                        type="password"
                     />
                     <InputError message={errors.production_secret_key} />
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="text-sm text-gray-500">{data.active ? text('PayPal is currently enabled') : text('PayPal is currently disabled')}</div>
               <LoadingButton loading={processing}>{text('Save Changes')}</LoadingButton>
            </div>
         </form>
      </Card>
   );
};

export default Paypal;
