import { OrderProductsDetailResponse, OrderResponse, OrdersResponse } from "@/types/order"
import { apiClient } from "./client"
import { endpoints } from "./endpoints"

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
    }
}
