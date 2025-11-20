import { Notification } from '@/types/notification'
import { create } from 'zustand'

interface NotificationStore {
     notifications: Notification[]
     unreadCount: number
     setNotifications: (notifications: Notification[], unreadCount: number) => void
     markAsRead: (id: string) => void
     markAllAsRead: () => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
     notifications: [],
     unreadCount: 0,
     setNotifications: (notifications, unreadCount) => set({ notifications, unreadCount }),
     markAsRead: (id) => set((state) => ({
          notifications: state.notifications.map((notif) =>
               notif.id === id ? { ...notif, read: true } : notif
          ),
          unreadCount: Math.max(0, state.unreadCount - 1)
     })),
     markAllAsRead: () => set((state) => ({
          notifications: state.notifications.map((notif) => ({ ...notif, read: true })),
          unreadCount: 0
     }))
}))
