export interface CreateWithdrawalPayload {
     bankCardId: string
     orderIds: string[]
     note?: string
}

export interface Withdrawal {
     id: string
     userId: string
     bankCardId: string
     amount: string
     fee: string
     actualAmount: string
     status: 'pending' | 'approved' | 'rejected' | 'completed'
     orderIds: string[]
     bankInfo: {
          bankName: string
          accountNumber: string
          accountHolder: string
     }
     note: string | null
     adminId: string | null
     adminResponse: string | null
     paymentProofImageUrl: string[] | null
     processedAt: string | null
     createdAt: string
     updatedAt: string
}

export interface WithdrawalResponse {
     message: string
     data: Withdrawal
}

export interface WithdrawalsResponse {
     data: Withdrawal[]
}

export interface WithdrawalStatistics {
     totalWithdrawals: number
     totalAmount: number
     totalFee: number
     totalActualAmount: number
     filters: {
          year: string
          month: string
     }
}

export interface WithdrawalStatisticsResponse {
     data: WithdrawalStatistics
}
