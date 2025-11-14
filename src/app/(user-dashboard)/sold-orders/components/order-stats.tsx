import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Wallet, Clock } from 'lucide-react';
import { SoldOrder } from '@/types/order';

interface OrderStatsProps {
     orders: SoldOrder[];
}

export function OrderStats({ orders }: OrderStatsProps) {
     const stats = {
          total: orders.length,
          readyForWithdrawal: orders.filter(o => o.status === 'ready_for_withdrawal').length,
          pending: orders.filter(o => o.status === 'pending').length,
          completed: orders.filter(o => o.status === 'completed').length,
          totalEarnings: orders.reduce((sum, order) => sum + order.sellerEarnings, 0),
     };

     const formatCurrency = (amount: number) => {
          return new Intl.NumberFormat('vi-VN', {
               style: 'currency',
               currency: 'VND',
          }).format(amount);
     };

     return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
               <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                         <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                         <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
               </Card>

               <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                         <CardTitle className="text-sm font-medium">Ready to Withdraw</CardTitle>
                         <Wallet className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                         <div className="text-2xl font-bold text-green-600">{stats.readyForWithdrawal}</div>
                    </CardContent>
               </Card>

               <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                         <CardTitle className="text-sm font-medium">Pending</CardTitle>
                         <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                         <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    </CardContent>
               </Card>

               <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                         <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                         <DollarSign className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                         <div className="text-2xl font-bold text-blue-600">
                              {formatCurrency(stats.totalEarnings)}
                         </div>
                    </CardContent>
               </Card>
          </div>
     );
}
