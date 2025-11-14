import useSWR, { useSWRConfig } from "swr"
import { endpoints } from "../apis/endpoints"
import { reportApi } from "../apis/reportApi"
import { CreateReportPayload } from "@/types/report"

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

    return { createReport }
}
