"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDiscountRate } from '@/lib/hooks/useDiscountRate';
import { SoldOrder } from '@/types/order';
import { getImageUrl } from '@/utils/formatters';
import { useState } from 'react';
import { toast } from 'sonner';
import { BulkActionBar } from './components/bulk-action-bar';
import { CreateTicketDialog } from './components/create-ticket-dialog';
import { ImagePreviewDialog } from './components/image-preview-dialog';
import { OrderDetailsDialog } from './components/order-details-dialog';
import { OrderStats } from './components/order-stats';
import { OrdersTable } from './components/orders-table';
import { PageHeader } from './components/page-header';
import { SuccessDialog } from './components/success-dialog';
import { WithdrawDialog } from './components/withdraw-dialog';
import { WithdrawalHistoryDialog } from './components/withdrawal-history-dialog';
import { useSoldOrders } from '../../../lib/hooks/useSoldOrders';
import { useWithdrawalDialog } from '../../../lib/hooks/useWithdrawalDialog';

export default function SoldOrdersPage() {
     const { discountRate, discountRateNum } = useDiscountRate()
     const {
          orders,
          filteredOrders,
          withdrawals,
          statistics,
          loading,
          loadingHistory,
          loadingStats,
          activeTab,
          selectedOrders,
          setActiveTab,
          setSelectedOrders,
          fetchOrders,
          fetchWithdrawals,
          fetchStatistics,
          handleOrderSelect,
          handleSelectAll,
     } = useSoldOrders()

     const {
          isWithdrawing,
          isWithdrawDialogOpen,
          isSuccessDialogOpen,
          setIsWithdrawDialogOpen,
          setIsSuccessDialogOpen,
          handleWithdrawClick,
          handleWithdraw,
     } = useWithdrawalDialog(
          async () => {
               await fetchOrders()
               await fetchWithdrawals()
          },
          () => setSelectedOrders([])
     )

     const [selectedOrder, setSelectedOrder] = useState<SoldOrder | null>(null)
     const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
     const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
     const [imagePreviewOpen, setImagePreviewOpen] = useState(false)
     const [previewImageUrl, setPreviewImageUrl] = useState<string>('')
     const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false)

     const handleOpenHistory = async () => {
          setIsHistoryDialogOpen(true);
          if (withdrawals.length === 0) {
               await fetchWithdrawals();
          }
          if (!statistics) {
               await fetchStatistics();
          }
     }

     const handleViewDetails = (order: SoldOrder) => {
          setSelectedOrder(order);
          setIsDetailDialogOpen(true);
     }

     const handleWithdrawFromDetails = () => {
          if (selectedOrder) {
               setIsDetailDialogOpen(false);
               setSelectedOrders([selectedOrder.id]);
               setIsWithdrawDialogOpen(true);
          }
     }

     const handleViewImage = (imageUrl: string) => {
          setPreviewImageUrl(getImageUrl(imageUrl));
          setImagePreviewOpen(true);
     }

     const withdrawableCount = filteredOrders.filter((o) => o.canWithdraw && o.status !== 'withdrawing').length;
     const showBulkActions = withdrawableCount > 0;

     return (
          <div className="container mx-auto py-6 space-y-6 p-8">
               <PageHeader onOpenTicket={() => setIsTicketDialogOpen(true)} onOpenHistory={handleOpenHistory} />

               <OrderStats orders={orders} statistics={statistics} discountRate={discountRate} />

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
                         {showBulkActions && (
                              <BulkActionBar
                                   totalWithdrawable={withdrawableCount}
                                   selectedCount={selectedOrders.length}
                                   onSelectAll={handleSelectAll}
                                   onWithdraw={() => handleWithdrawClick(selectedOrders.length)}
                              />
                         )}

                         <Card>
                              <CardHeader>
                                   <CardTitle>Orders</CardTitle>
                                   <CardDescription>{loading ? 'Loading...' : `${filteredOrders.length} order(s)`}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                   {loading ? (
                                        <div className="flex justify-center items-center py-12">
                                             <Spinner className="h-8 w-8" />
                                        </div>
                                   ) : filteredOrders.length === 0 ? (
                                        <div className="text-center py-12 text-muted-foreground">No orders found</div>
                                   ) : (
                                        <OrdersTable
                                             orders={filteredOrders}
                                             withdrawals={withdrawals}
                                             onViewDetails={handleViewDetails}
                                             onWithdraw={(order) => {
                                                  setSelectedOrders([order.id]);
                                                  setIsWithdrawDialogOpen(true);
                                             }}
                                             selectedOrders={selectedOrders}
                                             onOrderSelect={handleOrderSelect}
                                             showCheckboxes={showBulkActions}
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
                    discountRateNum={discountRateNum}
               />

               <WithdrawDialog
                    orders={orders.filter((o) => selectedOrders.includes(o.id))}
                    open={isWithdrawDialogOpen}
                    onOpenChange={setIsWithdrawDialogOpen}
                    onConfirm={handleWithdraw}
                    isSubmitting={isWithdrawing}
                    feePercentage={discountRateNum}
               />

               <SuccessDialog
                    open={isSuccessDialogOpen}
                    onOpenChange={setIsSuccessDialogOpen}
               />

               <WithdrawalHistoryDialog
                    open={isHistoryDialogOpen}
                    onOpenChange={setIsHistoryDialogOpen}
                    withdrawals={withdrawals}
                    statistics={statistics}
                    loading={loadingHistory}
                    loadingStats={loadingStats}
                    discountRate={discountRate}
                    onViewImage={handleViewImage}
               />

               <ImagePreviewDialog
                    open={imagePreviewOpen}
                    onOpenChange={setImagePreviewOpen}
                    imageUrl={previewImageUrl}
               />

               <CreateTicketDialog
                    open={isTicketDialogOpen}
                    onOpenChange={setIsTicketDialogOpen}
                    onSuccess={() => toast.success('Your support request has been submitted')}
               />
          </div>
     )
}

