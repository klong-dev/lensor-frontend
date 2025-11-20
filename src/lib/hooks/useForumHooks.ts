import useSWR from "swr"
import { endpoints } from "../apis/endpoints"
import { forumApi } from "../apis/forumApi"

export const useForums = () => {
     const { data, error, isLoading, mutate, isValidating } = useSWR(
          endpoints.forum.all,
          forumApi.getAll
     )
     return { data, error, isLoading, mutate, isValidating }
}
