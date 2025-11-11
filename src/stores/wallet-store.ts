import { walletApi } from '@/lib/apis/walletApi'
import { create } from 'zustand'

interface WalletData {
     balance: number
     currency: string
     isActive: boolean
}

interface WalletState {
     walletData: WalletData | null
     loading: boolean
     setWalletData: (data: WalletData) => void
     fetchWallet: () => Promise<void>
     updateBalance: (newBalance: number) => void
}

export const useWalletStore = create<WalletState>((set) => ({
     walletData: null,
     loading: false,
     setWalletData: (data) => set({ walletData: data }),
     fetchWallet: async () => {
          set({ loading: true })
          try {
               const response = await walletApi.getWallet()
               set({ walletData: response.data, loading: false })
          } catch (error) {
               console.error('Failed to fetch wallet:', error)
               set({ loading: false })
          }
     },
     updateBalance: (newBalance) => set((state) => ({
          walletData: state.walletData ? { ...state.walletData, balance: newBalance } : null
     }))
}))
