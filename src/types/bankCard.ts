export interface BankCard {
     id: string
     userId: string
     bankName: string
     accountNumber: string
     accountHolder: string
     isDefault: boolean
     createdAt: string
     updatedAt: string
}

export interface CreateBankCardPayload {
     bankName: string
     accountNumber: string
     accountHolder: string
     isDefault?: boolean
}

export interface UpdateBankCardPayload {
     bankName: string
     accountNumber: string
     accountHolder: string
}

export interface BankCardResponse {
     message?: string
     data: BankCard
}

export interface BankCardsResponse {
     data: BankCard[]
}
