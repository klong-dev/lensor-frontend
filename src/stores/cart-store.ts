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
     addPendingItem: (item: PendingCartItem) => void
     getPendingCart: () => PendingCartItem[]
     clearPendingCart: () => void
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
     clearCart: () => set({ cart: null, itemCount: 0 }),
     addPendingItem: (item) => {
          const currentPending = get().pendingCart;
          const exists = currentPending.find(i => i.productId === item.productId);
          if (!exists) {
               set({ pendingCart: [...currentPending, item] });
               if (typeof window !== 'undefined') {
                    sessionStorage.setItem('pendingCart', JSON.stringify([...currentPending, item]));
               }
          }
     },
     getPendingCart: () => {
          if (typeof window !== 'undefined') {
               const stored = sessionStorage.getItem('pendingCart');
               return stored ? JSON.parse(stored) : [];
          }
          return [];
     },
     clearPendingCart: () => {
          set({ pendingCart: [] });
          if (typeof window !== 'undefined') {
               sessionStorage.removeItem('pendingCart');
          }
     }
}))
