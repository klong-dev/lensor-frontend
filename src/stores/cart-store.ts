import { CartResponse } from '@/types/cart'
import { create } from 'zustand'

interface CartStore {
     cart: CartResponse | null
     itemCount: number
     setCart: (cart: CartResponse) => void
     updateItemCount: (count: number) => void
     clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
     cart: null,
     itemCount: 0,
     setCart: (cart) => set({
          cart,
          itemCount: cart.count
     }),
     updateItemCount: (count) => set({ itemCount: count }),
     clearCart: () => set({ cart: null, itemCount: 0 })
}))
