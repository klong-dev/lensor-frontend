import { Button } from '@/components/ui/button';
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { SoldOrder, OrderStatus } from '@/types/order';
import { CheckCircle, XCircle, Clock, AlertTriangle, Wallet } from 'lucide-react';

interface OrderDetailsDialogProps {
     order: SoldOrder | null;
     open: boolean;
     onOpenChange: (open: boolean) => void;
     onWithdraw?: () => void;
}

export function OrderDetailsDialog({ order, open, onOpenChange, onWithdraw }: OrderDetailsDialogProps) {
     if (!order) return null;

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
                    label: 'Waiting (3 days)',
                    icon: <Clock className="h-3 w-3" />,
                    className: 'bg-amber-500 hover:bg-amber-600'
               },
               withdrawn: {
                    variant: 'default',
                    label: 'Withdrawn',
                    icon: <CheckCircle className="h-3 w-3" />,
                    className: 'bg-blue-500 hover:bg-blue-600'
               },
               withdrawing: {
                    variant: 'default',
                    label: 'Withdrawing',
                    icon: <Clock className="h-3 w-3" />,
                    className: 'bg-yellow-500 hover:bg-yellow-600'
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

     // Calculate actual amount after 17% fee
     const WITHDRAWAL_FEE_PERCENTAGE = 17;
     const withdrawalFee = order.sellerEarnings * (WITHDRAWAL_FEE_PERCENTAGE / 100);
     const actualAmount = order.sellerEarnings - withdrawalFee;

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
          <Dialog open={open} onOpenChange={onOpenChange}>
               <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                         <DialogTitle>Order Details</DialogTitle>
                         <DialogDescription>Complete information about this order</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                         <div className="grid grid-cols-2 gap-4">
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                                   <p className="text-sm font-mono">{order.id}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Status</p>
                                   {getStatusBadge(order.status)}
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                                   <p className="text-sm font-semibold">{formatCurrency(order.totalAmount)}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Your Earnings</p>
                                   <p className="text-sm font-semibold">{formatCurrency(order.sellerEarnings)}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Withdrawal Fee (17%)</p>
                                   <p className="text-sm font-semibold text-red-600">-{formatCurrency(withdrawalFee)}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Actual Amount</p>
                                   <p className="text-sm font-semibold text-green-600">
                                        {formatCurrency(actualAmount)}
                                   </p>
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                                   <p className="text-sm capitalize">{order.paymentMethod}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
                                   <p className="text-xs font-mono">{order.transactionId || 'N/A'}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Created At</p>
                                   <p className="text-sm">{formatDate(order.createdAt)}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Withdrawable At</p>
                                   <p className="text-sm">{formatDate(order.withdrawableAt)}</p>
                              </div>
                         </div>

                         <div>
                              <p className="text-sm font-medium text-muted-foreground mb-2">Products</p>
                              <div className="space-y-2 p-3 bg-muted rounded-md">
                                   {order.sellerItems.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-start text-sm">
                                             <div className="flex-1">
                                                  <p className="font-medium">{item.productTitle}</p>
                                                  <p className="text-xs text-muted-foreground">
                                                       {formatCurrency(item.price)} × {item.quantity}
                                                  </p>
                                             </div>
                                             <p className="font-semibold">{formatCurrency(item.subtotal)}</p>
                                        </div>
                                   ))}
                              </div>
                         </div>

                         {order.status === 'withdrawn' && (
                              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-md border border-blue-200 dark:border-blue-800">
                                   <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                                        <CheckCircle className="h-4 w-4" />
                                        <p className="text-sm font-medium">This order has been withdrawn</p>
                                   </div>
                              </div>
                         )}

                         {order.status === 'withdrawing' && (
                              <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-md border border-yellow-200 dark:border-yellow-800">
                                   <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                                        <Clock className="h-4 w-4" />
                                        <p className="text-sm font-medium">Withdrawal is being processed by admin</p>
                                   </div>
                              </div>
                         )}

                         {order.status === 'reported' && (
                              <div className="p-3 bg-red-50 dark:bg-red-950 rounded-md border border-red-200 dark:border-red-800">
                                   <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                                        <AlertTriangle className="h-4 w-4" />
                                        <p className="text-sm font-medium">Cannot withdraw - Order is reported</p>
                                   </div>
                              </div>
                         )}

                         {order.canWithdraw && order.status !== 'withdrawn' && order.status !== 'withdrawing' && order.status !== 'reported' && (
                              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-md border border-green-200 dark:border-green-800">
                                   <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                                        <CheckCircle className="h-4 w-4" />
                                        <p className="text-sm font-medium">This order is ready for withdrawal</p>
                                   </div>
                              </div>
                         )}

                         {!order.canWithdraw && order.status !== 'withdrawn' && order.status !== 'withdrawing' && order.status !== 'reported' && (
                              <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-md border border-yellow-200 dark:border-yellow-800">
                                   <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                                        <Clock className="h-4 w-4" />
                                        <p className="text-sm font-medium">
                                             Available in {getTimeUntilWithdrawable(order.withdrawableAt)}
                                        </p>
                                   </div>
                              </div>
                         )}
                    </div>

                    <DialogFooter>
                         <Button variant="outline" onClick={() => onOpenChange(false)}>
                              Close
                         </Button>
                         {order.canWithdraw && order.status !== 'withdrawn' && order.status !== 'withdrawing' && order.status !== 'reported' && onWithdraw && (
                              <Button onClick={onWithdraw}>
                                   <Wallet className="mr-2 h-4 w-4" />
                                   Withdraw Funds
                              </Button>
                         )}
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     );
}
