import { Button } from "@/components/ui/button"
import { Order } from "@/types/order"
import { Loader2, ShoppingBag } from "lucide-react"
import OrderItem from "./order-item"

type OrdersListProps = {
    orders: Order[]
    isLoading: boolean
    hasError: boolean
    searchQuery: string
    onRetry: () => void
}

export default function OrdersList({
    orders,
    isLoading,
    hasError,
    searchQuery,
    onRetry
}: OrdersListProps) {
    if (isLoading) {
        return (
            <div className="text-center py-12 border rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Loading your orders...</p>
            </div>
        )
    }

    if (hasError) {
        return (
            <div className="text-center py-12 border rounded-lg border-red-200 bg-red-50">
                <p className="text-red-600 mb-4">Failed to load orders</p>
                <Button variant="outline" onClick={onRetry}>
                    Retry
                </Button>
            </div>
        )
    }

    if (orders.length > 0) {
        return (
            <div className="space-y-3">
                {orders.map((order) => (
                    <OrderItem key={order.id} order={order} />
                ))}
            </div>
        )
    }

    return (
        <div className="text-center py-12 border rounded-lg">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">
                {searchQuery ? "No orders found matching your search." : "No orders yet."}
            </p>
        </div>
    )
}
