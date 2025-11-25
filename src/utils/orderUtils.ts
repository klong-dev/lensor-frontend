import { SoldOrder } from '@/types/order'

/**
 * Calculate withdrawal details
 */
export const calculateWithdrawal = (orders: SoldOrder[], feePercentage: number) => {
     const totalEarnings = orders.reduce((sum, order) => sum + order.sellerEarnings, 0)
     const fee = totalEarnings * (feePercentage / 100)
     const finalAmount = totalEarnings - fee

     return { totalEarnings, fee, finalAmount }
}

/**
 * Get time remaining until order is withdrawable
 */
export const getTimeUntilWithdrawable = (withdrawableAt: string): string => {
     const now = new Date()
     const withdrawDate = new Date(withdrawableAt)
     const diff = withdrawDate.getTime() - now.getTime()

     if (diff <= 0) return 'Available now'

     const days = Math.floor(diff / (1000 * 60 * 60 * 24))
     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

     if (days > 0) return `${days}d ${hours}h`
     if (hours > 0) return `${hours}h ${minutes}m`
     return `${minutes}m`
}
