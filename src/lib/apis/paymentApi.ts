import { apiClient } from "./client"
import { endpoints } from "./endpoints"

export const paymentApi = {
     createPayos: async (amount: number) => {
          const res = await apiClient.post(endpoints.payment.payos, { amount })
          return res.data
     }
}
