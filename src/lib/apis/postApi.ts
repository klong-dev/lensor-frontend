import { apiClient } from "./client"
import { endpoints } from "./endpoints"

export const postApi = {
     getAll: async () => {
          const res = await apiClient.get(endpoints.post.all)
          return res.data
     },

     getById: async (id: string) => {
          const res = await apiClient.get(endpoints.post.byId(id))
          return res.data
     }
}