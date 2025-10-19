"use client"

import Post from '@/components/forum/post/post'
import PostSkeleton from '@/components/forum/post/post-skeleton'
import { usePosts } from '@/lib/hooks/usePostHooks'
import { PostType } from '@/types/post'

export default function ForumPage() {
     const { data: dataForum, isLoading } = usePosts()

     return (
          <div className='max-w-[720px] mx-auto'>
               {isLoading
                    ? <PostSkeleton />
                    : dataForum?.data?.map((post: PostType, index: string) =>
                         <div key={index}>
                              <Post dataPost={post} />
                              {index + 1 < dataForum?.data.length && <hr className="solid" />}
                         </div>
                    )
               }
          </div>
     )
}
