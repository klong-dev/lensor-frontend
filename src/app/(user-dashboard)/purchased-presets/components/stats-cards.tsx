type StatsCardsProps = {
    totalOrders: number
    totalSpent: number
    totalProducts: number
}

export default function StatsCards({ totalOrders, totalSpent, totalProducts }: StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card p-4 rounded-lg border">
                <div className="text-2xl font-bold">{totalOrders}</div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
            </div>
            <div className="bg-card p-4 rounded-lg border">
                <div className="text-2xl font-bold">
                    {totalSpent.toLocaleString('vi-VN')} ₫
                </div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
            </div>
            <div className="bg-card p-4 rounded-lg border">
                <div className="text-2xl font-bold">
                    {totalProducts}
                </div>
                <div className="text-sm text-muted-foreground">Total Products</div>
            </div>
        </div>
    )
}