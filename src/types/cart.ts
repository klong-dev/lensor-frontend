export type CartItemProps = {
    id: string
    productId: string
    image: string
    title: string
    author: string
    authorId: string
    price: number
    originalPrice?: number
    category?: string
    fileFormat?: string
    fileSize?: string
    onRemove: (id: string) => void
    disabled?: boolean
    status?: 'active' | 'inactive' | 'blocked'
    onSelect?: (item: CartItemData, selected: boolean) => void
    isSelected?: boolean
    item: CartItemData
}

export type CartItemData = {
    id: string
    userId: string
    productId: string
    quantity: number
    price: string
    createdAt: string
    updatedAt: string
    product?: {
        id: string
        userId: string
        title: string
        description?: string
        price: string
        originalPrice?: string
        discount?: number
        image?: string
        thumbnail: string
        imagePairs?: string
        presetFiles?: string
        imageMetadata?: Record<string, unknown>
        rating: string
        reviewCount: number
        sellCount: number
        downloads: number
        category: string
        tags?: string
        compatibility?: string
        fileFormat: string
        fileSize: string
        includesCount?: number
        features?: string
        specifications?: string
        warranty?: string
        status?: 'active' | 'inactive' | 'blocked'
        createdAt: string
        updatedAt: string
        deletedAt?: string | null
        owner?: {
            id: string
            name: string
            avatar?: string
        }
    }
}

export type CartResponse = {
    items: CartItemData[]
    total: number
    count: number
}