import { OrderProductsDetailResponse, OrderResponse, OrdersResponse } from "@/types/order"
import { apiClient } from "./client"
import { endpoints } from "./endpoints"
import { SoldOrdersResponse, WithdrawOrderPayload, WithdrawOrderResponse } from "@/types/order"

export const orderApi = {
    checkout: async () => {
        const res = await apiClient.post(endpoints.orders.checkout)
        return res.data
    },

    getAllOrders: async (): Promise<OrdersResponse> => {
        const res = await apiClient.get(endpoints.orders.all)
        return res.data
    },

    getOrderById: async (orderId: string): Promise<OrderResponse> => {
        const res = await apiClient.get(endpoints.orders.byId(orderId))
        return res.data
    },

    getOrderProducts: async (orderId: string): Promise<OrderProductsDetailResponse> => {
        const res = await apiClient.get(endpoints.orders.products(orderId))
        return res.data
    },

     getSoldOrders: async (): Promise<SoldOrdersResponse> => {
          const res = await apiClient.get(endpoints.order.sold)
          return res.data
     },
  
     withdrawOrder: async (orderId: string): Promise<WithdrawOrderResponse> => {
          const res = await apiClient.post(endpoints.order.withdraw(orderId))
          return res.data
     }
}
