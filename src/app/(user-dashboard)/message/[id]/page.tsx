'use client'

import { useState, useEffect, use, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
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
     const messagesEndRef = useRef<HTMLDivElement>(null)
     const typingTimerRef = useRef<any>(null)
     const lastTypingTimeRef = useRef<number>(0)

     const otherUser = selectedConversation?.participants?.find((p: any) => p.id !== currentUser?.id)

     // Load messages
     useEffect(() => {
          if (messagesData?.data) {
               setMessages(messagesData.data)
               // Scroll ngay lập tức khi load messages
               requestAnimationFrame(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' })
               })
          }
     }, [messagesData])

     // Auto scroll khi có tin nhắn mới
     useEffect(() => {
          if (messages.length > 0) {
               // Đảm bảo scroll sau khi DOM đã render
               requestAnimationFrame(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
               })
          }
     }, [messages.length])

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

               if (newMsg.userId !== currentUser.id) {
                    try {
                         const audio = new Audio('/audio/mixkit-long-pop-2358.wav')
                         audio.volume = 0.3
                         audio.play().catch(() => { })
                    } catch { }
               }
          }

          const handleTyping = (data: any) => {
               if (data.userId !== currentUser.id) {
                    setIsTyping(data.isTyping)

                    if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
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

          if (value.length > 0 && timeSinceLastTyping >= 5000) {
               socket.emit('typing', { roomId, userId: currentUser.id, isTyping: true })
               lastTypingTimeRef.current = now
          }
     }

     const sendMessage = () => {
          if (!input.trim() || !socket || !currentUser?.id) return

          const content = input.trim()

          setMessages(prev => [...prev, {
               id: `temp-${Date.now()}`,
               userId: currentUser.id,
               content,
               createdAt: new Date().toISOString(),
          }])

          socket.emit('sendMessage', { userId: currentUser.id, roomId, content })
          socket.emit('typing', { roomId, userId: currentUser.id, isTyping: false })
          lastTypingTimeRef.current = 0

          setInput('')
     }

     if (!selectedConversation) {
          return (
               <div className="flex flex-col h-full">
                    <div className="flex-shrink-0 border-b px-4 py-3 bg-background">
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
               {/* Header - Fixed */}
               <div className="flex-shrink-0 border-b px-4 py-3 bg-background">
                    <div className="flex items-center gap-3">
                         <Link
                              href={otherUser?.id ? ROUTES.PROFILE(otherUser.id) : '#'}
                              className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-1 min-w-0"
                         >
                              <Avatar className="w-10 h-10 flex-shrink-0">
                                   <AvatarImage src={otherUser?.avatar} />
                                   <AvatarFallback className="text-sm">
                                        {otherUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                                   </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                   <h2 className="font-semibold text-sm truncate">
                                        {otherUser?.name || 'Unknown User'}
                                   </h2>
                                   <p className="text-xs text-muted-foreground">
                                        {isTyping ? (
                                             <span className="flex items-center gap-1">
                                                  <span className="flex gap-0.5">
                                                       <span className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                                                       <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:150ms]" />
                                                       <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:300ms]" />
                                                  </span>
                                                  Typing...
                                             </span>
                                        ) : isConnected ? 'Online' : 'Offline'}
                                   </p>
                              </div>
                         </Link>
                    </div>
               </div>

               {/* Messages - Scrollable */}
               <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
                    {messages.length === 0 ? (
                         <div className="flex flex-col items-center justify-center h-full text-center">
                              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                                   <Send className="w-8 h-8 text-muted-foreground" />
                              </div>
                              <h3 className="font-semibold text-sm mb-1">No messages yet</h3>
                              <p className="text-xs text-muted-foreground">
                                   Send a message to start the conversation
                              </p>
                         </div>
                    ) : (
                         <div className="space-y-3">
                              {messages.map((msg, index) => {
                                   const isMyMessage = msg.userId === currentUser?.id
                                   const prevMsg = messages[index - 1]
                                   const showAvatar = !prevMsg || prevMsg.userId !== msg.userId
                                   const nextMsg = messages[index + 1]
                                   const showTime = !nextMsg || nextMsg.userId !== msg.userId

                                   return (
                                        <div key={msg.id} className={`flex gap-2 ${isMyMessage ? 'flex-row-reverse' : ''}`}>
                                             {!isMyMessage ? (
                                                  showAvatar ? (
                                                       <Avatar className="w-8 h-8 flex-shrink-0">
                                                            <AvatarImage src={otherUser?.avatar} />
                                                            <AvatarFallback className="text-xs">
                                                                 {otherUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                                                            </AvatarFallback>
                                                       </Avatar>
                                                  ) : (
                                                       <div className="w-8 flex-shrink-0" />
                                                  )
                                             ) : null}

                                             <div className={`flex flex-col max-w-[75%] ${isMyMessage ? 'items-end' : 'items-start'}`}>
                                                  <div className={`rounded-2xl px-3 py-2 ${isMyMessage
                                                       ? 'bg-primary text-primary-foreground'
                                                       : 'bg-muted'
                                                       }`}>
                                                       <p className="text-sm break-words">{msg.content}</p>
                                                  </div>
                                                  {showTime && (
                                                       <span className="text-[10px] text-muted-foreground mt-1 px-1">
                                                            {new Date(msg.createdAt).toLocaleTimeString('vi-VN', {
                                                                 hour: '2-digit',
                                                                 minute: '2-digit',
                                                            })}
                                                       </span>
                                                  )}
                                             </div>

                                             {isMyMessage && showAvatar && <div className="w-8 flex-shrink-0" />}
                                        </div>
                                   )
                              })}
                              <div ref={messagesEndRef} />
                         </div>
                    )}
               </div>

               {/* Input - Fixed */}
               <div className="flex-shrink-0 border-t px-4 py-3 bg-background">
                    <div className="flex gap-2">
                         <Input
                              value={input}
                              onChange={(e) => handleInputChange(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                              placeholder={isConnected ? "Type a message..." : "Connecting..."}
                              className="flex-1"
                              disabled={!isConnected}
                         />
                         <Button
                              onClick={sendMessage}
                              disabled={!input.trim() || !isConnected}
                              size="icon"
                              className="flex-shrink-0"
                         >
                              <Send className="w-4 h-4" />
                         </Button>
                    </div>
                    {!isConnected && (
                         <p className="text-xs text-destructive text-center mt-2">
                              Disconnected • Reconnecting...
                         </p>
                    )}
               </div>
          </div>
     )
}
