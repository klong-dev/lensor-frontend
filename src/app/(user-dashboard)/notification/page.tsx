'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Bell, AlertCircle, CheckCircle, Clock, MoreVertical, Settings } from "lucide-react"
import { useNotifications, useMarkAsRead, useMarkAllAsRead } from "@/lib/hooks/useNotificationHooks"
import { useNotificationStore } from "@/stores/notification-store"
import { useUserStore } from "@/stores/user-store"
import { useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Notification as NotificationType } from "@/types/notification"
import { notificationApi } from "@/lib/apis/notificationApi"

export default function Notification() {
     const { data, isLoading } = useNotifications()
     const { notifications, unreadCount, setNotifications, markAsRead: markAsReadStore, markAllAsRead: markAllAsReadStore } = useNotificationStore()
     const { mutate: markAsRead } = useMarkAsRead()
     const { mutate: markAllAsRead } = useMarkAllAsRead()
     const user = useUserStore(state => state.user)

     useEffect(() => {
          if (data?.data) {
               setNotifications(data.data.notifications, data.data.meta.unreadCount)
          }
     }, [data, setNotifications])

     useEffect(() => {
          if (user && unreadCount > 0) {
               notificationApi.markAllAsRead()
          }
     }, [user])

     const handleMarkAsRead = async (notification: NotificationType) => {
          if (!user?.id || notification.read) return

          try {
               await markAsRead(notification.id, user.id)
               markAsReadStore(notification.id)
          } catch (error) {
               console.error('Failed to mark as read:', error)
          }
     }

     const handleMarkAllAsRead = async () => {
          if (!user) return

          try {
               await markAllAsRead()
               markAllAsReadStore()
          } catch (error) {
               console.error('Failed to mark all as read:', error)
          }
     }

     const getNotificationIcon = (type: string) => {
          switch (type) {
               case "withdrawal_approved":
                    return <CheckCircle className="h-4 w-4 text-green-500" />
               case "withdrawal_rejected":
                    return <AlertCircle className="h-4 w-4 text-red-500" />
               default:
                    return <Bell className="h-4 w-4" />
          }
     }

     const formatTime = (time: string) => {
          try {
               return formatDistanceToNow(new Date(time), { addSuffix: true, locale: vi })
          } catch {
               return time
          }
     }

     if (isLoading) {
          return (
               <div className="p-6">
                    <Card className="overflow-hidden">
                         <div className="flex items-center justify-between border-b px-6 py-4">
                              <Skeleton className="h-8 w-48" />
                         </div>
                         <div className="divide-y">
                              {[1, 2, 3].map((i) => (
                                   <div key={i} className="flex items-start gap-4 px-6 py-4">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                             <Skeleton className="h-4 w-full" />
                                             <Skeleton className="h-3 w-24" />
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </Card>
               </div>
          )
     }

     return (
          <div className="p-6">
               <Card className="overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-6 py-4">
                         <div className="flex items-center gap-3">
                              <Bell className="h-5 w-5 text-foreground" />
                              <h1 className="text-2xl font-bold text-foreground">Thông báo</h1>
                              {unreadCount > 0 && (
                                   <Badge variant="default" className="rounded-full">
                                        {unreadCount}
                                   </Badge>
                              )}
                         </div>

                         <div className="flex gap-2">
                              {unreadCount > 0 && (
                                   <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                                        Đánh dấu tất cả đã đọc
                                   </Button>
                              )}
                              <Button variant="ghost" size="icon">
                                   <Settings className="h-5 w-5" />
                              </Button>
                         </div>
                    </div>

                    {/* Notifications List */}
                    <div className="divide-y">
                         {notifications.length === 0 ? (
                              <div className="px-6 py-12 text-center text-muted-foreground">
                                   <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                   <p>Không có thông báo nào</p>
                              </div>
                         ) : (
                              notifications.map((notification: NotificationType) => (
                                   <div
                                        key={notification.id}
                                        className={cn(
                                             "flex items-start gap-4 px-6 py-4 transition-colors hover:bg-accent cursor-pointer",
                                             !notification.read && "bg-accent/50"
                                        )}
                                        onClick={() => handleMarkAsRead(notification)}
                                   >
                                        {/* Icon */}
                                        <div className="flex-shrink-0 mt-1">
                                             {getNotificationIcon(notification.type)}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0 space-y-1">
                                             <div className="flex items-start justify-between gap-2">
                                                  <h3 className="font-semibold text-sm text-foreground">
                                                       {notification.title}
                                                  </h3>
                                                  {!notification.read && (
                                                       <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                                                  )}
                                             </div>

                                             <p className="text-sm text-muted-foreground whitespace-pre-line">
                                                  {notification.message}
                                             </p>

                                             {notification.actionUrl && (
                                                  <Link
                                                       href={notification.actionUrl}
                                                       className="text-sm text-primary hover:underline inline-block mt-1"
                                                  >
                                                       Xem chi tiết →
                                                  </Link>
                                             )}

                                             <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                                  <Clock className="h-3 w-3" />
                                                  <span>{formatTime(notification.time)}</span>
                                             </div>
                                        </div>

                                        {/* Menu */}
                                        <Button
                                             variant="ghost"
                                             size="icon"
                                             className="h-8 w-8 flex-shrink-0"
                                             onClick={(e) => {
                                                  e.stopPropagation()
                                             }}
                                        >
                                             <MoreVertical className="h-4 w-4" />
                                        </Button>
                                   </div>
                              ))
                         )}
                    </div>
               </Card>
          </div>
     )
}
