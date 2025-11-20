import { apiClient } from "./client"
import { endpoints } from "./endpoints"
import { CreateWithdrawalPayload, WithdrawalResponse, WithdrawalsResponse, WithdrawalStatisticsResponse } from "@/types/withdrawal"

export const withdrawalApi = {
     // Create withdrawal request
     createWithdrawal: async (payload: CreateWithdrawalPayload): Promise<WithdrawalResponse> => {
          const res = await apiClient.post(endpoints.withdrawal.create, payload)
          return res.data
     },

     // Get all withdrawals
     getWithdrawals: async (): Promise<WithdrawalsResponse> => {
          const res = await apiClient.get(endpoints.withdrawal.all)
          return res.data
     },

     // Get withdrawal statistics
     getStatistics: async (year?: number, month?: number): Promise<WithdrawalStatisticsResponse> => {
          const params: { year?: number; month?: number } = {}
          if (year) params.year = year
          if (month) params.month = month
          const res = await apiClient.get(endpoints.withdrawal.statistics, { params })
          return res.data
     }
}
