'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ROUTES } from "@/constants/path"
import { useUserStore } from "@/stores/user-store"
import { useChatStore } from "@/stores/chat-store"
import { DataMessageProps } from "@/types/message"
import Link from "next/link"

export default function ChatItem({ data }: { data: DataMessageProps }) {
     const user = useUserStore(state => state.user)
     const setSelectedConversation = useChatStore(state => state.setSelectedConversation)

     // Tìm user đối diện
     const otherUser = data?.participants?.find((p) => p.id !== user?.id)

     // Format thời gian đơn giản
     const formatTime = (dateString: string) => {
          try {
               const date = new Date(dateString)
               const now = new Date()
               const diff = now.getTime() - date.getTime()
               const hours = Math.floor(diff / (1000 * 60 * 60))
               const days = Math.floor(hours / 24)

               if (days > 0) return `${days} ngày trước`
               if (hours > 0) return `${hours} giờ trước`
               return 'Vừa xong'
          } catch {
               return ''
          }
     }

     if (!data?.id) return null

     return (
          <Link
               href={`${ROUTES.MESSAGE}/${data.id}`}
               onClick={() => setSelectedConversation(data)}
               className="border-b flex justify-between p-4 cursor-pointer hover:bg-accent duration-200"
          >
               <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Avatar className="w-10 h-10">
                         <AvatarImage src={otherUser?.avatar} />
                         <AvatarFallback>
                              {otherUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                         </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                         <h3 className="font-semibold text-sm truncate">
                              {otherUser?.name || 'Unknown User'}
                         </h3>
                         <p className="text-muted-foreground text-xs truncate">
                              {data?.lastMessage?.content || 'No messages yet'}
                         </p>
                    </div>
               </div>

               <div className="flex flex-col items-end gap-1 ml-2 flex-shrink-0">
                    <span className="text-muted-foreground text-xs whitespace-nowrap">
                         {data?.updatedAt ? formatTime(data.updatedAt) : ''}
                    </span>
                    {data?.unreadCount > 0 && (
                         <Badge variant="destructive" className="h-5 min-w-5 px-1.5 text-xs">
                              {data.unreadCount > 99 ? '99+' : data.unreadCount}
                         </Badge>
                    )}
               </div>
          </Link>
     )
}
