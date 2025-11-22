'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/constants/path'
import { cn } from '@/lib/utils'
import { useNotificationStore } from '@/stores/notification-store'
import { Notification as NotificationType } from '@/types/notification'
import { formatDistanceToNow } from 'date-fns'
import { vi, enUS, ja } from 'date-fns/locale'
import { Bell, AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export function NotificationPopover() {
     const t = useTranslations('Header')
     const locale = useLocale()
     const { notifications, unreadCount } = useNotificationStore()
     const displayNotifications = notifications.slice(0, 5) // Show only 5 latest

     const getDateLocale = () => {
          switch (locale) {
               case 'vi':
                    return vi
               case 'jp':
                    return ja
               default:
                    return enUS
          }
     }

     const getNotificationIcon = (type: string) => {
          switch (type) {
               case 'withdrawal_approved':
                    return <CheckCircle className="h-4 w-4 text-green-500" />
               case 'withdrawal_rejected':
                    return <AlertCircle className="h-4 w-4 text-red-500" />
               default:
                    return <Bell className="h-4 w-4 text-primary" />
          }
     }

     const formatTime = (time: string) => {
          try {
               return formatDistanceToNow(new Date(time), { addSuffix: true, locale: getDateLocale() })
          } catch {
               return time
          }
     }

     return (
          <div className="flex flex-col w-full max-h-[calc(100vh-100px)]">
               {/* Header */}
               <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0 bg-background">
                    <div className="flex items-center gap-2">
                         <Bell className="h-4 w-4" />
                         <h3 className="font-semibold">{t('notifications')}</h3>
                         {unreadCount > 0 && (
                              <Badge variant="default" className="rounded-full h-5 min-w-5 flex items-center justify-center px-1.5">
                                   {unreadCount > 99 ? '99+' : unreadCount}
                              </Badge>
                         )}
                    </div>
                    <Link href={ROUTES.NOTIFICATION}>
                         <Button variant="ghost" size="sm" className="h-8 text-xs">
                              {t('viewAll')}
                              <ExternalLink className="h-3 w-3 ml-1" />
                         </Button>
                    </Link>
               </div>

               {/* Notifications List */}
               <div className="flex-1 overflow-y-auto min-h-0">
                    {displayNotifications.length === 0 ? (
                         <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                              <Bell className="h-12 w-12 text-muted-foreground/50 mb-3" />
                              <p className="text-sm text-muted-foreground">{t('noNotifications')}</p>
                         </div>
                    ) : (
                         <div className="divide-y">
                              {displayNotifications.map((notification: NotificationType, index: number) => (
                                   <div key={notification.id}>
                                        <Link href={ROUTES.NOTIFICATION}>
                                             <div
                                                  className={cn(
                                                       'flex gap-3 px-4 py-3 hover:bg-accent transition-colors cursor-pointer',
                                                       !notification.read && 'bg-accent/50'
                                                  )}
                                             >
                                                  <div className="flex-shrink-0 pt-0.5">
                                                       {getNotificationIcon(notification.type)}
                                                  </div>
                                                  <div className="flex-1 min-w-0 space-y-1">
                                                       <div className="flex items-start justify-between gap-2">
                                                            <h4 className="text-sm font-medium line-clamp-1">
                                                                 {notification.title}
                                                            </h4>
                                                            {!notification.read && (
                                                                 <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                                                            )}
                                                       </div>
                                                       <p className="text-xs text-muted-foreground line-clamp-2">
                                                            {notification.message}
                                                       </p>
                                                       <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                            <Clock className="h-3 w-3" />
                                                            <span>{formatTime(notification.time)}</span>
                                                       </div>
                                                  </div>
                                             </div>
                                        </Link>
                                        {index < displayNotifications.length - 1 && <Separator />}
                                   </div>
                              ))}
                         </div>
                    )}
               </div>

               {/* Footer */}
               {displayNotifications.length > 0 && (
                    <>
                         <Separator className="flex-shrink-0" />
                         <div className="px-4 py-3 flex-shrink-0 bg-background">
                              <Link href={ROUTES.NOTIFICATION} className="block">
                                   <Button variant="outline" size="sm" className="w-full">
                                        {t('seeAllNotifications')}
                                   </Button>
                              </Link>
                         </div>
                    </>
               )}
          </div>
     )
}
