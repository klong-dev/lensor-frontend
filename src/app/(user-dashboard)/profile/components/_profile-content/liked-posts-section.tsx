"use client"

import { LostConnect } from '@/components/empty/lost-connect'
import Post from '@/components/forum/post/post'
import PostSkeleton from '@/components/forum/post/post-skeleton'
import { postApi } from '@/lib/apis/postApi'
import { useUserStore } from '@/stores/user-store'
import { PostType } from '@/types/post'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function LikedPostsSection() {
     const user = useUserStore(state => state.user)
     const [posts, setPosts] = useState<PostType[]>([])
     const [isLoading, setIsLoading] = useState(true)
     const [error, setError] = useState(false)

     useEffect(() => {
          fetchLikedPosts()
     }, [user])

     const fetchLikedPosts = async () => {
          if (!user?.id) return

          try {
               setIsLoading(true)
               setError(false)
               const { data } = await postApi.getLikedPosts(user.id)

               // Ensure all liked posts have isLiked set to true
               const likedPosts = (data || []).map((post: PostType) => ({
                    ...post,
                    isLiked: true
               }))

               setPosts(likedPosts)
          } catch (err) {
               console.error('Error fetching liked posts:', err)
               setError(true)
          } finally {
               setIsLoading(false)
          }
     }

     if (error) return <LostConnect refecth={fetchLikedPosts} />

     if (isLoading) return <PostSkeleton />

     if (posts.length === 0) {
          return (
               <div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
                    <Heart className='h-16 w-16 text-muted-foreground mb-4' />
                    <h3 className='text-lg font-semibold mb-2'>No liked posts yet</h3>
                    <p className='text-sm text-muted-foreground max-w-sm'>
                         Posts you like will appear here. Start exploring and liking posts!
                    </p>
               </div>
          )
     }

     return (
          <div className='space-y-4'>
               {posts.map((post: PostType) => (
                    <div key={post.id} className='border border-border/40 rounded-2xl overflow-hidden'>
                         <Post dataPost={post} />
                    </div>
               ))}
          </div>
     )
}
