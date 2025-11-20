import { apiClient } from "./client"
import { endpoints } from "./endpoints"

export const marketplaceApi = {
     getAll: async () => {
          const res = await apiClient.get(endpoints.marketplace.all)
          return res.data
     },

     getById: async (id: string) => {
          const res = await apiClient.get(endpoints.product.byId(id))
          return res.data
     },

     getOwn: async () => {
          const res = await apiClient.get(endpoints.product.all + '/me')
          return res.data
     },

     create: async (payload: FormData) => {
          const res = await apiClient.post(endpoints.product.all, payload, {
               headers: {
                    'Content-Type': 'multipart/form-data'
               }
          })
          return res.data
     },

     update: async (id: string, payload: FormData | Record<string, unknown>) => {
          const isFormData = payload instanceof FormData
          const res = await apiClient.patch(endpoints.product.byId(id), payload, {
               headers: isFormData ? {
                    'Content-Type': 'multipart/form-data'
               } : undefined
          })
          return res.data
     },

     delete: async (id: string) => {
          const res = await apiClient.delete(endpoints.product.byId(id))
          return res.data
     },

     createReview: async (productId: string, payload: { rating: number; comment: string }) => {
          const res = await apiClient.post(endpoints.review.byProductId(productId), payload)
          return res.data
     }
}