import { CartResponse } from '@/types/cart'
import { create } from 'zustand'

interface PendingCartItem {
     productId: string
     quantity: number
}

interface CartStore {
     cart: CartResponse | null
     itemCount: number
     pendingCart: PendingCartItem[]
     setCart: (cart: CartResponse) => void
     updateItemCount: (count: number) => void
     clearCart: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
     cart: null,
     itemCount: 0,
     pendingCart: [],
     setCart: (cart) => set({
          cart,
          itemCount: cart.count
     }),
     updateItemCount: (count) => set({ itemCount: count }),
     clearCart: () => set({ cart: null, itemCount: 0 })
}))
