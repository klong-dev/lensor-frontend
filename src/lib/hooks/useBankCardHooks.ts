import useSWR from "swr"
import { endpoints } from "../apis/endpoints"
import { bankCardApi } from "../apis/bankCardApi"

export const useBankCards = () => {
     const { data, isLoading, error, mutate, isValidating } = useSWR(
          endpoints.bankCard.all,
          bankCardApi.getBankCards
     )
     return { data, error, isLoading, mutate, isValidating }
}
