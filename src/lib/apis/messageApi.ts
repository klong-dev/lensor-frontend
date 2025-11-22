import { apiClient } from "./client"
import { endpoints } from "./endpoints"

export const messageApi = {
     getAllRoom: async () => {
          const res = await apiClient.get(endpoints.message.all)
          return res.data
     },

     getRoomDetail: async (roomId: string) => {
          const res = await apiClient.get(endpoints.message.detail(roomId))
          return res.data
     },

     getAllMessage: async (roomId: string, limit: number = 99999) => {
          const res = await apiClient.get(endpoints.message.allMessage(roomId, limit))
          return res.data
     },

     createRoomChat: async (payload: { name: string, type: string, participantIds: [id: string] }) => {
          const res = await apiClient.post(endpoints.message.all, payload)
          return res.data
     },

     createDirectChat: async (otherUserId: string) => {
          const res = await apiClient.post(endpoints.message.createDirect(otherUserId))
          return res.data
     },

     markAsRead: async (roomId: string) => {
          const res = await apiClient.post(endpoints.message.markAsRead(roomId))
          return res.data
     }
}