import useSWR from "swr"
import { endpoints } from "../apis/endpoints"
import { postApi } from "../apis/postApi"

export const usePosts = () => {
     const { data, error, isLoading } = useSWR(endpoints.post.all, postApi.getAll)
     return { data, error, isLoading }
}

export const usePostDetail = (id: string) => {
     const { data, error, isLoading, mutate } = useSWR(
          endpoints.post.byId(id),
          () => postApi.getById(id)
     )
     return { data, error, isLoading, mutate }
}
