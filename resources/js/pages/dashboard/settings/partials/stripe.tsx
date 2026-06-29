import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import stripeCurrencies from '@/data/currency/stripe';
import { onHandleChange } from '@/lib/inertia';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';

interface StripeProps {
   payment: Settings<StripeFields>;
}

const Stripe = ({ payment }: StripeProps) => {
   const { text } = useI18n();
   const { data, setData, post, errors, processing } = useForm({
      ...(payment.fields as StripeFields),
      type: 'stripe',
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      post(route('settings.payment.update', { id: payment.id }));
   };

   return (
      <Card className="p-4 sm:p-6">
         <div className="mb-6 flex items-center justify-between">
            <div>
               <h2 className="text-xl font-semibold">{text('Stripe Settings')}</h2>
               <p className="text-gray-500">{text('Configure Stripe payment gateway')}</p>
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
                        {stripeCurrencies.map((currency) => (
                           <SelectItem key={currency.value} value={currency.value}>
                              {currency.label} ({currency.value})
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  <InputError message={errors.currency} />
               </div>

               <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{text('Test Mode:')}</span>
                  <Switch id="status" checked={data.test_mode} onCheckedChange={(checked) => setData('test_mode', checked)} />
                  <Label htmlFor="status" className="text-gray-500">
                     {data.test_mode ? text('Using Test Keys') : text('Using Live Keys')}
                  </Label>
               </div>
            </div>

            {/* Test Mode Credentials Section */}
            <div className={`border-b pb-6 ${!data.test_mode ? 'opacity-60' : ''}`}>
               <h3 className="mb-4 text-lg font-medium">{text('Test Credentials')}</h3>
               <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                  <div>
                     <Label>{text('Public Test Key')} *</Label>
                     <Input
                        name="test_public_key"
                        value={data.test_public_key || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter test public key')}
                        disabled={!data.test_mode}
                     />
                     <InputError message={errors.test_public_key} />
                  </div>

                  <div>
                     <Label>{text('Secret Test Key')} *</Label>
                     <Input
                        name="test_secret_key"
                        value={data.test_secret_key || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter test secret key')}
                        disabled={!data.test_mode}
                        type="password"
                     />
                     <InputError message={errors.test_secret_key} />
                  </div>
               </div>
            </div>

            {/* Live Mode Credentials Section */}
            <div className={`border-b pb-6 ${data.test_mode ? 'opacity-60' : ''}`}>
               <h3 className="mb-4 text-lg font-medium">{text('Live Credentials')}</h3>
               <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                  <div>
                     <Label>{text('Public Live Key')} *</Label>
                     <Input
                        name="live_public_key"
                        value={data.live_public_key || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter live public key')}
                        disabled={data.test_mode}
                     />
                     <InputError message={errors.live_public_key} />
                  </div>

                  <div>
                     <Label>{text('Secret Live Key')} *</Label>
                     <Input
                        name="live_secret_key"
                        value={data.live_secret_key || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter live secret key')}
                        disabled={data.test_mode}
                        type="password"
                     />
                     <InputError message={errors.live_secret_key} />
                  </div>
               </div>
            </div>

            {/* Webhook Secret Section */}
            <div className="border-b pb-6">
               <h3 className="mb-4 text-lg font-medium">{text('Webhook Settings')}</h3>
               <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                  <div>
                     <Label>{text('Webhook Secret')}</Label>
                     <Input
                        name="webhook_secret"
                        value={data.webhook_secret || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter webhook secret')}
                        type="password"
                     />
                     <InputError message={errors.webhook_secret} />
                     <p className="mt-1 text-sm text-gray-500">{text('Webhooks are used to handle events from Stripe like successful payments')}</p>
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="text-sm text-gray-500">{data.active ? text('Stripe is currently enabled') : text('Stripe is currently disabled')}</div>
               <LoadingButton loading={processing}>{text('Save Changes')}</LoadingButton>
            </div>
         </form>
      </Card>
   );
};

export default Stripe;
