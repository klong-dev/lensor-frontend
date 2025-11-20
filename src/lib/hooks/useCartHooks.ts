import useSWR from "swr"
import { endpoints } from "../apis/endpoints"
import { cartApi } from "../apis/cartApi"
import { useCartStore } from "@/stores/cart-store"
import { useEffect } from "react"

export const useCart = () => {
    const { data, isLoading, error, mutate, isValidating } = useSWR(
        endpoints.cart.all,
        cartApi.getAll
    )

    const { setCart } = useCartStore()

    useEffect(() => {
        if (data) {
            setCart(data)
        }
    }, [data, setCart])

    return { data, error, isLoading, mutate, isValidating }
}