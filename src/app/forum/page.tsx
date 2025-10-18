"use client"

import Post from '@/components/forum/post/post'
import { usePosts } from '@/lib/hooks/usePostHooks'
import { PostType } from '@/types/post'

export default function ForumPage() {
     const { data: dataForum, isLoading } = usePosts()

     return (
          <>
               {isLoading
                    ? <div>Loading....</div>
                    : dataForum?.data?.map((post: PostType, index: string) =>
                         <div key={index}>
                              <Post dataPost={post} />
                              {index + 1 < dataForum?.data.length && <hr className="solid" />}
                         </div>
                    )
               }
          </>
     )
}
