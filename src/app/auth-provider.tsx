'use client'

import { authHelpers } from '@/lib/supabase'
import { useUserStore } from '@/stores/user-store'
import React, { useEffect } from 'react'

const EVENT = {
  SIGNED_OUT: 'SIGNED_OUT'
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {

  const fetchUser = useUserStore(state => state.fetchUser)
  const setUser = useUserStore(state => state.setUser)

  useEffect(() => {
    fetchUser()
    authHelpers.onAuthStateChange((event) => {
      if (event === EVENT.SIGNED_OUT) {
        setUser(null)
      }
    })
  }, [fetchUser, setUser])

  return (
    <>{children}</>
  )
}
