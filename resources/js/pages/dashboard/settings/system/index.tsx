import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/dashboard/layout';
import { SharedData } from '@/types/global';
import { ReactNode } from 'react';
import Footer from './partials/footer';
import Navbar from './partials/navbar';
import Style from './partials/style';
import Website from './partials/website';

export interface SystemProps extends SharedData {
   system: Settings<SystemFields>;
}

const System = () => {
   return (
      <div className="md:px-3">
         <div className="mb-6">
            <h1 className="text-2xl font-bold">System Settings</h1>
            <p className="text-gray-500">Manage your system's core settings</p>
         </div>

         <Tabs defaultValue="website">
            <TabsList className="h-13 px-2">
               <TabsTrigger value="website" className="h-10 cursor-pointer px-6">
                  Website
               </TabsTrigger>
               <TabsTrigger value="navbar" className="h-10 cursor-pointer px-6">
                  Navbar
               </TabsTrigger>
               <TabsTrigger value="footer" className="h-10 cursor-pointer px-6">
                  Footer
               </TabsTrigger>
               <TabsTrigger value="style" className="h-10 cursor-pointer px-6">
                  Style
               </TabsTrigger>
            </TabsList>

            <TabsContent value="website">
               <Website />
            </TabsContent>
            <TabsContent value="navbar">
               <Navbar />
            </TabsContent>
            <TabsContent value="footer">
               <Footer />
            </TabsContent>
            <TabsContent value="style">
               <Style />
            </TabsContent>
         </Tabs>
      </div>
   );
};

System.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default System;
