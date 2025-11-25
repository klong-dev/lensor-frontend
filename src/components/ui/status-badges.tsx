import { Badge } from '@/components/ui/badge'
import { OrderStatus } from '@/types/order'
import { CheckCircle, XCircle, Clock, AlertTriangle, Wallet, CalendarClock } from 'lucide-react'

interface StatusConfig {
     variant: any
     label: string
     icon: React.ReactNode
     className?: string
}

const ORDER_STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
     ready_for_withdrawal: {
          variant: 'default',
          label: 'Ready for Withdrawal',
          icon: <CheckCircle className="h-3 w-3" />,
          className: 'bg-green-500 hover:bg-green-600',
     },
     pending: {
          variant: 'secondary',
          label: 'Pending',
          icon: <Clock className="h-3 w-3" />,
     },
     completed: {
          variant: 'default',
          label: 'Waiting (3 days)',
          icon: <Clock className="h-3 w-3" />,
          className: 'bg-amber-500 hover:bg-amber-600',
     },
     withdrawn: {
          variant: 'default',
          label: 'Withdrawn',
          icon: <CheckCircle className="h-3 w-3" />,
          className: 'bg-blue-500 hover:bg-blue-600',
     },
     withdrawing: {
          variant: 'default',
          label: 'Withdrawing',
          icon: <CalendarClock className="h-3 w-3" />,
          className: 'bg-orange-500 hover:bg-orange-600',
     },
     failed: {
          variant: 'destructive',
          label: 'Failed',
          icon: <XCircle className="h-3 w-3" />,
     },
     refunded: {
          variant: 'secondary',
          label: 'Refunded',
          icon: <AlertTriangle className="h-3 w-3" />,
     },
     reported: {
          variant: 'secondary',
          label: 'Reported',
          icon: <AlertTriangle className="h-3 w-3" />,
          className: 'bg-yellow-500 hover:bg-yellow-600',
     },
}

const WITHDRAWAL_STATUS_CONFIG: Record<string, StatusConfig> = {
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
}

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
     const config = ORDER_STATUS_CONFIG[status]

     if (!config) {
          return (
               <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {status}
               </Badge>
          )
     }

     return (
          <Badge variant={config.variant} className={`flex items-center gap-1 ${config.className || ''}`}>
               {config.icon}
               {config.label}
          </Badge>
     )
}

export const WithdrawalStatusBadge = ({ status }: { status: string }) => {
     const config = WITHDRAWAL_STATUS_CONFIG[status] || WITHDRAWAL_STATUS_CONFIG.pending

     return (
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${config.className || 'bg-gray-500'} text-white`}>
               {config.icon}
               {config.label}
          </span>
     )
}
