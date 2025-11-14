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
                    console.log('No token, skipping socket connection')
                    return
               }

               const socketInstance = io(SOCKET_URL, {
                    auth: { token }
               })

               socketInstance.on('connect', () => {
                    console.log('Socket connected')
                    setIsConnected(true)
               })

               socketInstance.on('disconnect', () => {
                    console.log('Socket disconnected')
                    setIsConnected(false)
               })

               socketInstance.on('connect_error', (error) => {
                    console.error('Socket connection error:', error)
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
