"use client"

import { LostConnect } from '@/components/empty/lost-connect'
import Post from '@/components/forum/post/post'
import PostSkeleton from '@/components/forum/post/post-skeleton'
import { userApi } from '@/lib/apis/userApi'
import { useUserStore } from '@/stores/user-store'
import { PostType } from '@/types/post'
import { UserPost } from '@/types'
import { FileText } from 'lucide-react'
import { useEffect, useState } from 'react'

interface PostSectionProps {
  onPostsCountChange?: (count: number) => void
}

export default function PostSection({ onPostsCountChange }: PostSectionProps) {
  const user = useUserStore(state => state.user)
  const [posts, setPosts] = useState<PostType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchUserPosts()
  }, [user])

  useEffect(() => {
    // Report posts count when it changes
    if (onPostsCountChange) {
      onPostsCountChange(posts.length)
    }
  }, [posts.length, onPostsCountChange])

  const fetchUserPosts = async () => {
    if (!user?.id) return

    try {
      setIsLoading(true)
      setError(false)
      const { data } = await userApi.getUserProfile(user.id)
      const userPosts = data.posts.map((post: UserPost) => ({
        ...post,
        user: {
          id: data.id,
          name: data.name,
          avatarUrl: data.avatarUrl,
          isFollowed: false
        },
        voteCount: 0,
        commentCount: 0,
        isLiked: false
      })) as PostType[]
      setPosts(userPosts)
    } catch (err) {
      console.error('Error fetching user posts:', err)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (error) return <LostConnect refecth={fetchUserPosts} />

  if (isLoading) return <PostSkeleton />

  if (posts.length === 0) {
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
      {posts.map((post: PostType) => (
        <div key={post.id} className='border border-border/40 rounded-2xl overflow-hidden'>
          <Post dataPost={post} />
        </div>
      ))}
    </div>
  )
}
