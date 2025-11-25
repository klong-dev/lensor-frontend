import { useState, useEffect } from 'react'
import { orderApi } from '@/lib/apis/orderApi'
import { withdrawalApi } from '@/lib/apis/withdrawalApi'
import { OrderStatus, SoldOrder } from '@/types/order'
import { Withdrawal, WithdrawalStatistics } from '@/types/withdrawal'
import { toast } from 'sonner'

export const useSoldOrders = () => {
     const [orders, setOrders] = useState<SoldOrder[]>([])
     const [filteredOrders, setFilteredOrders] = useState<SoldOrder[]>([])
     const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([])
     const [statistics, setStatistics] = useState<WithdrawalStatistics | null>(null)
     const [loading, setLoading] = useState(false)
     const [loadingHistory, setLoadingHistory] = useState(false)
     const [loadingStats, setLoadingStats] = useState(false)
     const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all')
     const [selectedOrders, setSelectedOrders] = useState<string[]>([])

     useEffect(() => {
          fetchOrders()
          fetchStatistics()
     }, [])

     useEffect(() => {
          filterOrders()
     }, [activeTab, orders])

     useEffect(() => {
          if (activeTab !== 'ready_for_withdrawal') {
               setSelectedOrders([])
          }
     }, [activeTab])

     const fetchOrders = async () => {
          try {
               setLoading(true)
               const response = await orderApi.getSoldOrders()
               setOrders(response.data)
          } catch (error) {
               console.error('Error fetching orders:', error)
               toast.error('Failed to fetch orders')
          } finally {
               setLoading(false)
          }
     }

     const fetchWithdrawals = async () => {
          try {
               setLoadingHistory(true)
               const response = await withdrawalApi.getWithdrawals()
               setWithdrawals(response.data)
          } catch (error) {
               console.error('Error fetching withdrawals:', error)
               toast.error('Failed to fetch withdrawal history')
          } finally {
               setLoadingHistory(false)
          }
     }

     const fetchStatistics = async () => {
          try {
               setLoadingStats(true)
               const response = await withdrawalApi.getStatistics()
               setStatistics(response.data)
          } catch (error) {
               console.error('Error fetching statistics:', error)
               toast.error('Failed to fetch statistics')
          } finally {
               setLoadingStats(false)
          }
     }

     const filterOrders = () => {
          if (activeTab === 'all') {
               setFilteredOrders(orders)
          } else {
               setFilteredOrders(orders.filter(order => order.status === activeTab))
          }
     }

     const handleOrderSelect = (orderId: string, checked: boolean) => {
          setSelectedOrders(prev =>
               checked ? [...prev, orderId] : prev.filter(id => id !== orderId)
          )
     }

     const handleSelectAll = (checked: boolean) => {
          setSelectedOrders(checked
               ? filteredOrders.filter(o => o.canWithdraw && o.status !== 'withdrawing').map(o => o.id)
               : []
          )
     }

     return {
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
     }
}
