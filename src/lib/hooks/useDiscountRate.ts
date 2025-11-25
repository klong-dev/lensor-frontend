import useSWR from "swr"
import { endpoints } from "../apis/endpoints"
import { systemApi } from "../apis/systemApi"

export const useDiscountRate = () => {
     const { data, isLoading, error, mutate } = useSWR(
          endpoints.systemVariables.discountRate,
          systemApi.getDiscountRate,
          {
               revalidateOnFocus: false,
               revalidateOnReconnect: false,
               dedupingInterval: 600000 // 10 minutes
          }
     )

     const discountRate = data?.data?.discountRate || '0'
     const discountRateNum = parseFloat(discountRate)

     return {
          discountRate,
          discountRateNum,
          isLoading,
          error,
          mutate
     }
}
