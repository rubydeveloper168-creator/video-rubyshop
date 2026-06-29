import DashboardLayout from '@/layouts/dashboard/layout';
import { useI18n } from '@/lib/i18n';
import { ReactNode } from 'react';
import Google from './partials/google';

interface Props {
   auths: Settings<GoogleAuthFields>[];
}

const Auth = ({ auths }: Props) => {
   const { text } = useI18n();
   const components = [Google];

   const tabs = auths.map((auth, index) => ({
      ...auth,
      Component: components[index] ?? (() => <div>{text('No component found')}</div>),
   }));

   return (
      <section className="md:px-3">
         {tabs.map((auth) => (
            <auth.Component key={auth.id} auth={auth} />
         ))}
      </section>
   );
};

Auth.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Auth;
