import { authHelpers } from '@/lib/supabase'
import { create } from 'zustand'
import { User } from '@supabase/supabase-js'

interface UserState {
     user: User | null
     loading: boolean
     fetchUser: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
     user: null,
     loading: false,

     fetchUser: async () => {
          set({ loading: true })
          const response = await authHelpers.getCurrentUser()
          set({ user: response.data.user, loading: false })
     }
}))