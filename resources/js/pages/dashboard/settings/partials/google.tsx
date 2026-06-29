import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { onHandleChange } from '@/lib/inertia';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';

interface Props {
   auth: Settings<GoogleAuthFields>;
}

const Google = ({ auth }: Props) => {
   const { text } = useI18n();
   const { data, setData, post, errors, processing } = useForm({
      ...(auth.fields as GoogleAuthFields),
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      post(route('settings.auth0.update', { id: auth.id }));
   };

   return (
      <Card className="p-4 sm:p-6">
         <div className="mb-7 flex items-center justify-between">
            <div>
               <h2 className="text-xl font-semibold">{text('Google Auth Settings')}</h2>
               <p className="text-gray-500">{text('Configure your google auth credentials for enable Google Login')}</p>
            </div>

            <div className="flex items-center space-x-2">
               <Label htmlFor="status">{data.active ? text('Enabled') : text('Disabled')}</Label>
               <Switch id="status" checked={data.active} onCheckedChange={(checked) => setData('active', checked)} />
            </div>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b pb-6">
               <h2 className="mb-4 text-xl font-semibold">{text('Google Auth')}</h2>

               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                     <Label>{text('Google Client ID')}</Label>
                     <Input
                        name="client_id"
                        value={data.client_id || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter your google client id')}
                     />
                     <InputError message={errors.client_id} />
                  </div>

                  <div>
                     <Label>{text('Google Client Secret')}</Label>
                     <Input
                        name="client_secret"
                        value={data.client_secret || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter your google client secret')}
                     />
                     <InputError message={errors.client_secret} />
                  </div>

                  <div>
                     <Label>{text('Google Redirect URI')}</Label>
                     <Input
                        name="redirect"
                        value={data.redirect || ''}
                        onChange={(e) => onHandleChange(e, setData)}
                        placeholder={text('Enter your google redirect url')}
                     />
                     <InputError message={errors.redirect} />
                  </div>
               </div>
            </div>

            <LoadingButton loading={processing}>{text('Save Changes')}</LoadingButton>
         </form>
      </Card>
   );
};

export default Google;
