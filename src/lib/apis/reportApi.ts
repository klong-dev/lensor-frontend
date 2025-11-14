import { CreateReportPayload, ReportResponse, ReportsResponse } from '@/types/report'
import { apiClient } from './client'
import { endpoints } from './endpoints'

export const reportApi = {
    createReport: async (payload: CreateReportPayload): Promise<ReportResponse> => {
        const res = await apiClient.post(endpoints.reports.create, payload)
        return res.data
    },

    getMyReports: async (): Promise<ReportsResponse> => {
        const res = await apiClient.get(endpoints.reports.all)
        return res.data
    },

    getReportById: async (reportId: string): Promise<ReportResponse> => {
        const res = await apiClient.get(endpoints.reports.byId(reportId))
        return res.data
    }
}