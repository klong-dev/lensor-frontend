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

export const useCreateComment = () => {
     const { mutate } = useSWRConfig()

     const createComment = async (postId: string, content: string, parentId: string | null = null) => {
          try {
               const result = await postApi.createComment(postId, { content, parentId })
               await mutate(endpoints.comment.byPostId(postId))
               return result
          } catch (error) {
               throw error
          }
     }

     return { createComment }
}

export const useComments = (postId: string) => {
     const { data, error, isLoading, mutate } = useSWR(
          endpoints.comment.byPostId(postId),
          () => postApi.getComments(postId)
     )
     return { data, error, isLoading, mutate }
}
