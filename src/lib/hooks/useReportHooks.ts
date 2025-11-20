import useSWR, { useSWRConfig } from "swr"
import { endpoints } from "../apis/endpoints"
import { reportApi } from "../apis/reportApi"
import { CreateReportPayload, CreateReportFormData } from "@/types/report"

export const useMyReports = () => {
    const { data, isLoading, error, mutate, isValidating } = useSWR(
        endpoints.reports.all,
        reportApi.getMyReports
    )
    return { data, error, isLoading, mutate, isValidating }
}

export const useReportById = (reportId: string | null) => {
    const { data, isLoading, error, mutate, isValidating } = useSWR(
        reportId ? endpoints.reports.byId(reportId) : null,
        () => reportId ? reportApi.getReportById(reportId) : null
    )
    return { data, error, isLoading, mutate, isValidating }
}

export const useCreateReport = () => {
    const { mutate } = useSWRConfig()

    // Method 1: Upload with multipart/form-data (preferred)
    const createReportWithFiles = async (data: CreateReportFormData) => {
        try {
            const formData = new FormData()
            formData.append('orderId', data.orderId)
            formData.append('productId', data.productId)
            formData.append('reason', data.reason)

            // Append multiple files with the same key 'evidence'
            if (data.evidence && data.evidence.length > 0) {
                data.evidence.forEach(file => {
                    formData.append('evidence', file)
                })
            }

            const result = await reportApi.createReportWithFiles(formData)
            await mutate(endpoints.reports.all)
            await mutate(endpoints.orders.byId(data.orderId))
            return result
        } catch (error) {
            throw error
        }
    }

    // Method 2: Upload with JSON (pre-uploaded URLs)
    const createReport = async (payload: CreateReportPayload) => {
        try {
            const result = await reportApi.createReport(payload)
            await mutate(endpoints.reports.all)
            await mutate(endpoints.orders.byId(payload.orderId))
            return result
        } catch (error) {
            throw error
        }
    }

    return { createReport, createReportWithFiles }
}
