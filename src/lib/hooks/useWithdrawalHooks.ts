import useSWR from "swr"
import { endpoints } from "../apis/endpoints"
import { withdrawalApi } from "../apis/withdrawalApi"

export const useWithdrawals = () => {
     const { data, isLoading, error, mutate, isValidating } = useSWR(
          endpoints.withdrawal.all,
          withdrawalApi.getWithdrawals
     )
     return { data, error, isLoading, mutate, isValidating }
}
