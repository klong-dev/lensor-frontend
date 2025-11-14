import { apiClient } from "./client"
import { endpoints } from "./endpoints"

export const walletApi = {
     getWallet: async () => {
          const res = await apiClient.get(endpoints.wallet)
          return res.data
     },

     getPaymentHistory: async (page: number = 1, limit: number = 20) => {
          const res = await apiClient.get(endpoints.paymentHistory, {
               params: { page, limit }
          })
          return res.data
     }
}
