import useSWR from "swr"
import { endpoints } from "../apis/endpoints"
import { walletApi } from "../apis/walletApi"

export const useWallet = () => {
     const { data, error, isLoading, mutate } = useSWR(endpoints.wallet, walletApi.getWallet)
     return { data, error, isLoading, mutate }
}

export const usePaymentHistory = (page: number = 1, limit: number = 20) => {
     const { data, error, isLoading, mutate } = useSWR(
          `${endpoints.paymentHistory}?page=${page}&limit=${limit}`,
          () => walletApi.getPaymentHistory(page, limit)
     )
     return { data, error, isLoading, mutate }
}
