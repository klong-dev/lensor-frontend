"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOrderProducts } from "@/lib/hooks/useOrderHooks"
import { ArrowLeft, Calendar, Package, Loader2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import OrderProductsList from "./components/order-products-list"

export default function OrderDetailPage() {
    const params = useParams()
    const router = useRouter()
    const orderId = params.id as string

    const { data, isLoading, error } = useOrderProducts(orderId)

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500/10 text-green-600 border-green-500/20'
            case 'pending':
                return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
            case 'cancelled':
                return 'bg-red-500/10 text-red-600 border-red-500/20'
            case 'refunded':
                return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
            default:
                return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
        }
    }

    if (isLoading) {
        return (
            <div className="p-5">
                <div className="text-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Loading order details...</p>
                </div>
            </div>
        )
    }

    if (error || !data?.data) {
        return (
            <div className="p-5">
                <div className="text-center py-12 border rounded-lg border-red-200 bg-red-50">
                    <p className="text-red-600 mb-4">Failed to load order details</p>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Retry
                    </Button>
                </div>
            </div>
        )
    }

    const orderData = data.data
    const firstProduct = orderData.products[0]

    return (
        <div className="p-5 space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push('/purchased-presets')}
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Order Details</h1>
                    <p className="text-muted-foreground mt-1">
                        Order #{orderId.slice(0, 8)}
                    </p>
                </div>
            </div>

            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <div className="text-sm text-muted-foreground mb-1">Status</div>
                        <Badge className={getStatusColor(orderData.status)}>
                            {orderData.status}
                        </Badge>
                    </div>

                    <div>
                        <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                        <div className="text-xl font-bold">
                            {parseFloat(orderData.totalAmount).toLocaleString('vi-VN')} ₫
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                            <Package className="h-4 w-4" />
                            Products
                        </div>
                        <div className="text-xl font-semibold">
                            {orderData.products.length}
                        </div>
                    </div>

                    {firstProduct?.productDetails && (
                        <div>
                            <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Order Date
                            </div>
                            <div className="text-base font-medium">
                                {new Date(firstProduct.productDetails.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            <div>
                <h2 className="text-xl font-semibold mb-4">Products in this Order</h2>
                <OrderProductsList products={orderData.products} />
            </div>
        </div>
    )
}