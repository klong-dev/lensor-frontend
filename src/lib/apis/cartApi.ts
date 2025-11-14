import { apiClient } from "./client"
import { endpoints } from "./endpoints"

export const cartApi = {
    getAll: async () => {
        const res = await apiClient.get(endpoints.cart.all)
        return res.data.data
    },

    addItem: async (payload: { productId: string, quantity: number }) => {
        const res = await apiClient.post(`${endpoints.cart.all}/add`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    },

    updateCartItem: async (cartItemId: string, quantity: number) => {
        const res = await apiClient.patch(
            `${endpoints.cart.all}/update/${cartItemId}`,
            { quantity },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        return res.data;
    },

    removeCartItem: async (cartItemId: string) => {
        const res = await apiClient.delete(`${endpoints.cart.all}/remove/${cartItemId}`);
        return res.data;
    },

    clearCart: async () => {
        const res = await apiClient.delete(`${endpoints.cart.all}/clear`);
        return res.data;
    },
}