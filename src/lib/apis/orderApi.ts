import { apiClient } from "./client"
import { endpoints } from "./endpoints"
import { SoldOrdersResponse, WithdrawOrderPayload, WithdrawOrderResponse } from "@/types/order"

export const orderApi = {
     /**
      * Get all sold orders for the current seller
      */
     getSoldOrders: async (): Promise<SoldOrdersResponse> => {
          const res = await apiClient.get(endpoints.order.sold)
          return res.data
     },

     /**
      * Withdraw funds from a completed order
      */
     withdrawOrder: async (orderId: string): Promise<WithdrawOrderResponse> => {
          const res = await apiClient.post(endpoints.order.withdraw(orderId))
          return res.data
     }
}
