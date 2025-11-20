import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Wallet, Clock } from 'lucide-react';
import { SoldOrder } from '@/types/order';
import { WithdrawalStatistics } from '@/types/withdrawal';

interface OrderStatsProps {
     orders: SoldOrder[];
     statistics: WithdrawalStatistics | null;
}

export function OrderStats({ orders, statistics }: OrderStatsProps) {
     const totalEarnings = orders.reduce((sum, order) => sum + order.sellerEarnings, 0);

     const stats = {
          total: orders.length,
          readyForWithdrawal: orders.filter(o => o.status === 'ready_for_withdrawal').length,
          waiting: orders.filter(o => o.status === 'completed').length,
          withdrawing: orders.filter(o => o.status === 'withdrawing').length,
          withdrawn: orders.filter(o => o.status === 'withdrawn').length,
          totalEarnings: totalEarnings,
          actualAmount: statistics?.totalActualAmount || 0,
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
                         <CardTitle className="text-sm font-medium">Waiting (3 days)</CardTitle>
                         <Clock className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                         <div className="text-2xl font-bold text-amber-600">{stats.waiting}</div>
                    </CardContent>
               </Card>

               <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                         <CardTitle className="text-sm font-medium">Total Received (After Fee)</CardTitle>
                         <DollarSign className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                         <div className="text-2xl font-bold text-blue-600">
                              {formatCurrency(stats.actualAmount)}
                         </div>
                         <p className="text-xs text-muted-foreground mt-1">
                              From {formatCurrency(stats.totalEarnings)} (17% fee)
                         </p>
                    </CardContent>
               </Card>
          </div>
     );
}
