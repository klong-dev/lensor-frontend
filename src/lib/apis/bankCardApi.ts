import { apiClient } from "./client"
import { endpoints } from "./endpoints"
import { BankCard, BankCardsResponse, CreateBankCardPayload, UpdateBankCardPayload, BankCardResponse } from "@/types/bankCard"

export const bankCardApi = {
     // Get all bank cards
     getBankCards: async (): Promise<BankCardsResponse> => {
          const res = await apiClient.get(endpoints.bankCard.all)
          return res.data
     },

     // Create new bank card
     createBankCard: async (payload: CreateBankCardPayload): Promise<BankCardResponse> => {
          const res = await apiClient.post(endpoints.bankCard.create, payload)
          return res.data
     },

     // Update bank card
     updateBankCard: async (id: string, payload: UpdateBankCardPayload): Promise<BankCardResponse> => {
          const res = await apiClient.put(endpoints.bankCard.byId(id), payload)
          return res.data
     },

     // Delete bank card
     deleteBankCard: async (id: string): Promise<void> => {
          await apiClient.delete(endpoints.bankCard.byId(id))
     },

     // Set default bank card
     setDefaultBankCard: async (id: string): Promise<BankCardResponse> => {
          const res = await apiClient.patch(endpoints.bankCard.setDefault(id))
          return res.data
     }
}
