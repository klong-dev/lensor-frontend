import useSWR from "swr"
import { endpoints } from "../apis/endpoints"
import { orderApi } from "../apis/orderApi"

export const useOrders = () => {
    const { data, isLoading, error, mutate, isValidating } = useSWR(
        endpoints.orders.all,
        orderApi.getAllOrders
    )
    return { data, error, isLoading, mutate, isValidating }
}

export const useOrder = (orderId: string | null) => {
    const { data, isLoading, error, mutate, isValidating } = useSWR(
        orderId ? endpoints.orders.byId(orderId) : null,
        () => orderId ? orderApi.getOrderById(orderId) : null
    )
    return { data, error, isLoading, mutate, isValidating }
}

export const useOrderProducts = (orderId: string | null) => {
    const { data, isLoading, error, mutate, isValidating } = useSWR(
        orderId ? endpoints.orders.products(orderId) : null,
        () => orderId ? orderApi.getOrderProducts(orderId) : null
    )
    return { data, error, isLoading, mutate, isValidating }
}
