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

     deleteComment: async (postId: string, commentId: string) => {
          const res = await apiClient.delete(endpoints.comment.delete(postId, commentId))
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

          console.log('Raw API response:', res)
          console.log('res.data:', res.data)
          console.log('res.data.data:', res.data?.data)
          console.log('res.data.data.post:', res.data?.data?.post)

          // Response structure: { data: { post: [...], total: number }, statusCode: 200 }
          // Return exactly what API gives us without transformation
          return res.data
     },

     getLikedPosts: async (userId: string) => {
          const res = await apiClient.get(endpoints.like.likedPosts(userId))
          return res.data
     },

     getAllLikedPosts: async () => {
          const res = await apiClient.get(endpoints.like.allLikedPosts)

          // Handle nested data structure: { data: { message, data: [...] } }
          const postsData = res.data?.data?.data || res.data?.data || []

          const posts = postsData.map((post: any) => ({
               ...post,
               isLiked: true
          }))

          return { data: posts }
     }
}