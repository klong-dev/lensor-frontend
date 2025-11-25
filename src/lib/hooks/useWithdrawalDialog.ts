import { useState } from 'react'
import { withdrawalApi } from '@/lib/apis/withdrawalApi'
import { toast } from 'sonner'

export const useWithdrawalDialog = (
     onSuccess: () => void,
     clearSelectedOrders: () => void
) => {
     const [isWithdrawing, setIsWithdrawing] = useState(false)
     const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false)
     const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)

     const handleWithdrawClick = (selectedOrdersCount: number) => {
          if (selectedOrdersCount === 0) {
               toast.error('Please select at least one order to withdraw')
               return
          }
          setIsWithdrawDialogOpen(true)
     }

     const handleWithdraw = async (bankCardId: string, orderIds: string[], note?: string) => {
          try {
               setIsWithdrawing(true)
               await withdrawalApi.createWithdrawal({ bankCardId, orderIds, note })

               setIsWithdrawDialogOpen(false)
               setIsSuccessDialogOpen(true)
               clearSelectedOrders()
               await onSuccess()
          } catch (error: any) {
               const errorMessage = error.response?.data?.message || 'Failed to create withdrawal request'
               toast.error(errorMessage)
          } finally {
               setIsWithdrawing(false)
          }
     }

     return {
          isWithdrawing,
          isWithdrawDialogOpen,
          isSuccessDialogOpen,
          setIsWithdrawDialogOpen,
          setIsSuccessDialogOpen,
          handleWithdrawClick,
          handleWithdraw,
     }
}
