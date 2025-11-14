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

export default function SoldOrdersPage() {
     const [orders, setOrders] = useState<SoldOrder[]>([]);
     const [filteredOrders, setFilteredOrders] = useState<SoldOrder[]>([]);
     const [loading, setLoading] = useState(false);
     const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
     const [selectedOrder, setSelectedOrder] = useState<SoldOrder | null>(null);
     const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
     const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
     const [isWithdrawing, setIsWithdrawing] = useState(false);

     useEffect(() => {
          fetchOrders();
     }, []);

     useEffect(() => {
          filterOrders();
     }, [activeTab, orders]);

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

     const filterOrders = () => {
          if (activeTab === 'all') {
               setFilteredOrders(orders);
          } else {
               setFilteredOrders(orders.filter(order => order.status === activeTab));
          }
     };

     const handleViewDetails = (order: SoldOrder) => {
          setSelectedOrder(order);
          setIsDetailDialogOpen(true);
     };

     const handleWithdrawClick = (order: SoldOrder) => {
          setSelectedOrder(order);
          setIsWithdrawDialogOpen(true);
     };

     const handleWithdrawFromDetails = () => {
          if (selectedOrder) {
               setIsDetailDialogOpen(false);
               setIsWithdrawDialogOpen(true);
          }
     };

     const handleWithdraw = async () => {
          if (!selectedOrder) return;

          try {
               setIsWithdrawing(true);
               await orderApi.withdrawOrder(selectedOrder.id);
               toast.success('Withdrawal successful! Funds have been added to your wallet.');
               setIsWithdrawDialogOpen(false);
               setSelectedOrder(null);
               fetchOrders();
          } catch (error: any) {
               console.error('Error withdrawing:', error);
               toast.error(error.response?.data?.message || 'Failed to withdraw funds');
          } finally {
               setIsWithdrawing(false);
          }
     };

     return (
          <div className="container mx-auto py-6 space-y-6 p-8">
               {/* Header */}
               <div>
                    <h1 className="text-3xl font-bold">Sold Orders Management</h1>
                    <p className="text-muted-foreground mt-1">
                         Manage your sold orders and withdraw earnings
                    </p>
               </div>

               {/* Stats Cards */}
               <OrderStats orders={orders} />

               {/* Orders Table */}
               <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                    <TabsList>
                         <TabsTrigger value="all">All Orders</TabsTrigger>
                         <TabsTrigger value="ready_for_withdrawal">Ready to Withdraw</TabsTrigger>
                         <TabsTrigger value="pending">Pending</TabsTrigger>
                         <TabsTrigger value="completed">Completed</TabsTrigger>
                         <TabsTrigger value="reported">Reported</TabsTrigger>
                         <TabsTrigger value="refunded">Refunded</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-4">
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
                                             onViewDetails={handleViewDetails}
                                             onWithdraw={handleWithdrawClick}
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
                    order={selectedOrder}
                    open={isWithdrawDialogOpen}
                    onOpenChange={setIsWithdrawDialogOpen}
                    onConfirm={handleWithdraw}
                    isSubmitting={isWithdrawing}
               />
          </div>
     );
}
