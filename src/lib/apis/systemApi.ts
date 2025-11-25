import { apiClient } from "./client"
import { endpoints } from "./endpoints"
import { DiscountRateResponse } from "@/types"

export const systemApi = {
     getDiscountRate: async (): Promise<DiscountRateResponse> => {
          const res = await apiClient.get(endpoints.systemVariables.discountRate)
          return res.data
     }
}
