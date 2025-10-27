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
     },

     create: async (payload: FormData) => {
          const res = await apiClient.post(endpoints.post.all, payload, {
               headers: {
                    'Content-Type': 'multipart/form-data'
               }
          })
          return res.data
     },

     delete: async (id: string) => {
          const res = await apiClient.delete(endpoints.post.byId(id))
          return res.data
     }
}