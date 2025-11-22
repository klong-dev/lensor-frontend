import { NotificationResponse } from "@/types/notification"
import { apiClient } from "./client"
import { endpoints } from "./endpoints"

export const notificationApi = {
     getAll: async (): Promise<NotificationResponse> => {
          const res = await apiClient.get(endpoints.notification.all)
          return res.data
     },

     markAsRead: async (id: string, accountId: string) => {
          const res = await apiClient.patch(endpoints.notification.markAsRead, {
               id,
               accountId
          })
          return res.data
     },

     markAllAsRead: async () => {
          const res = await apiClient.patch(endpoints.notification.markAllAsRead)
          return res.data
     }
}
