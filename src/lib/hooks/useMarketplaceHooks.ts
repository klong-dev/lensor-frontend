import useSWR from "swr"
import { endpoints } from "../apis/endpoints"
import { marketplaceApi } from "../apis/marketplaceApi"

export const useMarketplace = () => {
     const { data, error, isLoading, mutate, isValidating } = useSWR(endpoints.marketplace.all, marketplaceApi.getAll)
     return { data, error, isLoading, mutate, isValidating }
}

export const useMarketplaceDetail = (id: string) => {
     const { data: dataRaw, error, isLoading, mutate } = useSWR(
          endpoints.product.byId(id),
          () => marketplaceApi.getById(id)
     )
     const data = dataRaw?.data
     return { data, error, isLoading, mutate }
}

export const useOwnProducts = () => {
     const { data, error, isLoading, mutate, isValidating } = useSWR(
          endpoints.product.all + '/me',
          marketplaceApi.getOwn
     )
     return { data, error, isLoading, mutate, isValidating }
}

export const useCreateReview = () => {
     const createReview = async (productId: string, payload: { rating: number; comment: string }) => {
          return await marketplaceApi.createReview(productId, payload)
     }
     return { createReview }
}
