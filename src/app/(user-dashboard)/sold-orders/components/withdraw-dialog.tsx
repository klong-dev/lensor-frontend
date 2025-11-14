import { Button } from '@/components/ui/button';
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
} from '@/components/ui/dialog';
import { SoldOrder } from '@/types/order';
import { Wallet, AlertCircle } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

// System withdrawal fee percentage (can be changed in the future)
const WITHDRAWAL_FEE_PERCENTAGE = 15;

interface WithdrawDialogProps {
     order: SoldOrder | null;
     open: boolean;
     onOpenChange: (open: boolean) => void;
     onConfirm: () => void;
     isSubmitting: boolean;
}

export function WithdrawDialog({
     order,
     open,
     onOpenChange,
     onConfirm,
     isSubmitting
}: WithdrawDialogProps) {
     if (!order) return null;

     const formatCurrency = (amount: number | string) => {
          const num = typeof amount === 'string' ? parseFloat(amount) : amount;
          return new Intl.NumberFormat('vi-VN', {
               style: 'currency',
               currency: 'VND',
          }).format(num);
     };

     const earnings = order.sellerEarnings;
     const withdrawalFee = earnings * (WITHDRAWAL_FEE_PERCENTAGE / 100);
     const amountAfterFee = earnings - withdrawalFee;

     return (
          <Dialog open={open} onOpenChange={onOpenChange}>
               <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                         <DialogTitle>Confirm Withdrawal</DialogTitle>
                         <DialogDescription>
                              Review the withdrawal details before confirming
                         </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                         <div className="p-4 bg-muted rounded-md space-y-3">
                              <div className="flex justify-between">
                                   <span className="text-sm text-muted-foreground">Order ID:</span>
                                   <span className="text-sm font-mono">{order.id.substring(0, 12)}...</span>
                              </div>
                              <div className="flex justify-between items-center">
                                   <span className="text-sm text-muted-foreground">Order Earnings:</span>
                                   <span className="text-base font-semibold">
                                        {formatCurrency(earnings)}
                                   </span>
                              </div>
                              <div className="flex justify-between items-center text-red-600 dark:text-red-400">
                                   <span className="text-sm">Withdrawal Fee ({WITHDRAWAL_FEE_PERCENTAGE}%):</span>
                                   <span className="text-base font-semibold">
                                        - {formatCurrency(withdrawalFee)}
                                   </span>
                              </div>
                              <div className="pt-2 border-t border-border">
                                   <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Amount to Receive:</span>
                                        <span className="text-xl font-bold text-green-600">
                                             {formatCurrency(amountAfterFee)}
                                        </span>
                                   </div>
                              </div>
                         </div>

                         <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-md border border-yellow-200 dark:border-yellow-800">
                              <div className="flex gap-2">
                                   <AlertCircle className="h-4 w-4 text-yellow-700 dark:text-yellow-300 mt-0.5 flex-shrink-0" />
                                   <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                        A {WITHDRAWAL_FEE_PERCENTAGE}% system fee will be deducted from your withdrawal amount.
                                   </p>
                              </div>
                         </div>

                         <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-md border border-blue-200 dark:border-blue-800">
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                   <Wallet className="inline h-4 w-4 mr-1" />
                                   Funds will be added to your wallet immediately.
                              </p>
                         </div>
                    </div>

                    <DialogFooter>
                         <Button
                              variant="outline"
                              onClick={() => onOpenChange(false)}
                              disabled={isSubmitting}
                         >
                              Cancel
                         </Button>
                         <Button
                              onClick={onConfirm}
                              disabled={isSubmitting}
                         >
                              {isSubmitting && <Spinner className="mr-2 h-4 w-4" />}
                              Confirm Withdrawal
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     );
}
