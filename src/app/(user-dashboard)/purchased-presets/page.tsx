"use client"

import { Input } from '@/components/ui/input'
import { useOrders } from '@/lib/hooks/useOrderHooks'
import { Order } from '@/types/order'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import OrdersList from "./components/orders-list"
import StatsCards from "./components/stats-cards"

export default function PurchasedPresets() {
     const [searchQuery, setSearchQuery] = useState("")
     const { data: ordersResponse, isLoading, error } = useOrders()

     const orders: Order[] = useMemo(() => {
          if (!ordersResponse?.data) return []
          return ordersResponse.data
     }, [ordersResponse])

     const filteredOrders = orders.filter(order => {
          if (!searchQuery.trim()) return true

          const searchLower = searchQuery.toLowerCase().trim()
          return (
               order.id.toLowerCase().includes(searchLower) ||
               order.transactionId.toLowerCase().includes(searchLower) ||
               order.items.some(item =>
                    item.productTitle.toLowerCase().includes(searchLower)
               )
          )
     })

     const totalOrders = orders.length
     const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0)
     const totalProducts = orders.reduce((sum, order) => sum + order.items.length, 0)

     return (
          <div className="p-5 space-y-6">
               <div className="flex items-center justify-between">
                    <div>
                         <h1 className="text-3xl font-bold">My Orders</h1>
                         <p className="text-muted-foreground mt-1">
                              View your order history and access purchased products
                         </p>
                    </div>
               </div>

               <StatsCards
                    totalOrders={totalOrders}
                    totalSpent={totalSpent}
                    totalProducts={totalProducts}
               />

               <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                         placeholder="Search orders by ID, transaction ID or product name..."
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         className="pl-10"
                    />
               </div>

               <OrdersList
                    orders={filteredOrders}
                    isLoading={isLoading}
                    hasError={!!error}
                    searchQuery={searchQuery}
                    onRetry={() => window.location.reload()}
               />
          </div>
     )
}
