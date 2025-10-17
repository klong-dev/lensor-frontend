"use client"

import Post from '@/components/forum/post'
import { usePosts } from '@/lib/hooks/usePostHooks'
import { PostType } from '@/types/post'
import { Divider, Skeleton } from '@mantine/core'

export default function ForumPage() {
     const { data: dataForum, isLoading } = usePosts()

     return (
          <div className='w-150 my-5 mx-auto'>
               <Skeleton visible={isLoading} h={350}>
                    {dataForum?.data?.map((post: PostType, index: string) =>
                         <div key={index}>
                              <Post
                                   dataPost={post}
                              />
                              {index + 1 < dataForum?.data.length && <Divider />}
                         </div>
                    )}
               </Skeleton>
          </div>
     )
}
