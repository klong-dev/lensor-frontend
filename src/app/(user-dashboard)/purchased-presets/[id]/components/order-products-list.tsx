"use client"

import { OrderProductDetail } from "@/types/order"
import ProductDetailItem from "./product-detail-item"

interface OrderProductsListProps {
    products: OrderProductDetail[]
}

export default function OrderProductsList({ products }: OrderProductsListProps) {
    return (
        <div className="space-y-4">
            {products.map((product) => (
                <ProductDetailItem
                    key={product.productId}
                    product={product}
                />
            ))}
        </div>
    )
}
