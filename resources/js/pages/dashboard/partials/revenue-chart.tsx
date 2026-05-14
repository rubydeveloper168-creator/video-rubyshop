import { Card } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DashboardProps } from '../index';

const RevenueChart = () => {
   const { props } = usePage<DashboardProps>();
   const { auth, revenueData } = props;
   const isAdmin = auth.user.role === 'admin';

   // Format revenue data for chart
   const chartData = useMemo(() => {
      return Object.entries(revenueData).map(([month, value]) => ({
         month,
         value,
      }));
   }, [revenueData]);

   return (
      <Card className="p-4 sm:p-6">
         <h3 className="mb-4 text-lg font-medium">{isAdmin ? 'Admin Revenue This Year' : 'Instructor Revenue This Year'}</h3>

         <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} />
               <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
               <YAxis axisLine={false} tickLine={false} tickMargin={0} />
               <Tooltip formatter={(value) => [`$${value}`, isAdmin ? 'Admin Revenue' : 'Instructor Revenue']} />
               <Area
                  type="monotone"
                  dataKey="value"
                  fill="var(--color-secondary-dark)"
                  stroke="var(--color-secondary-foreground)"
                  fillOpacity={0.4}
                  name={isAdmin ? 'Admin Revenue' : 'Instructor Revenue'}
               />
            </AreaChart>
         </ResponsiveContainer>
      </Card>
   );
};

export default RevenueChart;
