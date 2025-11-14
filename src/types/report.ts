export type ReportStatus = 'pending' | 'approved' | 'rejected' | 'need_more_info'

export type Report = {
    id: string
    orderId: string
    productId: string
    buyerId: string
    sellerId: string
    reason: string
    evidence: string[]
    status: ReportStatus
    adminResponse: string | null
    createdAt: string
    updatedAt: string
    resolvedAt: string | null
}

export type CreateReportPayload = {
    orderId: string
    productId: string
    reason: string
    evidence: string[]
}

export type ReportResponse = {
    data: Report
}

export type ReportsResponse = {
    data: Report[]
}

export type AdminReportActionPayload = {
    action: 'approved' | 'rejected' | 'need_more_info'
    adminResponse: string
}