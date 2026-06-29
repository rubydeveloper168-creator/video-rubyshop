import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import razorpayCurrency from '@/data/currency/razorpay';
import { onHandleChange } from '@/lib/inertia';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';

interface RazorpayProps {
   payment: Settings<RazorpayFields>;
}

const Razorpay = ({ payment }: RazorpayProps) => {
   const { text } = useI18n();
   const { data, setData, post, errors, processing } = useForm({
      ...(payment.fields as RazorpayFields),
      type: 'razorpay',
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // console.log(data);
      post(route('settings.payment.update', { id: payment.id }));
   };

   return (
      <Card className="p-4 sm:p-6">
         <div className="mb-6 flex items-center justify-between">
            <div>
               <h2 className="text-xl font-semibold">{text('Razorpay Settings')}</h2>
               <p className="text-gray-500">{text('Configure Razorpay payment gateway')}</p>
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
                        {razorpayCurrency.map((currency) => (
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
                     {data.test_mode ? text('Using Test Environment') : text('Using Live Environment')}
                  </Label>
               </div>
            </div>

            {/* API Credentials Section */}
            <div className="border-b pb-6">
               <h3 className="mb-4 text-lg font-medium">{text('API Credentials')}</h3>
               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                     <Label>{text('API Key')} *</Label>
                     <Input
                        name="api_key"
                        value={data.api_key || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter Razorpay public key')}
                     />
                     <InputError message={errors.api_key} />
                     <p className="mt-1 text-sm text-gray-500">
                        {data.test_mode ? text('Use your test mode public key') : text('Use your live mode public key')}
                     </p>
                  </div>

                  <div>
                     <Label>{text('API Secret')} *</Label>
                     <Input
                        name="api_secret"
                        value={data.api_secret || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter Razorpay secret key')}
                        type="password"
                     />
                     <InputError message={errors.api_secret} />
                     <p className="mt-1 text-sm text-gray-500">
                        {data.test_mode ? text('Use your test mode secret key') : text('Use your live mode secret key')}
                     </p>
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="text-sm text-gray-500">{data.active ? text('Razorpay is currently enabled') : text('Razorpay is currently disabled')}</div>
               <LoadingButton loading={processing}>{text('Save Changes')}</LoadingButton>
            </div>
         </form>
      </Card>
   );
};

export default Razorpay;
