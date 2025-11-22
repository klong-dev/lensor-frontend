'use client'

import { useState, useEffect, use, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, MoreVertical } from 'lucide-react'
import { useSocket } from '@/contexts/socket-context'
import { useUserStore } from '@/stores/user-store'
import { useChatStore } from '@/stores/chat-store'
import { useRoomMessages } from '@/lib/hooks/useMessageHooks'
import { Skeleton } from '@/components/ui/skeleton'
import { ROUTES } from '@/constants/path'
import Link from 'next/link'

export default function MessageDetail({ params }: { params: Promise<{ id: string }> }) {
     const { id: roomId } = use(params)
     const currentUser = useUserStore(state => state.user)
     const selectedConversation = useChatStore(state => state.selectedConversation)
     const { socket, isConnected } = useSocket()
     const { data: messagesData } = useRoomMessages(roomId)

     const [messages, setMessages] = useState<any[]>([])
     const [input, setInput] = useState('')
     const [isTyping, setIsTyping] = useState(false)

     const scrollRef = useRef<HTMLDivElement>(null)
     const typingTimerRef = useRef<any>(null)
     const lastTypingTimeRef = useRef<number>(0)
     const hasScrolledRef = useRef(false)

     const otherUser = selectedConversation?.participants?.find((p: any) => p.id !== currentUser?.id)

     // Load messages
     useEffect(() => {
          if (messagesData?.data) {
               setMessages(messagesData.data)
               hasScrolledRef.current = false
          }
     }, [messagesData])

     // Auto scroll to bottom
     useEffect(() => {
          if (messages.length > 0 && !hasScrolledRef.current) {
               setTimeout(() => {
                    scrollRef.current?.scrollIntoView({ behavior: 'instant' })
                    hasScrolledRef.current = true
               }, 100)
          } else if (hasScrolledRef.current) {
               scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
     }, [messages])

     // Socket connection
     useEffect(() => {
          if (!socket || !isConnected || !roomId || !currentUser?.id) return

          socket.emit('joinRoom', { roomId, userId: currentUser.id })

          const handleNewMessage = (newMsg: any) => {
               setMessages(prev => {
                    const filtered = prev.filter(m => !m.id.startsWith('temp-'))
                    if (filtered.some(m => m.id === newMsg.id)) return prev
                    return [...filtered, newMsg]
               })

               // Play sound for other user's messages
               if (newMsg.userId !== currentUser.id) {
                    const audio = new Audio('/audio/mixkit-long-pop-2358.wav')
                    audio.volume = 0.3
                    audio.play().catch(() => { })
               }
          }

          const handleTyping = (data: any) => {
               if (data.userId !== currentUser.id) {
                    setIsTyping(data.isTyping)

                    // Auto stop typing sau 5s
                    if (data.isTyping && typingTimerRef.current) {
                         clearTimeout(typingTimerRef.current)
                    }
                    if (data.isTyping) {
                         typingTimerRef.current = setTimeout(() => setIsTyping(false), 5000)
                    }
               }
          }

          socket.on('newMessage', handleNewMessage)
          socket.on('typing', handleTyping)

          return () => {
               socket.emit('leaveRoom', { roomId, userId: currentUser.id })
               socket.off('newMessage', handleNewMessage)
               socket.off('typing', handleTyping)
               if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
          }
     }, [socket, isConnected, roomId, currentUser?.id])

     const handleInputChange = (value: string) => {
          setInput(value)
          if (!socket || !currentUser?.id) return

          const now = Date.now()
          const timeSinceLastTyping = now - lastTypingTimeRef.current

          // Chỉ gửi typing nếu đã qua 5s
          if (value.length > 0 && timeSinceLastTyping >= 5000) {
               socket.emit('typing', { roomId, userId: currentUser.id, isTyping: true })
               lastTypingTimeRef.current = now
          }
     }

     const sendMessage = () => {
          if (!input.trim() || !socket || !currentUser?.id) return

          const content = input.trim()

          // Thêm tin nhắn tạm
          setMessages(prev => [...prev, {
               id: `temp-${Date.now()}`,
               userId: currentUser.id,
               content,
               createdAt: new Date().toISOString(),
          }])

          // Gửi tin nhắn
          socket.emit('sendMessage', { userId: currentUser.id, roomId, content })

          // Stop typing
          socket.emit('typing', { roomId, userId: currentUser.id, isTyping: false })
          lastTypingTimeRef.current = 0

          setInput('')
     }

     if (!selectedConversation) {
          return (
               <div className="flex flex-col h-full">
                    <div className="sticky top-0 z-10 border-b px-6 py-4 bg-card">
                         <div className="flex items-center gap-3">
                              <Skeleton className="w-10 h-10 rounded-full" />
                              <div className="space-y-2">
                                   <Skeleton className="h-4 w-32" />
                                   <Skeleton className="h-3 w-20" />
                              </div>
                         </div>
                    </div>
               </div>
          )
     }

     return (
          <div className="flex flex-col h-full">
               {/* Header - Cố định */}
               <div className="sticky top-0 z-10 border-b px-6 py-4 bg-card">
                    <div className="flex items-center justify-between">
                         <Link
                              href={otherUser?.id ? ROUTES.PROFILE(otherUser.id) : '#'}
                              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                         >
                              <Avatar className="w-10 h-10">
                                   <AvatarImage src={otherUser?.avatar} />
                                   <AvatarFallback>
                                        {otherUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                                   </AvatarFallback>
                              </Avatar>
                              <div>
                                   <h2 className="font-semibold text-lg">
                                        {otherUser?.name || 'Unknown User'}
                                   </h2>
                                   <p className="text-xs text-muted-foreground">
                                        {isTyping ? 'Typing...' : isConnected ? 'Online' : 'Offline'}
                                   </p>
                              </div>
                         </Link>
                         <Button variant="ghost" size="icon">
                              <MoreVertical className="w-5 h-5" />
                         </Button>
                    </div>
               </div>

               {/* Tin nhắn */}
               <ScrollArea className="flex-1 px-6 py-4">
                    <div className="space-y-4">
                         {messages.length === 0 ? (
                              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                                   <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                                        <Send className="w-8 h-8 text-muted-foreground" />
                                   </div>
                                   <h3 className="font-semibold mb-1">No messages yet</h3>
                                   <p className="text-sm text-muted-foreground">
                                        Send the first message
                                   </p>
                              </div>
                         ) : (
                              messages.map((msg) => {
                                   const isMyMessage = msg.userId === currentUser?.id

                                   return (
                                        <div key={msg.id} className={`flex gap-3 ${isMyMessage ? 'flex-row-reverse' : ''}`}>
                                             {!isMyMessage && (
                                                  <Avatar className="w-8 h-8">
                                                       <AvatarImage src={otherUser?.avatar} />
                                                       <AvatarFallback>
                                                            {otherUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                                                       </AvatarFallback>
                                                  </Avatar>
                                             )}

                                             <div className={`flex flex-col max-w-[70%] ${isMyMessage ? 'items-end' : 'items-start'}`}>
                                                  <div className={`rounded-2xl px-4 py-2 ${isMyMessage
                                                       ? 'bg-primary text-primary-foreground'
                                                       : 'bg-muted'
                                                       }`}>
                                                       <p className="text-sm">{msg.content}</p>
                                                  </div>
                                                  <span className="text-[10px] text-muted-foreground mt-1">
                                                       {new Date(msg.createdAt).toLocaleTimeString('vi-VN', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                       })}
                                                  </span>
                                             </div>

                                             {isMyMessage && <div className="w-8" />}
                                        </div>
                                   )
                              })
                         )}
                         <div ref={scrollRef} />
                    </div>
               </ScrollArea>

               {/* Input - Cố định */}
               <div className="sticky bottom-0 border-t px-6 py-4 bg-card">
                    <div className="flex gap-2">
                         <Input
                              value={input}
                              onChange={(e) => handleInputChange(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                              placeholder="Type a message..."
                              className="flex-1"
                              disabled={!isConnected}
                         />
                         <Button
                              onClick={sendMessage}
                              disabled={!input.trim() || !isConnected}
                              size="icon"
                         >
                              <Send className="w-4 h-4" />
                         </Button>
                    </div>
               </div>
          </div>
     )
}
