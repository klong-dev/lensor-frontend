import { apiClient } from "./client"
import { endpoints } from "./endpoints"

export const paymentApi = {
     createPaypal: async (amount: number, orderInfo: string) => {
          const res = await apiClient.post(endpoints.payment.paypal, { amount, orderInfo })
          return res.data
     },

     createVnpay: async (amount: number, orderInfo: string) => {
          const res = await apiClient.post(endpoints.payment.vnpay, { amount, orderInfo })
          return res.data
     },

     vnpayCallback: async (params: Record<string, string>) => {
          const res = await apiClient.get(endpoints.payment.vnpayCallback, { params })
          return res.data
     }
}
