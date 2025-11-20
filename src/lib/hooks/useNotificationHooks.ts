import { notificationApi } from '@/lib/apis/notificationApi'
import { NotificationResponse } from '@/types/notification'
import useSWR from 'swr'
import { useCallback } from 'react'

export const useNotifications = () => {
     const { data, isLoading, error, mutate } = useSWR<NotificationResponse>(
          '/notifications',
          notificationApi.getAll,
          {
               refreshInterval: 30000, // Refetch every 30 seconds
               revalidateOnFocus: true,
          }
     )

     return { data, isLoading, error, mutate }
}

export const useMarkAsRead = () => {
     const { mutate } = useNotifications()

     const markAsRead = useCallback(async (id: string) => {
          try {
               await notificationApi.markAsRead(id)
               mutate() // Revalidate notifications
          } catch (error) {
               console.error('Failed to mark notification as read:', error)
               throw error
          }
     }, [mutate])

     return { mutate: markAsRead }
}

export const useMarkAllAsRead = () => {
     const { mutate } = useNotifications()

     const markAllAsRead = useCallback(async () => {
          try {
               await notificationApi.markAllAsRead()
               mutate() // Revalidate notifications
          } catch (error) {
               console.error('Failed to mark all notifications as read:', error)
               throw error
          }
     }, [mutate])

     return { mutate: markAllAsRead }
}
