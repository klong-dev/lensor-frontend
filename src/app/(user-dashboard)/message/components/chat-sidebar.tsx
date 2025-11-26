'use client'

import { Input } from '@/components/ui/input'
import ChatItem from './chat-item'
import { Search } from 'lucide-react'
import { useMessage } from '@/lib/hooks/useMessageHooks'
import { DataMessageProps } from '@/types/message'
import { useState, useMemo, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserStore } from '@/stores/user-store'
import { useSocket } from '@/contexts/socket-context'

export default function ChatSidebar() {
     const user = useUserStore(state => state.user)
     const { socket } = useSocket()
     const { data: dataMessage } = useMessage()
     const [searchQuery, setSearchQuery] = useState('')
     const [conversations, setConversations] = useState<DataMessageProps[]>([])

     useEffect(() => {
          if (dataMessage?.data) {
               setConversations(dataMessage.data)
          }
     }, [dataMessage])

     useEffect(() => {
          if (!socket) return

          const handleNewMessage = (newMsg: any) => {
               setConversations(prev => {
                    return prev.map(conv => {
                         if (conv.id === newMsg.roomId) {
                              return {
                                   ...conv,
                                   lastMessage: {
                                        content: newMsg.content,
                                        createdAt: newMsg.createdAt,
                                        userId: newMsg.userId
                                   },
                                   updatedAt: newMsg.createdAt
                              }
                         }
                         return conv
                    })
               })
          }

          socket.on('newMessage', handleNewMessage)

          return () => {
               socket.off('newMessage', handleNewMessage)
          }
     }, [socket])

     const filteredMessages = useMemo(() => {
          if (!conversations.length) return []
          if (!searchQuery.trim()) return conversations

          return conversations.filter((conv: DataMessageProps) => {
               const otherUser = conv.participants.find((p) => p.id !== user?.id)
               return otherUser?.name?.toLowerCase().includes(searchQuery.toLowerCase())
          })
     }, [conversations, searchQuery, user?.id])

     const isLoading = !dataMessage

     return (
          <div className="flex flex-col h-full w-full">
               <div className="flex-shrink-0 p-4 border-b bg-background">
                    <h1 className="text-xl font-semibold mb-3">Messages</h1>
                    <div className="relative">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                         <Input
                              placeholder="Search conversations..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-9"
                         />
                    </div>
               </div>

               <div className="flex-1 overflow-y-auto">
                    {isLoading ? (
                         <div className="p-4 space-y-3">
                              {[...Array(8)].map((_, i) => (
                                   <div key={i} className="flex items-center gap-3 p-2">
                                        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                                        <div className="flex-1 space-y-2">
                                             <Skeleton className="h-4 w-32" />
                                             <Skeleton className="h-3 w-full max-w-[200px]" />
                                        </div>
                                   </div>
                              ))}
                         </div>
                    ) : filteredMessages.length === 0 ? (
                         <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                                   <Search className="w-6 h-6 text-muted-foreground" />
                              </div>
                              <p className="text-sm text-muted-foreground">
                                   {searchQuery ? 'No conversations found' : 'No messages yet'}
                              </p>
                         </div>
                    ) : (
                         <div>
                              {filteredMessages.map((item: DataMessageProps) => (
                                   <ChatItem data={item} key={item.id} />
                              ))}
                         </div>
                    )}
               </div>
          </div>
     )
}
