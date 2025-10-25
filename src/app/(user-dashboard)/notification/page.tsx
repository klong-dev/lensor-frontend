'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Bell, Camera, Clock, Heart, Image as ImageIcon, MessageCircle, MoreVertical, Settings, UserPlus } from "lucide-react"

export default function Notification() {
     const notifications = [
          {
               id: "1",
               user: {
                    name: "Sarah Johnson",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
               },
               action: "liked your photo",
               target: "Sunset Photography",
               category: "Photo",
               time: "5 min ago",
               read: false,
               online: true,
               icon: <Heart className="h-4 w-4" />,
          },
          {
               id: "2",
               user: {
                    name: "Mike Chen",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
               },
               action: "commented on your post",
               target: "Portrait Photography Tips",
               category: "Forum",
               time: "28 min ago",
               read: false,
               online: true,
               icon: <MessageCircle className="h-4 w-4" />,
          },
          {
               id: "3",
               user: {
                    name: "Emma Wilson",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
               },
               action: "started following you",
               category: "Follow",
               time: "2 hours ago",
               read: true,
               icon: <UserPlus className="h-4 w-4" />,
          },
          {
               id: "4",
               user: {
                    name: "David Park",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
               },
               action: "shared your photo",
               target: "Night City Lights",
               category: "Photo",
               time: "5 hours ago",
               read: true,
               icon: <Camera className="h-4 w-4" />,
          },
          {
               id: "5",
               user: {
                    name: "Lisa Anderson",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
               },
               action: "replied to your comment in",
               target: "Best Lens for Landscape",
               category: "Forum",
               time: "1 day ago",
               read: true,
               icon: <MessageCircle className="h-4 w-4" />,
          },
          {
               id: "6",
               user: {
                    name: "Tom Harris",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
               },
               action: "mentioned you in a forum post",
               target: "Photography Gear Discussion",
               category: "Forum",
               time: "2 days ago",
               read: true,
               icon: <MessageCircle className="h-4 w-4" />,
          },
          {
               id: "7",
               user: {
                    name: "Anna Martinez",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
               },
               action: "added your photo to favorites",
               target: "Autumn Colors",
               category: "Photo",
               time: "3 days ago",
               read: true,
               icon: <ImageIcon className="h-4 w-4" />,
          },
     ]

     const unreadCount = notifications.filter((n) => !n.read).length

     return (
          <div className="p-6">
               <Card className="overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-6 py-4">
                         <div className="flex items-center gap-3">
                              <Bell className="h-5 w-5 text-foreground" />
                              <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
                              {unreadCount > 0 && (
                                   <Badge variant="default" className="rounded-full">
                                        {unreadCount}
                                   </Badge>
                              )}
                         </div>

                         <Button variant="ghost" size="icon">
                              <Settings className="h-5 w-5" />
                         </Button>
                    </div>

                    {/* Notifications List */}
                    <div className="divide-y">
                         {notifications.map((notification) => (
                              <div
                                   key={notification.id}
                                   className={cn(
                                        "flex items-start gap-4 px-6 py-4 transition-colors hover:bg-accent cursor-pointer",
                                        !notification.read && "bg-accent/50"
                                   )}
                              >
                                   {/* Avatar with Online Status */}
                                   <div className="relative flex-shrink-0">
                                        <Avatar className="h-12 w-12">
                                             <AvatarImage
                                                  src={notification.user.avatar}
                                                  alt={notification.user.name}
                                             />
                                             <AvatarFallback className="bg-primary/10 text-primary">
                                                  {notification.user.name.split(" ").map((n) => n[0]).join("")}
                                             </AvatarFallback>
                                        </Avatar>
                                        {notification.online && (
                                             <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                                        )}
                                   </div>

                                   {/* Content */}
                                   <div className="flex-1 min-w-0 space-y-1">
                                        <div className="flex items-center gap-2">
                                             {notification.icon}
                                             <p className="text-sm text-foreground">
                                                  <span className="font-semibold">
                                                       {notification.user.name}
                                                  </span>{" "}
                                                  {notification.action}{" "}
                                                  {notification.target && (
                                                       <span className="font-semibold">
                                                            "{notification.target}"
                                                       </span>
                                                  )}
                                             </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                             <span>{notification.category}</span>
                                             <span>•</span>
                                             <div className="flex items-center gap-1">
                                                  <Clock className="h-3 w-3" />
                                                  <span>{notification.time}</span>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Unread Indicator & Menu */}
                                   <div className="flex items-center gap-2">
                                        {!notification.read && (
                                             <div className="h-2 w-2 rounded-full bg-primary" />
                                        )}
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                             <MoreVertical className="h-4 w-4" />
                                        </Button>
                                   </div>
                              </div>
                         ))}
                    </div>
               </Card>
          </div>
     )
}
