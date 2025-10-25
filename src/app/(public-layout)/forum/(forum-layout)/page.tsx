"use client"

import { LostConnect } from '@/components/empty/lost-connect'
import DialogCreatePost from '@/components/forum/post/dialog-create-post'
import Post from '@/components/forum/post/post'
import PostSkeleton from '@/components/forum/post/post-skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { usePosts } from '@/lib/hooks/usePostHooks'
import { useUserStore } from '@/stores/user-store'
import { PostType } from '@/types/post'

export default function ForumPage() {
     const { data: dataForum, error, mutate, isValidating } = usePosts()
     const user = useUserStore(state => state.user)
     console.log(user)
     if (error) return <LostConnect refecth={mutate} />

     return (
          <div className='max-w-[720px] mx-auto'>
               <div className='p-5'>
                    <DialogCreatePost>
                         <Card className='flex flex-row justify-center px-3 gap-3 py-3'>
                              <Avatar>
                                   <AvatarImage src={user?.user_metadata.avatar_url} />
                                   <AvatarFallback>{user?.user_metadata.name}</AvatarFallback>
                              </Avatar>
                              <Input disabled type="text" placeholder="Let's share what going on your mind...." />
                              <Button>Create Post</Button>
                         </Card>
                    </DialogCreatePost>
               </div>
               {isValidating
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
