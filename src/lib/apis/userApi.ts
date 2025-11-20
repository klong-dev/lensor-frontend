import { UserProfile } from "@/types"
import { apiClient } from "./client"
import { endpoints } from "./endpoints"

export const userApi = {
     getUserProfile: async (userId: string) => {
          const res = await apiClient.get(endpoints.user.byId(userId))
          return res.data
     },

     followUser: async (userId: string) => {
          const res = await apiClient.post(endpoints.user.follow(userId))
          return res.data
     },

     unfollowUser: async (userId: string) => {
          const res = await apiClient.delete(endpoints.user.unfollow(userId))
          return res.data
     }
}
