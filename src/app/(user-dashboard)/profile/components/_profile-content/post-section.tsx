"use client"

import { LostConnect } from '@/components/empty/lost-connect'
import Post from '@/components/forum/post/post'
import PostSkeleton from '@/components/forum/post/post-skeleton'
import { usePosts } from '@/lib/hooks/usePostHooks'
import { PostType } from '@/types/post'
import { FileText } from 'lucide-react'

export default function PostSection() {
  const { data, error, isLoading, mutate } = usePosts()

  if (error) return <LostConnect refecth={mutate} />

  if (isLoading) return <PostSkeleton />

  if (!data?.data || data.data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
        <FileText className='h-16 w-16 text-muted-foreground mb-4' />
        <h3 className='text-lg font-semibold mb-2'>No posts yet</h3>
        <p className='text-sm text-muted-foreground max-w-sm'>
          You haven't created any posts yet. Share your photography with the community!
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {data.data.map((post: PostType) => (
        <div key={post.id} className='border border-border/40 rounded-2xl overflow-hidden'>
          <Post dataPost={post} />
        </div>
      ))}
    </div>
  )
}

