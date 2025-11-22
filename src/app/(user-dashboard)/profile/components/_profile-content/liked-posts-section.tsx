"use client"

import { LostConnect } from '@/components/empty/lost-connect'
import Post from '@/components/forum/post/post'
import PostSkeleton from '@/components/forum/post/post-skeleton'
import { useLikedPosts } from '@/lib/hooks/usePostHooks'
import { PostType } from '@/types/post'
import { Heart } from 'lucide-react'

export default function LikedPostsSection() {
     const { data, error, isLoading, mutate } = useLikedPosts()

     const posts = data?.data || []

     if (error) return <LostConnect refecth={mutate} />

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
