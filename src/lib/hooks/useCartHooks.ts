import useSWR from "swr"
import { endpoints } from "../apis/endpoints"
import { cartApi } from "../apis/cartApi"

export const useCart = () => {
    const { data, isLoading, error, mutate, isValidating } = useSWR(
        endpoints.cart.all,
        cartApi.getAll
    )
    return { data, error, isLoading, mutate, isValidating }
}