"use client"

import { SOCKET_URL } from '@/constants'
import { supabase } from '@/lib/supabase'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

interface SocketContextType {
     socket: Socket | null
     isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
     socket: null,
     isConnected: false,
})

export const useSocket = () => useContext(SocketContext)

export function SocketProvider({ children }: { children: React.ReactNode }) {
     const [socket, setSocket] = useState<Socket | null>(null)
     const [isConnected, setIsConnected] = useState(false)

     useEffect(() => {
          const initSocket = async () => {
               const { data: { session } } = await supabase.auth.getSession()
               const token = session?.access_token

               if (!token) {
                    console.log('❌ Socket: No token found')
                    return
               }

               console.log('🔌 Socket: Initializing connection...')

               const socketInstance = io(SOCKET_URL, {
                    auth: { token }
               })

               socketInstance.on('connect', () => {
                    console.log('✅ Socket: Connected successfully', socketInstance.id)
                    setIsConnected(true)
               })

               socketInstance.on('disconnect', () => {
                    console.log('❌ Socket: Disconnected')
                    setIsConnected(false)
               })

               socketInstance.on('connect_error', (error) => {
                    console.error('❌ Socket: Connection error:', error.message)
               })

               // Debug: Lắng nghe tất cả events
               socketInstance.onAny((eventName, ...args) => {
                    console.log('📨 Socket Event:', eventName, args)
               })

               setSocket(socketInstance)

               return () => {
                    socketInstance.disconnect()
               }
          }

          initSocket()
     }, [])

     return (
          <SocketContext.Provider value={{ socket, isConnected }}>
               {children}
          </SocketContext.Provider>
     )
}
