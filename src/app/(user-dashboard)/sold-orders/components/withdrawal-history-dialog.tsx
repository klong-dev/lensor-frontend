import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { WithdrawalStatusBadge } from '@/components/ui/status-badges'
import { Withdrawal, WithdrawalStatistics } from '@/types/withdrawal'
import { formatCurrency, formatDate, getImageUrl } from '@/utils/formatters'
import { BarChart3, Eye, History } from 'lucide-react'

interface WithdrawalHistoryDialogProps {
     open: boolean
     onOpenChange: (open: boolean) => void
     withdrawals: Withdrawal[]
     statistics: WithdrawalStatistics | null
     loading: boolean
     loadingStats: boolean
     discountRate: string
     onViewImage: (imageUrl: string) => void
}

export function WithdrawalHistoryDialog({
     open,
     onOpenChange,
     withdrawals,
     statistics,
     loading,
     loadingStats,
     discountRate,
     onViewImage,
}: WithdrawalHistoryDialogProps) {
     return (
          <Dialog open={open} onOpenChange={onOpenChange}>
               <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                         <DialogTitle className="flex items-center gap-2">
                              <History className="h-5 w-5" />
                              Withdrawal History
                         </DialogTitle>
                         <DialogDescription>View your recent withdrawal transactions</DialogDescription>
                    </DialogHeader>

                    {/* Quick Statistics Summary */}
                    <div className="space-y-4">
                         {loadingStats ? (
                              <div className="flex justify-center items-center py-4">
                                   <Spinner className="h-6 w-6" />
                              </div>
                         ) : statistics ? (
                              <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg p-5 border border-blue-200 dark:border-blue-800">
                                   <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                             <h3 className="text-sm font-medium text-muted-foreground mb-3">Revenue Summary</h3>
                                             <div className="grid grid-cols-2 gap-4">
                                                  <div>
                                                       <p className="text-xs text-muted-foreground">Total Withdrawals</p>
                                                       <p className="text-2xl font-bold text-blue-700 dark:text-blue-400 mt-1">
                                                            {statistics.totalWithdrawals}
                                                       </p>
                                                  </div>
                                                  <div>
                                                       <p className="text-xs text-muted-foreground">Total Received</p>
                                                       <p className="text-2xl font-bold text-green-700 dark:text-green-400 mt-1">
                                                            {formatCurrency(statistics.totalActualAmount)}
                                                       </p>
                                                  </div>
                                             </div>
                                        </div>
                                        <Button
                                             variant="outline"
                                             size="sm"
                                             className="flex items-center gap-2"
                                             onClick={() => (window.location.href = '/statistics')}
                                        >
                                             <BarChart3 className="h-4 w-4" />
                                             View Details
                                        </Button>
                                   </div>
                              </div>
                         ) : null}
                    </div>

                    {/* History Section */}
                    <div className="space-y-4 mt-6">
                         <h3 className="text-lg font-semibold flex items-center gap-2">
                              <History className="h-5 w-5" />
                              Transaction History
                         </h3>
                         {loading ? (
                              <div className="flex justify-center items-center py-12">
                                   <Spinner className="h-8 w-8" />
                              </div>
                         ) : withdrawals.length === 0 ? (
                              <div className="text-center py-12 text-muted-foreground">No withdrawal history found</div>
                         ) : (
                              <div className="space-y-3">
                                   {withdrawals.map((withdrawal) => (
                                        <Card key={withdrawal.id} className="p-4">
                                             <div className="space-y-3">
                                                  <div className="flex items-center justify-between">
                                                       <div className="flex items-center gap-3">
                                                            <div>
                                                                 <p className="text-sm font-medium">Withdrawal ID</p>
                                                                 <p className="text-xs font-mono text-muted-foreground">
                                                                      {withdrawal.id.substring(0, 12)}...
                                                                 </p>
                                                            </div>
                                                            <WithdrawalStatusBadge status={withdrawal.status} />
                                                       </div>
                                                       <div className="text-right">
                                                            <p className="text-sm text-muted-foreground">Requested</p>
                                                            <p className="text-sm font-medium">{formatDate(withdrawal.createdAt)}</p>
                                                       </div>
                                                  </div>

                                                  <div className="grid grid-cols-3 gap-4 p-3 bg-muted rounded-md">
                                                       <div>
                                                            <p className="text-xs text-muted-foreground">Amount</p>
                                                            <p className="text-sm font-semibold">{formatCurrency(withdrawal.amount)}</p>
                                                       </div>
                                                       <div>
                                                            <p className="text-xs text-muted-foreground">Fee ({discountRate}%)</p>
                                                            <p className="text-sm font-semibold text-red-600">-{formatCurrency(withdrawal.fee)}</p>
                                                       </div>
                                                       <div>
                                                            <p className="text-xs text-muted-foreground">Actual Amount</p>
                                                            <p className="text-sm font-bold text-green-600">{formatCurrency(withdrawal.actualAmount)}</p>
                                                       </div>
                                                  </div>

                                                  <div className="space-y-2">
                                                       <div className="flex items-start justify-between text-sm">
                                                            <span className="text-muted-foreground">Bank:</span>
                                                            <span className="font-medium text-right">
                                                                 {withdrawal.bankInfo.bankName}
                                                                 <br />
                                                                 {withdrawal.bankInfo.accountNumber}
                                                                 <br />
                                                                 {withdrawal.bankInfo.accountHolder}
                                                            </span>
                                                       </div>
                                                       <div className="flex items-start justify-between text-sm">
                                                            <span className="text-muted-foreground">Orders:</span>
                                                            <span className="font-medium">{withdrawal.orderIds.length} order(s)</span>
                                                       </div>
                                                       {withdrawal.note && (
                                                            <div className="flex items-start justify-between text-sm">
                                                                 <span className="text-muted-foreground">Note:</span>
                                                                 <span className="font-medium text-right max-w-[300px]">{withdrawal.note}</span>
                                                            </div>
                                                       )}
                                                  </div>

                                                  {withdrawal.paymentProofImageUrl && withdrawal.paymentProofImageUrl.length > 0 && (
                                                       <div className="space-y-2">
                                                            <p className="text-sm font-medium text-muted-foreground">Payment Proof:</p>
                                                            <div className="flex items-center gap-2">
                                                                 <div className="relative group">
                                                                      <img
                                                                           src={getImageUrl(withdrawal.paymentProofImageUrl[0])}
                                                                           alt="Payment Proof Thumbnail"
                                                                           className="h-20 w-20 object-cover rounded-md border cursor-pointer"
                                                                           onClick={() => onViewImage(withdrawal.paymentProofImageUrl![0])}
                                                                      />
                                                                      <div
                                                                           className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center cursor-pointer"
                                                                           onClick={() => onViewImage(withdrawal.paymentProofImageUrl![0])}
                                                                      >
                                                                           <Eye className="h-6 w-6 text-white" />
                                                                      </div>
                                                                 </div>
                                                                 <Button variant="outline" size="sm" onClick={() => onViewImage(withdrawal.paymentProofImageUrl![0])}>
                                                                      <Eye className="h-4 w-4 mr-2" />
                                                                      View Full Image
                                                                 </Button>
                                                            </div>
                                                       </div>
                                                  )}

                                                  {withdrawal.adminResponse && (
                                                       <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
                                                            <p className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-1">Admin Response:</p>
                                                            <p className="text-sm text-blue-700 dark:text-blue-300">{withdrawal.adminResponse}</p>
                                                            {withdrawal.processedAt && (
                                                                 <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                                                                      Processed: {formatDate(withdrawal.processedAt)}
                                                                 </p>
                                                            )}
                                                       </div>
                                                  )}
                                             </div>
                                        </Card>
                                   ))}
                              </div>
                         )}
                    </div>

                    <DialogFooter>
                         <Button onClick={() => onOpenChange(false)}>Close</Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}
