export type OrderItem = {
    productId: string
    productTitle: string
    quantity: number
    price: number
    subtotal: number
    sellerId: string
}

export type Order = {
    id: string
    userId: string
    totalAmount: string
    status: 'pending' | 'completed' | 'cancelled' | 'refunded'
    paymentMethod: 'wallet' | 'vnpay' | 'credit_card'
    transactionId: string
    items: OrderItem[]
    canWithdraw: boolean
    withdrawableAt: string
    reportId: string | null
    cancelReason: string | null
    createdAt: string
    updatedAt: string
}

export type PurchasedProduct = {
    productId: string
    productTitle: string
    quantity: number
    price: number
    subtotal: number
    sellerId: string
    orderId: string
    orderDate: string
    description?: string
    thumbnail?: string
    category?: string
    presetFiles?: string[]
    rating?: number
    author?: {
        id: string
        name: string
        avatar?: string
    }
}

export type OrderProductsResponse = {
    orderId: string
    status: string
    totalAmount: string
    products: Array<OrderItem & {
        description?: string
        thumbnail?: string
        category?: string
        presetFiles?: string[]
        rating?: number
        author?: {
            id: string
            name: string
            avatar?: string
        }
    }>
}

export type OrdersResponse = {
    data: Order[]
}

export type OrderResponse = {
    data: Order
}

export type ProductDetails = {
    id: string
    name: string
    description: string
    price: number
    originalPrice: number
    discount: number
    rating: number
    reviewCount: number
    downloads: number
    sellCount: number
    author: {
        name: string
        avatar: string
    }
    image: string
    thumbnail: string
    imagePairs: Array<{
        before: string
        after: string
    }>
    imageMetadata: {
        width: number
        format: string
        height: number
        fileSize: number
        colorSpace: string
        dimensions: string
    }
    presetFiles: string[]
    category: string
    tags: string[]
    compatibility: string[]
    fileFormat: string
    fileSize: string
    includesCount: number
    features: string[]
    specifications: {
        adjustments: string[]
        bestFor: string[]
        difficulty: string
    }
    createdAt: string
    updatedAt: string
    warranty: {
        duration: string
        coverage: string
        terms: string[]
    }
}

export type OrderProductDetail = OrderItem & {
    productDetails: ProductDetails
}

export type OrderProductsDetailResponse = {
    data: {
        orderId: string
        status: string
        totalAmount: string
        products: OrderProductDetail[]
    }
export type OrderStatus =
     | 'ready_for_withdrawal'
     | 'pending'
     | 'completed'
     | 'failed'
     | 'refunded'
     | 'reported';

export interface OrderItem {
     productId: string;
     productTitle: string;
     quantity: number;
     price: number;
     subtotal: number;
     sellerId: string;
}

export interface SoldOrder {
     id: string;
     userId: string;
     totalAmount: string;
     status: OrderStatus;
     paymentMethod: string;
     transactionId: string | null;
     items: OrderItem[];
     canWithdraw: boolean;
     withdrawableAt: string;
     reportId: string | null;
     cancelReason: string | null;
     createdAt: string;
     updatedAt: string;
     sellerItems: OrderItem[];
     sellerEarnings: number;
}

export interface SoldOrdersResponse {
     data: SoldOrder[];
}

export interface WithdrawOrderPayload {
     orderId: string;
}

export interface WithdrawOrderResponse {
     message: string;
     data: {
          order: SoldOrder;
          transaction: any;
     };
}
