"use client"

import Post from '@/components/forum/post'
import { usePosts } from '@/lib/hooks/usePostHooks'
import { PostType } from '@/types/post'

export default function ForumPage() {
     const { data: dataForum, isLoading } = usePosts()

     return (
          <div className='grid grid-cols-3 container'>
               <div className='col-span-2'>
                    {isLoading
                         ? <div>Loading....</div>
                         : dataForum?.data?.map((post: PostType, index: string) =>
                              <div key={index}>
                                   <Post dataPost={post} />
                                   {index + 1 < dataForum?.data.length && <hr className="solid" />}
                              </div>
                         )
                    }
               </div>
               <div className='h-96 sticky top-16 p-4 z-20'>
                    RIGHT SIDEBAR ON FORUM
               </div>
          </div>
     )
}
