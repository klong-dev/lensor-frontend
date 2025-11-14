import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from '@/components/ui/table';
import { SoldOrder, OrderStatus } from '@/types/order';
import {
     CheckCircle,
     XCircle,
     Clock,
     AlertTriangle,
     MoreVertical,
     Wallet,
     Eye,
     CalendarClock,
} from 'lucide-react';

interface OrdersTableProps {
     orders: SoldOrder[];
     onViewDetails: (order: SoldOrder) => void;
     onWithdraw: (order: SoldOrder) => void;
}

export function OrdersTable({ orders, onViewDetails, onWithdraw }: OrdersTableProps) {
     const getStatusBadge = (status: OrderStatus) => {
          const statusConfig: Record<OrderStatus, { variant: any; label: string; icon: React.ReactNode; className?: string }> = {
               ready_for_withdrawal: {
                    variant: 'default',
                    label: 'Ready for Withdrawal',
                    icon: <CheckCircle className="h-3 w-3" />,
                    className: 'bg-green-500 hover:bg-green-600'
               },
               pending: {
                    variant: 'secondary',
                    label: 'Pending',
                    icon: <Clock className="h-3 w-3" />,
               },
               completed: {
                    variant: 'default',
                    label: 'Completed',
                    icon: <CheckCircle className="h-3 w-3" />,
                    className: 'bg-blue-500 hover:bg-blue-600'
               },
               failed: {
                    variant: 'destructive',
                    label: 'Failed',
                    icon: <XCircle className="h-3 w-3" />,
               },
               refunded: {
                    variant: 'secondary',
                    label: 'Refunded',
                    icon: <AlertTriangle className="h-3 w-3" />,
               },
               reported: {
                    variant: 'secondary',
                    label: 'Reported',
                    icon: <AlertTriangle className="h-3 w-3" />,
                    className: 'bg-yellow-500 hover:bg-yellow-600'
               },
          };

          const config = statusConfig[status];
          return (
               <Badge variant={config.variant} className={`flex items-center gap-1 ${config.className || ''}`}>
                    {config.icon}
                    {config.label}
               </Badge>
          );
     };

     const formatDate = (dateString: string) => {
          return new Date(dateString).toLocaleString('en-US', {
               year: 'numeric',
               month: 'short',
               day: 'numeric',
               hour: '2-digit',
               minute: '2-digit',
          });
     };

     const formatCurrency = (amount: number | string) => {
          const num = typeof amount === 'string' ? parseFloat(amount) : amount;
          return new Intl.NumberFormat('vi-VN', {
               style: 'currency',
               currency: 'VND',
          }).format(num);
     };

     const getTimeUntilWithdrawable = (withdrawableAt: string) => {
          const now = new Date();
          const withdrawDate = new Date(withdrawableAt);
          const diff = withdrawDate.getTime() - now.getTime();

          if (diff <= 0) return 'Available now';

          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

          if (days > 0) return `${days}d ${hours}h`;
          if (hours > 0) return `${hours}h ${minutes}m`;
          return `${minutes}m`;
     };

     return (
          <div className="overflow-x-auto">
               <Table>
                    <TableHeader>
                         <TableRow>
                              <TableHead>Order ID</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Products</TableHead>
                              <TableHead>Earnings</TableHead>
                              <TableHead>Withdrawable</TableHead>
                              <TableHead>Created At</TableHead>
                              <TableHead>Actions</TableHead>
                         </TableRow>
                    </TableHeader>
                    <TableBody>
                         {orders.map((order) => (
                              <TableRow key={order.id}>
                                   <TableCell className="font-mono text-xs">
                                        {order.id.substring(0, 8)}...
                                   </TableCell>
                                   <TableCell>{getStatusBadge(order.status)}</TableCell>
                                   <TableCell>
                                        <div className="max-w-[200px]">
                                             {order.sellerItems.map((item, idx) => (
                                                  <div key={idx} className="text-sm truncate">
                                                       {item.productTitle} ({item.quantity}x)
                                                  </div>
                                             ))}
                                        </div>
                                   </TableCell>
                                   <TableCell className="font-semibold">
                                        {formatCurrency(order.sellerEarnings)}
                                   </TableCell>
                                   <TableCell>
                                        {order.canWithdraw ? (
                                             <Badge className="bg-green-500">
                                                  <CheckCircle className="h-3 w-3 mr-1" />
                                                  Available
                                             </Badge>
                                        ) : (
                                             <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                  <CalendarClock className="h-3 w-3" />
                                                  {getTimeUntilWithdrawable(order.withdrawableAt)}
                                             </div>
                                        )}
                                   </TableCell>
                                   <TableCell className="text-sm">
                                        {formatDate(order.createdAt)}
                                   </TableCell>
                                   <TableCell>
                                        <DropdownMenu>
                                             <DropdownMenuTrigger asChild>
                                                  <Button
                                                       size="sm"
                                                       variant="ghost"
                                                       className="h-8 w-8 p-0"
                                                  >
                                                       <MoreVertical className="h-4 w-4" />
                                                  </Button>
                                             </DropdownMenuTrigger>
                                             <DropdownMenuContent align="end">
                                                  <DropdownMenuItem
                                                       onClick={() => onViewDetails(order)}
                                                       className="cursor-pointer"
                                                  >
                                                       <Eye className="mr-2 h-4 w-4" />
                                                       View Details
                                                  </DropdownMenuItem>
                                                  {order.canWithdraw && order.status === 'ready_for_withdrawal' && (
                                                       <DropdownMenuItem
                                                            onClick={() => onWithdraw(order)}
                                                            className="cursor-pointer text-green-600"
                                                       >
                                                            <Wallet className="mr-2 h-4 w-4" />
                                                            Withdraw Funds
                                                       </DropdownMenuItem>
                                                  )}
                                             </DropdownMenuContent>
                                        </DropdownMenu>
                                   </TableCell>
                              </TableRow>
                         ))}
                    </TableBody>
               </Table>
          </div>
     );
}
