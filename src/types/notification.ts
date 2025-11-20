export interface NotificationMetadata {
     amount?: string
     reason?: string
     withdrawalId?: string
     fee?: string
     bankInfo?: {
          bankName: string
          accountHolder: string
          accountNumber: string
     }
     totalAmount?: string
     actualAmount?: string
}

export interface Notification {
     id: string
     userId: string
     type: string
     title: string
     message: string
     action: string
     targetId: string | null
     targetType: string | null
     category: string | null
     read: boolean
     icon: string | null
     actionUrl: string | null
     metadata: NotificationMetadata | null
     time: string
     updatedAt: string
}

export interface NotificationResponse {
     data: {
          notifications: Notification[]
          meta: {
               unreadCount: number
               totalCount: number
          }
     }
     statusCode: number
}
