import TiptapRenderer from '@/components/text-editor/tiptap-renderer/client-renderer';
import { useI18n } from '@/lib/i18n';
import { SharedData } from '@/types/global';
import { Head } from '@inertiajs/react';
import Layout from '../intro/partials/layout';
import Hero from './partials/hero';
import Sections from './sections';
import Career from './sections/career';

export interface InnerPageProps extends SharedData {
   innerPage: Page;
   topInstructors: Instructor[];
   jobCirculars: Pagination<JobCircular>;
}

const Index = ({ innerPage, jobCirculars }: InnerPageProps) => {
   const { field } = useI18n();
   const description = field(innerPage, 'description');

   return (
      <Layout page={innerPage} navbarHeight={false}>
         <Head title={field(innerPage, 'name')} />

         <Hero innerPage={innerPage} />

         {innerPage.sections.length > 0 && <Sections sections={innerPage.sections} />}

         {innerPage.slug === 'careers' && jobCirculars && <Career jobCirculars={jobCirculars} />}

         <div className="container">
            {description && (
               <div className="bg-muted mx-auto my-20 max-w-3xl rounded-2xl px-6 py-10 md:px-20">
                  <TiptapRenderer>{description}</TiptapRenderer>
               </div>
            )}
         </div>
      </Layout>
   );
};

export default Index;
