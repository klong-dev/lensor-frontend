"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Order } from "@/types/order"
import { ChevronRight, Package, Calendar, CreditCard, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface OrderItemProps {
    order: Order
}

export default function OrderItem({ order }: OrderItemProps) {
    const router = useRouter()
    const isReported = order.status === 'reported'

    const getPaymentMethodLabel = (method: string) => {
        switch (method) {
            case 'wallet':
                return 'Wallet'
            case 'vnpay':
                return 'VNPay'
            case 'credit_card':
                return 'Credit Card'
            default:
                return method
        }
    }

    return (
        <Card
            className="p-4 hover:shadow-md transition-shadow cursor-pointer hover:opacity-80"
            onClick={() => router.push(`/purchased-presets/${order.id}`)}
        >
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg truncate">
                                    Order #{order.id.slice(0, 8)}
                                </h3>
                                {isReported && (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>This order has been reported</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                                Transaction: {order.transactionId}
                            </p>
                        </div>

                        <div className="text-right flex-shrink-0">
                            <div className="text-xl font-bold">
                                - {parseFloat(order.totalAmount).toLocaleString('vi-VN')} ₫
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <CreditCard className="h-4 w-4" />
                            <span>{getPaymentMethodLabel(order.paymentMethod)}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Package className="h-4 w-4" />
                            <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                        </div>
                    </div>

                    {order.items.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                            <p className="text-sm text-muted-foreground">
                                Products: {order.items.map(item => item.productTitle).join(', ')}
                            </p>
                        </div>
                    )}
                </div>

                <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>
        </Card>
    )
}
