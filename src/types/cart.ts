export type CartItemProps = {
    id: string
    productId: string
    image: string
    title: string
    author: string
    price: number
    originalPrice?: number
    quantity: number
    onQuantityChange: (id: string, quantity: number) => void
    onRemove: (id: string) => void
    disabled?: boolean
}

export type CartItemData = {
    id: string
    quantity: number
    price: string
    product?: {
        id: string
        title: string
        thumbnail: string
        price: string
        originalPrice?: string
        userId?: string
        owner?: {
            id: string
            name: string
        }
    }
    image?: string
    title?: string
    originalPrice?: string
}

export type CartResponse = {
    items: CartItemData[]
    total: number
    count: number
}