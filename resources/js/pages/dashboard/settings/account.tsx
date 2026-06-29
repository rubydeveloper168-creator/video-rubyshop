import ChangeEmail from '@/components/account/change-email';
import ChangePassword from '@/components/account/change-password';
import ForgetPassword from '@/components/account/forget-password';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/dashboard/layout';
import { useI18n } from '@/lib/i18n';
import { getQueryParams } from '@/lib/route';
import { Head, router, usePage } from '@inertiajs/react';
import { nanoid } from 'nanoid';
import { ReactNode } from 'react';
import UpdateProfile from './partials/update-profile';

interface Props {
   instructor: Instructor;
}

const Account = ({ instructor }: Props) => {
   const page = usePage();
   const params = getQueryParams(page.url);
   const { text } = useI18n();

   const tabs = [
      {
         id: nanoid(),
         slug: 'profile-update',
         title: text('Profile Update'),
         Component: () => <UpdateProfile instructor={instructor} />,
      },
      {
         id: nanoid(),
         slug: 'change-email',
         title: text('Change Email'),
         Component: ChangeEmail,
      },
      {
         id: nanoid(),
         slug: 'change-password',
         title: text('Change Password'),
         Component: ChangePassword,
      },
      {
         id: nanoid(),
         slug: 'forget-password',
         title: text('Forget Password'),
         Component: ForgetPassword,
      },
      // {
      //    id: nanoid(),
      //    slug: 'delete-account',
      //    title: 'Delete Account',
      //    Component: DeleteUser,
      // },
   ];

   return (
      <>
         <Head title={text('Account Settings')} />

         <Tabs value={params['tab'] ?? tabs[0].slug} className="grid grid-rows-1 gap-5 md:grid-cols-4 md:px-3">
            <div>
               <TabsList className="horizontal-tabs-list">
                  {tabs.map(({ id, slug, title }) => (
                     <TabsTrigger
                        key={id}
                        value={slug}
                        className="horizontal-tabs-trigger"
                        onClick={() =>
                           router.get(
                              route('settings.account', {
                                 tab: slug,
                              }),
                           )
                        }
                     >
                        {title}
                     </TabsTrigger>
                  ))}
               </TabsList>
            </div>

            <div className="md:col-span-3">
               {tabs.map(({ id, slug, Component }) => (
                  <TabsContent key={id} value={slug} className="m-0">
                     <Component />
                  </TabsContent>
               ))}
            </div>
         </Tabs>
      </>
   );
};

Account.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Account;
