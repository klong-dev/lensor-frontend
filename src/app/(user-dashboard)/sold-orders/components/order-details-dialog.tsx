import { Button } from '@/components/ui/button'
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
} from '@/components/ui/dialog'
import { OrderStatusBadge } from '@/components/ui/status-badges'
import { SoldOrder } from '@/types/order'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { getTimeUntilWithdrawable } from '@/utils/orderUtils'
import { AlertTriangle, CheckCircle, Clock, Wallet } from 'lucide-react'

interface OrderDetailsDialogProps {
     order: SoldOrder | null
     open: boolean
     onOpenChange: (open: boolean) => void
     onWithdraw?: () => void
     discountRateNum: number
}

export function OrderDetailsDialog({ order, open, onOpenChange, onWithdraw, discountRateNum }: OrderDetailsDialogProps) {
     if (!order) return null

     // Calculate actual amount after fee
     const withdrawalFee = order.sellerEarnings * (discountRateNum / 100)
     const actualAmount = order.sellerEarnings - withdrawalFee

     return (
          <Dialog open={open} onOpenChange={onOpenChange}>
               <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                         <DialogTitle>Order Details</DialogTitle>
                         <DialogDescription>Information about this order</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                         <div className="grid grid-cols-2 gap-4">
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                                   <p className="text-sm font-mono">{order.id}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Status</p>
                                   <OrderStatusBadge status={order.status} />
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                                   <p className="text-sm font-semibold">{formatCurrency(order.totalAmount)}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                                   <p className="text-sm capitalize">{order.paymentMethod}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-green-600">Your Earnings</p>
                                   <p className="text-sm font-semibold">{formatCurrency(actualAmount)}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Withdrawal Fee ({discountRateNum}%)</p>
                                   <p className="text-sm font-semibold text-red-600">-{formatCurrency(withdrawalFee)}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
                                   <p className="text-xs font-mono">{order.transactionId || 'N/A'}</p>
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
                                             Available withdraw in {getTimeUntilWithdrawable(order.withdrawableAt)}
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
     )
}
