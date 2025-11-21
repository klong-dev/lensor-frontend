import { apiClient } from "./client"
import { endpoints } from "./endpoints"

export const postApi = {
     getAll: async () => {
          const res = await apiClient.get(endpoints.post.all)
          return res.data
     },

     getById: async (id: string) => {
          const res = await apiClient.get(endpoints.post.byId(id))
          return res.data
     },

     create: async (payload: FormData) => {
          const res = await apiClient.post(endpoints.post.all, payload, {
               headers: {
                    'Content-Type': 'multipart/form-data'
               }
          })
          return res.data
     },

     delete: async (id: string) => {
          const res = await apiClient.delete(endpoints.post.byId(id))
          return res.data
     },

     createComment: async (postId: string, payload: { content: string, parentId: string | null }) => {
          const res = await apiClient.post(endpoints.comment.byPostId(postId), payload)
          return res.data
     },

     getComments: async (postId: string) => {
          const res = await apiClient.get(endpoints.comment.byPostId(postId))
          return res.data
     },

     likePost: async (postId: string) => {
          const res = await apiClient.post(endpoints.like.byPostId(postId))
          return res.data
     },

     unlikePost: async (postId: string) => {
          const res = await apiClient.delete(endpoints.like.byPostId(postId))
          return res.data
     },

     savePost: async (postId: string) => {
          const res = await apiClient.post(endpoints.savedPost.byId(postId))
          return res.data
     },

     unsavePost: async (postId: string) => {
          const res = await apiClient.delete(endpoints.savedPost.byId(postId))
          return res.data
     },

     checkIsSaved: async (postId: string) => {
          const res = await apiClient.get(endpoints.savedPost.isSaved(postId))
          return res.data
     },

     getSavedPosts: async (limit: number = 20, offset: number = 0) => {
          const res = await apiClient.get(endpoints.savedPost.all(limit, offset))

          // Response structure: { data: { savedPosts: [...], total: number } }
          // Extract posts from savedPosts and set isSaved to true
          if (res.data?.data?.savedPosts) {
               const posts = res.data.data.savedPosts.map((item: any) => ({
                    ...item.post,
                    isSaved: true, // Override backend's isSaved value
               }))

               return {
                    data: posts,
                    total: res.data.data.total,
               }
          }

          // Fallback for unexpected structure
          return {
               data: [],
               total: 0,
          }
     },

     getLikedPosts: async (userId: string) => {
          const res = await apiClient.get(endpoints.like.likedPosts(userId))
          return res.data
     }
}