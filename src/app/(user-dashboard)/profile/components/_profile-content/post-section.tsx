"use client"

import Post from '@/components/forum/post/post'
import { usePosts } from '@/lib/hooks/usePostHooks'

export default function PostSection() {
  const { data } = usePosts()

  return (
    <div className='border border-black/10 rounded-2xl '>
      <Post
        dataPost={data?.data[2]}
      />
    </div>
  )
}
