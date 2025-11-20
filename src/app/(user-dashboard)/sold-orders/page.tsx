"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { orderApi } from '@/lib/apis/orderApi';
import { OrderStatus, SoldOrder } from '@/types/order';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { OrderDetailsDialog } from './components/order-details-dialog';
import { OrderStats } from './components/order-stats';
import { OrdersTable } from './components/orders-table';
import { WithdrawDialog } from './components/withdraw-dialog';
import { withdrawalApi } from '@/lib/apis/withdrawalApi';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle2, History, Clock, CheckCircle, XCircle, AlertTriangle, Eye, Image as ImageIcon, BarChart3, TrendingUp, Headphones } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Withdrawal, WithdrawalStatistics } from '@/types/withdrawal';
import { CreateTicketDialog } from './components/create-ticket-dialog';
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
} from '@/components/ui/dialog';
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from '@/components/ui/select';

export default function SoldOrdersPage() {
     const [orders, setOrders] = useState<SoldOrder[]>([]);
     const [filteredOrders, setFilteredOrders] = useState<SoldOrder[]>([]);
     const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
     const [loading, setLoading] = useState(false);
     const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
     const [selectedOrder, setSelectedOrder] = useState<SoldOrder | null>(null);
     const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
     const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
     const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
     const [isWithdrawing, setIsWithdrawing] = useState(false);
     const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
     const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
     const [loadingHistory, setLoadingHistory] = useState(false);
     const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
     const [previewImageUrl, setPreviewImageUrl] = useState<string>('');
     const [statistics, setStatistics] = useState<WithdrawalStatistics | null>(null);
     const [loadingStats, setLoadingStats] = useState(false);
     const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);

     useEffect(() => {
          fetchOrders();
          fetchStatistics();
     }, []);

     useEffect(() => {
          filterOrders();
     }, [activeTab, orders]);

     useEffect(() => {
          if (activeTab !== 'ready_for_withdrawal') {
               setSelectedOrders([]);
          }
     }, [activeTab]);

     const fetchOrders = async () => {
          try {
               setLoading(true);
               const response = await orderApi.getSoldOrders();
               setOrders(response.data);
          } catch (error) {
               console.error('Error fetching orders:', error);
               toast.error('Failed to fetch orders');
          } finally {
               setLoading(false);
          }
     };

     const fetchWithdrawals = async () => {
          try {
               setLoadingHistory(true);
               const response = await withdrawalApi.getWithdrawals();
               setWithdrawals(response.data);
          } catch (error) {
               console.error('Error fetching withdrawals:', error);
               toast.error('Failed to fetch withdrawal history');
          } finally {
               setLoadingHistory(false);
          }
     };

     const fetchStatistics = async () => {
          try {
               setLoadingStats(true);
               const response = await withdrawalApi.getStatistics();
               setStatistics(response.data);
          } catch (error) {
               console.error('Error fetching statistics:', error);
               toast.error('Failed to fetch statistics');
          } finally {
               setLoadingStats(false);
          }
     };

     // Open history modal and fetch withdrawals
     const handleOpenHistory = async () => {
          setIsHistoryDialogOpen(true);
          if (withdrawals.length === 0) {
               await fetchWithdrawals();
          }
          if (!statistics) {
               await fetchStatistics();
          }
     };

     const filterOrders = () => {
          if (activeTab === 'all') {
               setFilteredOrders(orders);
          } else {
               setFilteredOrders(orders.filter(order => order.status === activeTab));
          }
     };

     // Check if order is already withdrawn
     const isOrderWithdrawn = (orderId: string) => {
          return withdrawals.some(w =>
               w.orderIds.includes(orderId) &&
               (w.status === 'approved' || w.status === 'pending')
          );
     };

     const handleViewDetails = (order: SoldOrder) => {
          setSelectedOrder(order);
          setIsDetailDialogOpen(true);
     };

     // Withdraw single or multiple orders
     const handleWithdrawClick = (order?: SoldOrder) => {
          if (order) {
               // Withdraw specific order
               setSelectedOrders([order.id]);
          } else if (selectedOrders.length === 0) {
               // Withdraw multiple but none selected
               toast.error('Please select at least one order to withdraw');
               return;
          }
          setIsWithdrawDialogOpen(true);
     };

     // Select/deselect single order
     const handleOrderSelect = (orderId: string, checked: boolean) => {
          setSelectedOrders(prev =>
               checked ? [...prev, orderId] : prev.filter(id => id !== orderId)
          );
     };

     // Select/deselect all withdrawable orders
     const handleSelectAll = (checked: boolean) => {
          setSelectedOrders(checked
               ? filteredOrders.filter(o => o.canWithdraw && o.status !== 'withdrawing').map(o => o.id)
               : []
          );
     };

     // Withdraw from order details dialog
     const handleWithdrawFromDetails = () => {
          if (selectedOrder) {
               setIsDetailDialogOpen(false);
               handleWithdrawClick(selectedOrder);
          }
     };

     // Confirm withdrawal
     const handleWithdraw = async (bankCardId: string, orderIds: string[], note?: string) => {
          try {
               setIsWithdrawing(true);

               // Call API to withdraw with multiple orderIds
               await withdrawalApi.createWithdrawal({ bankCardId, orderIds, note });

               // Close dialog and show success message
               setIsWithdrawDialogOpen(false);
               setIsSuccessDialogOpen(true);
               setSelectedOrders([]);

               // Refresh orders list
               await fetchOrders();
               await fetchWithdrawals();
          } catch (error: any) {
               const errorMessage = error.response?.data?.message || 'Failed to create withdrawal request';
               toast.error(errorMessage);
               console.error('Withdrawal error:', error);
          } finally {
               setIsWithdrawing(false);
          }
     };

     const formatCurrency = (amount: string | number) => {
          const num = typeof amount === 'string' ? parseFloat(amount) : amount;
          return new Intl.NumberFormat('vi-VN', {
               style: 'currency',
               currency: 'VND',
          }).format(num);
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

     const getWithdrawalStatusBadge = (status: string) => {
          const config: Record<string, { variant: any; label: string; icon: React.ReactNode; className?: string }> = {
               pending: {
                    variant: 'secondary',
                    label: 'Pending',
                    icon: <Clock className="h-3 w-3" />,
                    className: 'bg-yellow-500 hover:bg-yellow-600',
               },
               approved: {
                    variant: 'default',
                    label: 'Approved',
                    icon: <CheckCircle className="h-3 w-3" />,
                    className: 'bg-green-500 hover:bg-green-600',
               },
               rejected: {
                    variant: 'destructive',
                    label: 'Rejected',
                    icon: <XCircle className="h-3 w-3" />,
               },
               completed: {
                    variant: 'default',
                    label: 'Completed',
                    icon: <CheckCircle className="h-3 w-3" />,
                    className: 'bg-blue-500 hover:bg-blue-600',
               },
          };

          const item = config[status] || config.pending;
          return (
               <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${item.className || 'bg-gray-500'} text-white`}>
                    {item.icon}
                    {item.label}
               </span>
          );
     };

     const getImageUrl = (imagePath: string) => {
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://14.169.52.232:3005';
          return `${baseUrl}${imagePath}`;
     };

     const handleViewImage = (imageUrl: string) => {
          setPreviewImageUrl(getImageUrl(imageUrl));
          setImagePreviewOpen(true);
     };

     return (
          <div className="container mx-auto py-6 space-y-6 p-8">
               {/* Header */}
               <div className="flex items-center justify-between">
                    <div>
                         <h1 className="text-3xl font-bold">Sold Orders Management</h1>
                         <p className="text-muted-foreground mt-1">
                              Manage your sold orders and withdraw earnings
                         </p>
                    </div>
                    <div className="flex items-center gap-2">
                         <Button onClick={() => setIsTicketDialogOpen(true)} variant="outline">
                              <Headphones className="mr-2 h-4 w-4" />
                              Support
                         </Button>
                         <Button onClick={() => window.location.href = '/statistics'} variant="outline">
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Revenue Statistics
                         </Button>
                         <Button onClick={handleOpenHistory} variant="outline">
                              <History className="mr-2 h-4 w-4" />
                              Withdrawal History
                         </Button>
                    </div>
               </div>

               {/* Stats Cards */}
               <OrderStats orders={orders} statistics={statistics} />

               {/* Orders Table */}
               <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                    <TabsList>
                         <TabsTrigger value="all">All Orders</TabsTrigger>
                         <TabsTrigger value="ready_for_withdrawal">Ready to Withdraw</TabsTrigger>
                         <TabsTrigger value="completed">Waiting (3 days)</TabsTrigger>
                         <TabsTrigger value="withdrawing">Withdrawing</TabsTrigger>
                         <TabsTrigger value="withdrawn">Withdrawn</TabsTrigger>
                         <TabsTrigger value="reported">Reported</TabsTrigger>
                         <TabsTrigger value="refunded">Refunded</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-4">
                         {/* Bulk selection and withdrawal bar */}
                         {filteredOrders.some(o => o.canWithdraw && o.status !== 'withdrawing') && (
                              <Card className="bg-muted/50 mb-3">
                                   <CardContent className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                             <Checkbox
                                                  id="select-all"
                                                  checked={selectedOrders.length > 0 &&
                                                       selectedOrders.length === filteredOrders.filter(o => o.canWithdraw && o.status !== 'withdrawing').length}
                                                  onCheckedChange={handleSelectAll}
                                             />
                                             <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                                                  Select All ({filteredOrders.filter(o => o.canWithdraw && o.status !== 'withdrawing').length})
                                             </label>
                                             {selectedOrders.length > 0 && (
                                                  <span className="text-sm text-muted-foreground">
                                                       {selectedOrders.length} selected
                                                  </span>
                                             )}
                                        </div>
                                        {selectedOrders.length > 0 && (
                                             <Button onClick={() => handleWithdrawClick()}>
                                                  <Wallet className="mr-2 h-4 w-4" />
                                                  Withdraw ({selectedOrders.length})
                                             </Button>
                                        )}
                                   </CardContent>
                              </Card>
                         )}

                         <Card>
                              <CardHeader>
                                   <CardTitle>Orders</CardTitle>
                                   <CardDescription>
                                        {loading ? 'Loading...' : `${filteredOrders.length} order(s)`}
                                   </CardDescription>
                              </CardHeader>
                              <CardContent>
                                   {loading ? (
                                        <div className="flex justify-center items-center py-12">
                                             <Spinner className="h-8 w-8" />
                                        </div>
                                   ) : filteredOrders.length === 0 ? (
                                        <div className="text-center py-12 text-muted-foreground">
                                             No orders found
                                        </div>
                                   ) : (
                                        <OrdersTable
                                             orders={filteredOrders}
                                             withdrawals={withdrawals}
                                             onViewDetails={handleViewDetails}
                                             onWithdraw={handleWithdrawClick}
                                             selectedOrders={selectedOrders}
                                             onOrderSelect={handleOrderSelect}
                                             showCheckboxes={filteredOrders.some(o => o.canWithdraw === true && o.status !== 'withdrawing')}
                                        />
                                   )}
                              </CardContent>
                         </Card>
                    </TabsContent>
               </Tabs>

               {/* Dialogs */}
               <OrderDetailsDialog
                    order={selectedOrder}
                    open={isDetailDialogOpen}
                    onOpenChange={setIsDetailDialogOpen}
                    onWithdraw={handleWithdrawFromDetails}
               />

               <WithdrawDialog
                    orders={orders.filter(o => selectedOrders.includes(o.id))}
                    open={isWithdrawDialogOpen}
                    onOpenChange={setIsWithdrawDialogOpen}
                    onConfirm={handleWithdraw}
                    isSubmitting={isWithdrawing}
               />

               {/* Success Confirmation Dialog */}
               <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                         <DialogHeader>
                              <div className="flex justify-center mb-4">
                                   <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                                        <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                                   </div>
                              </div>
                              <DialogTitle className="text-center text-2xl">Withdrawal Request Submitted</DialogTitle>
                              <DialogDescription className="text-center">
                                   Your withdrawal request has been successfully submitted and is now pending admin review.
                              </DialogDescription>
                         </DialogHeader>

                         <div className="space-y-4 py-4">
                              <div className="p-4 bg-muted rounded-md space-y-2">
                                   <p className="text-sm text-muted-foreground text-center">
                                        <strong className="text-foreground">Processing Time:</strong>
                                   </p>
                                   <p className="text-sm text-center">
                                        Your request will be reviewed and processed within <strong className="text-foreground">24 business hours</strong>.
                                   </p>
                              </div>

                              <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
                                   <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
                                        You will receive a notification once your withdrawal has been approved and processed.
                                   </p>
                              </div>
                         </div>

                         <DialogFooter className="sm:justify-center">
                              <Button onClick={() => setIsSuccessDialogOpen(false)} className="w-full sm:w-auto">
                                   Got it, thanks!
                              </Button>
                         </DialogFooter>
                    </DialogContent>
               </Dialog>

               {/* Withdrawal History Dialog */}
               <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
                    <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                         <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                   <History className="h-5 w-5" />
                                   Withdrawal History
                              </DialogTitle>
                              <DialogDescription>
                                   View your recent withdrawal transactions
                              </DialogDescription>
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
                                                  onClick={() => window.location.href = '/statistics'}
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
                              {loadingHistory ? (
                                   <div className="flex justify-center items-center py-12">
                                        <Spinner className="h-8 w-8" />
                                   </div>
                              ) : withdrawals.length === 0 ? (
                                   <div className="text-center py-12 text-muted-foreground">
                                        No withdrawal history found
                                   </div>
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
                                                                 {getWithdrawalStatusBadge(withdrawal.status)}
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
                                                                 <p className="text-xs text-muted-foreground">Fee (17%)</p>
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
                                                                      {withdrawal.bankInfo.bankName}<br />
                                                                      {withdrawal.bankInfo.accountNumber}<br />
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
                                                                                onClick={() => handleViewImage(withdrawal.paymentProofImageUrl![0])}
                                                                           />
                                                                           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center cursor-pointer"
                                                                                onClick={() => handleViewImage(withdrawal.paymentProofImageUrl![0])}
                                                                           >
                                                                                <Eye className="h-6 w-6 text-white" />
                                                                           </div>
                                                                      </div>
                                                                      <Button
                                                                           variant="outline"
                                                                           size="sm"
                                                                           onClick={() => handleViewImage(withdrawal.paymentProofImageUrl![0])}
                                                                      >
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
                              <Button onClick={() => setIsHistoryDialogOpen(false)}>Close</Button>
                         </DialogFooter>
                    </DialogContent>
               </Dialog>

               {/* Image Preview Dialog */}
               <Dialog open={imagePreviewOpen} onOpenChange={setImagePreviewOpen}>
                    <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
                         <DialogHeader>
                              <DialogTitle>Payment Proof</DialogTitle>
                              <DialogDescription>
                                   Bank transfer screenshot
                              </DialogDescription>
                         </DialogHeader>
                         <div className="flex justify-center items-center p-4 bg-muted/30 rounded-lg overflow-hidden">
                              <img
                                   src={previewImageUrl}
                                   alt="Payment Proof"
                                   className="max-w-full max-h-[70vh] object-contain rounded-md"
                                   onError={(e) => {
                                        e.currentTarget.src = '/placeholder-image.png';
                                   }}
                              />
                         </div>
                         <DialogFooter>
                              <Button onClick={() => setImagePreviewOpen(false)}>Close</Button>
                              <Button
                                   variant="outline"
                                   onClick={() => window.open(previewImageUrl, '_blank')}
                              >
                                   Open in New Tab
                              </Button>
                         </DialogFooter>
                    </DialogContent>
               </Dialog>

               {/* Create Ticket Dialog */}
               <CreateTicketDialog
                    open={isTicketDialogOpen}
                    onOpenChange={setIsTicketDialogOpen}
                    onSuccess={() => toast.success('Your support request has been submitted')}
               />
          </div>
     );
}
