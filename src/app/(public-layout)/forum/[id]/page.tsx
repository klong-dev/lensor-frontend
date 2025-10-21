'use client'

import Comment from '@/components/forum/post/comment'
import Post from '@/components/forum/post/post'
import { Card } from '@/components/ui/card'
import { usePostDetail } from '@/lib/hooks/usePostHooks'
import { useParams } from 'next/navigation'

export default function PostDetail() {
     const { id } = useParams()
     const { data } = usePostDetail(id as string)

     return (
          <div className='container md:px-40'>
               <Card className='p-10 pt-0 mt-5'>
                    <Post dataPost={data?.data} />
                    <h1 className='scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0'>Comment</h1>
                    <Comment hasChild />
                    <Comment />
               </Card>
          </div>
     )
}
