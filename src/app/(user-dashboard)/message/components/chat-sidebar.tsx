'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import ChatItem from './chat-item'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Search } from 'lucide-react'
import { useMessage } from '@/lib/hooks/useMessageHooks'
import { DataMessageProps } from '@/types/message'
import { useState, useMemo, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserStore } from '@/stores/user-store'
import { useSocket } from '@/contexts/socket-context'

export const mockMessages = [
     {
          chatPartner: {
               id: "u1",
               avatar: "https://i.pravatar.cc/150?img=1",
               fullname: "Ajabi",
          },
          chatId: "chat-1",
          lastMessage: "Hello! My name is Ajabi, I'm a creative designer.",
          lastMessageTime: "15:53",
          countUnreadMessage: "2",
          isActive: false,
     },
     {
          chatPartner: {
               id: "u2",
               avatar: "https://i.pravatar.cc/150?img=2",
               fullname: "Bingi Dingi",
          },
          chatId: "chat-2",
          lastMessage: "Landing page for website is almost done.",
          lastMessageTime: "15:55",
          countUnreadMessage: "0",
          isActive: true,
     },
     {
          chatPartner: {
               id: "u3",
               avatar: "https://i.pravatar.cc/150?img=3",
               fullname: "Salman Birat",
          },
          chatId: "chat-3",
          lastMessage: "Can we schedule a quick meeting tomorrow?",
          lastMessageTime: "16:02",
          countUnreadMessage: "9",
          isActive: false,
     },
     {
          chatPartner: {
               id: "u4",
               avatar: "https://i.pravatar.cc/150?img=4",
               fullname: "Nayem Hasan",
          },
          chatId: "chat-4",
          lastMessage: "Sure! I’ll send you the updated design files.",
          lastMessageTime: "16:10",
          countUnreadMessage: "0",
          isActive: false,
     },
     {
          chatPartner: {
               id: "u5",
               avatar: "https://i.pravatar.cc/150?img=5",
               fullname: "Elena Disay",
          },
          chatId: "chat-5",
          lastMessage: "Thanks for the feedback, I'll apply those changes.",
          lastMessageTime: "16:15",
          countUnreadMessage: "3",
          isActive: false,
     },
];

export default function ChatSidebar() {
     const user = useUserStore(state => state.user)
     const { socket } = useSocket()
     const { data: dataMessage } = useMessage()
     const [searchQuery, setSearchQuery] = useState('')
     const [conversations, setConversations] = useState<DataMessageProps[]>([])

     // Update conversations khi có data từ API
     useEffect(() => {
          if (dataMessage?.data) {
               setConversations(dataMessage.data)
          }
     }, [dataMessage])

     // Lắng nghe tin nhắn mới để update lastMessage
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

     // Filter conversations
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
          <ScrollArea className='border-r-2'>
               <div className='p-4 sticky top-0 z-10 backdrop-blur-2xl bg-background/80'>
                    <h1 className='py-3 scroll-m-20 text-2xl font-semibold tracking-tight'>Messages</h1>
                    <InputGroup>
                         <InputGroupInput
                              placeholder="Search conversations..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                         />
                         <InputGroupAddon>
                              <Search />
                         </InputGroupAddon>
                         {searchQuery && (
                              <InputGroupAddon align="inline-end">
                                   {filteredMessages.length} {filteredMessages.length === 1 ? 'result' : 'results'}
                              </InputGroupAddon>
                         )}
                    </InputGroup>
               </div>
               <div className='pr-2'>
                    {isLoading ? (
                         <div className='space-y-2 p-4'>
                              {[...Array(5)].map((_, i) => (
                                   <div key={i} className='flex items-center gap-3 p-2'>
                                        <Skeleton className='w-10 h-10 rounded-full' />
                                        <div className='flex-1 space-y-2'>
                                             <Skeleton className='h-4 w-32' />
                                             <Skeleton className='h-3 w-48' />
                                        </div>
                                   </div>
                              ))}
                         </div>
                    ) : filteredMessages.length === 0 ? (
                         <div className='flex flex-col items-center justify-center py-8 text-muted-foreground'>
                              <p className='text-sm'>
                                   {searchQuery ? 'No results found' : 'No conversations yet'}
                              </p>
                         </div>
                    ) : (
                         filteredMessages.map((item: DataMessageProps, index: number) => (
                              <ChatItem data={item} key={item.id || index} />
                         ))
                    )}
               </div>
          </ScrollArea>
     )
}
