import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/layouts/dashboard/layout';
import { useI18n } from '@/lib/i18n';
import { useForm } from '@inertiajs/react';
import { ReactNode } from 'react';

type SmtpFormData = SmtpFields & Record<string, string>;

interface Props {
   smtp: Settings<SmtpFormData>;
}

const SMTP = ({ smtp }: Props) => {
   const { data, setData, post, errors, processing } = useForm<SmtpFormData>({
      ...smtp.fields,
   });
   const { text } = useI18n();

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      post(route('settings.smtp.update', { id: smtp.id }));
   };

   return (
      <div className="md:px-3">
         <div className="mb-6">
            <h1 className="text-2xl font-bold">{text('SMTP Settings')}</h1>
            <p className="text-gray-500">{text('Configure your email sending settings')}</p>
         </div>

         <Card className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Mail Server Settings */}
               <div className="border-b pb-6">
                  <h2 className="mb-4 text-xl font-semibold">{text('Mail Server')}</h2>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                     <div>
                        <Label>{text('Mail Driver')} *</Label>
                        <Select value={data.mail_mailer} onValueChange={(value) => setData('mail_mailer' as keyof SmtpFormData, value)}>
                           <SelectTrigger>
                              <SelectValue placeholder={text('Select Mail Driver')} />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="smtp">{text('SMTP')}</SelectItem>
                           </SelectContent>
                        </Select>
                        <InputError message={errors.mail_mailer} />
                     </div>

                     <div>
                        <Label>{text('Host')} *</Label>
                        <Input
                           name="mail_host"
                           value={data.mail_host || ''}
                           onChange={(e) => setData(e.target.name, e.target.value)}
                           placeholder="smtp.example.com"
                        />
                        <InputError message={errors.mail_host} />
                     </div>

                     <div>
                        <Label>{text('Port')} *</Label>
                        <Input
                           name="mail_port"
                           value={data.mail_port || ''}
                           onChange={(e) => setData(e.target.name, e.target.value)}
                           placeholder="587"
                        />
                        <InputError message={errors.mail_port} />
                     </div>

                     <div>
                        <Label>{text('Encryption')}</Label>
                        <Select value={data.mail_encryption} onValueChange={(value) => setData('mail_encryption' as keyof SmtpFormData, value)}>
                           <SelectTrigger>
                              <SelectValue placeholder={text('Select Encryption')} />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="tls">{text('TLS')}</SelectItem>
                              <SelectItem value="ssl">{text('SSL')}</SelectItem>
                           </SelectContent>
                        </Select>
                        <InputError message={errors.mail_encryption} />
                     </div>

                     <div>
                        <Label>{text('Username')}</Label>
                        <Input
                           name="mail_username"
                           value={data.mail_username || ''}
                           onChange={(e) => setData(e.target.name, e.target.value)}
                           placeholder={text('Enter username')}
                        />
                        <InputError message={errors.mail_username} />
                     </div>

                     <div>
                        <Label>{text('Password')}</Label>
                        <Input
                           type="password"
                           name="mail_password"
                           value={data.mail_password || ''}
                           onChange={(e) => setData(e.target.name, e.target.value)}
                           placeholder={text('Enter password')}
                        />
                        <InputError message={errors.mail_password} />
                     </div>
                     <div>
                        <Label>{text('From Address')} *</Label>
                        <Input
                           type="email"
                           name="mail_from_address"
                           value={data.mail_from_address || ''}
                           onChange={(e) => setData(e.target.name, e.target.value)}
                           placeholder="noreply@example.com"
                        />
                        <InputError message={errors.mail_from_address} />
                     </div>

                     <div>
                        <Label>{text('From Name')} *</Label>
                        <Input
                           name="mail_from_name"
                           value={data.mail_from_name || ''}
                           onChange={(e) => setData(e.target.name, e.target.value)}
                           placeholder={text('Your Company Name')}
                        />
                        <InputError message={errors.mail_from_name} />
                     </div>
                  </div>
               </div>

               <div className="flex items-center justify-end">
                  <LoadingButton loading={processing}>{text('Save Changes')}</LoadingButton>
               </div>
            </form>
         </Card>
      </div>
   );
};

SMTP.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default SMTP;
