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

export const useSavedPosts = (limit: number = 20, offset: number = 0) => {
     const { data, error, isLoading, mutate } = useSWR(
          endpoints.savedPost.all(limit, offset),
          () => postApi.getSavedPosts(limit, offset)
     )
     return { data, error, isLoading, mutate }
}

export const useCheckSavedPost = (postId: string) => {
     const { data, error, isLoading, mutate } = useSWR(
          postId ? endpoints.savedPost.isSaved(postId) : null,
          () => postApi.checkIsSaved(postId)
     )
     return { data, error, isLoading, mutate }
}

export const useLikedPosts = () => {
     const { data, error, isLoading, mutate } = useSWR(
          endpoints.like.allLikedPosts,
          postApi.getAllLikedPosts
     )
     return { data, error, isLoading, mutate }
}
