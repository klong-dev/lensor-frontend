import useSWR, { useSWRConfig } from "swr"
import { endpoints } from "../apis/endpoints"
import { postApi } from "../apis/postApi"

export const usePosts = () => {
     const { data, error, isLoading, mutate, isValidating } = useSWR(endpoints.post.all, postApi.getAll)
     return { data, error, isLoading, mutate, isValidating }
}

export const usePostDetail = (id: string) => {
     const { data, error, isLoading, mutate } = useSWR(
          endpoints.post.byId(id),
          () => postApi.getById(id)
     )
     return { data, error, isLoading, mutate }
}
