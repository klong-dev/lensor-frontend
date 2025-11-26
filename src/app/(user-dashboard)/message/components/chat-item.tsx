'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ROUTES } from "@/constants/path"
import { useUserStore } from "@/stores/user-store"
import { useChatStore } from "@/stores/chat-store"
import { DataMessageProps } from "@/types/message"
import { messageApi } from "@/lib/apis/messageApi"
import { endpoints } from "@/lib/apis/endpoints"
import { useSWRConfig } from "swr"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ChatItem({ data }: { data: DataMessageProps }) {
     const user = useUserStore(state => state.user)
     const setSelectedConversation = useChatStore(state => state.setSelectedConversation)
     const { mutate } = useSWRConfig()
     const pathname = usePathname()

     const otherUser = data?.participants?.find((p) => p.id !== user?.id)
     const isActive = pathname === `${ROUTES.MESSAGE}/${data.id}`

     const formatTime = (dateString: string) => {
          try {
               const date = new Date(dateString)
               const now = new Date()
               const diffMs = now.getTime() - date.getTime()
               const diffMins = Math.floor(diffMs / (1000 * 60))
               const diffHours = Math.floor(diffMins / 60)
               const diffDays = Math.floor(diffHours / 24)

               if (diffDays > 0) return `${diffDays}d`
               if (diffHours > 0) return `${diffHours}h`
               if (diffMins > 0) return `${diffMins}m`
               return 'now'
          } catch {
               return ''
          }
     }

     const handleClick = async () => {
          setSelectedConversation(data)

          if (data.unreadCount > 0) {
               try {
                    await messageApi.markAsRead(data.id)
                    await mutate(endpoints.message.all)
               } catch (error) {
                    console.error('Failed to mark as read:', error)
               }
          }
     }

     if (!data?.id) return null

     return (
          <Link
               href={`${ROUTES.MESSAGE}/${data.id}`}
               onClick={handleClick}
               className={`flex items-center gap-3 p-3 border-b hover:bg-accent transition-colors ${isActive ? 'bg-accent' : ''}`}
          >
               <Avatar className="w-11 h-11 flex-shrink-0">
                    <AvatarImage src={otherUser?.avatar} />
                    <AvatarFallback className="text-sm">
                         {otherUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
               </Avatar>

               <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                         <h3 className={`text-sm truncate ${data.unreadCount > 0 ? 'font-semibold' : 'font-medium'}`}>
                              {otherUser?.name || 'Unknown User'}
                         </h3>
                         <span className="text-xs text-muted-foreground flex-shrink-0">
                              {data?.updatedAt ? formatTime(data.updatedAt) : ''}
                         </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                         <p className={`text-xs truncate ${data.unreadCount > 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                              {data?.lastMessage?.content || 'No messages yet'}
                         </p>
                         {data?.unreadCount > 0 && (
                              <Badge variant="default" className="h-5 min-w-5 px-1.5 text-[10px] flex-shrink-0">
                                   {data.unreadCount > 99 ? '99+' : data.unreadCount}
                              </Badge>
                         )}
                    </div>
               </div>
          </Link>
     )
}
