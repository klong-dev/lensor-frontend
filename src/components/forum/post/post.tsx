import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BASE_URL } from "@/constants"
import { ROUTES } from "@/constants/path"
import { PostType } from '@/types/post'
import clsx from 'clsx'
import { Dot, Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import { useState } from 'react'
import { Button } from '../../ui/button'
import { Card } from "../../ui/card"
import DialogComment from "./dialog-comment"
import { DialogShare } from "./dialog-share"

export default function Post({ dataPost }: { dataPost: PostType }) {
     const [expanded, setExpanded] = useState(false)
     const [isVoted, setIsVoted] = useState(false)
     const [voteCount, setVoteCount] = useState(12)
     const [isFollowing, setIsFollowing] = useState(false)

     const handleVotePost = () => {
          setIsVoted(!isVoted)
          setVoteCount(isVoted ? voteCount - 1 : voteCount + 1)
     }

     const handleFollow = () => {
          setIsFollowing(!isFollowing)
     }

     return (
          <div className='p-5 hover:backdrop-brightness-95 dark:hover:backdrop-brightness-0 rounded-2xl duration-300 my-3'>
               <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                         <Avatar>
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>NHBT</AvatarFallback>
                         </Avatar>
                         <span className='font-bold ml-2 text-[var(--c-text-title)]'>{`Bảo Trọng`}</span>
                         <Dot />
                         <span className='text-[var(--color-text-muted)]'>{dataPost?.createdAt}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                         <Button onClick={handleFollow} variant={isFollowing ? 'outline' : 'default'}>
                              {isFollowing ? 'Following' : 'Follow'}
                         </Button>
                    </div>
               </div>

               <h1 className='font-bold mt-2 text-[var(--c-text-title)]'>{dataPost?.title}</h1>
               <p
                    className={clsx('text-base/5 text-justify my-1 duration-300 cursor-pointer', !expanded && 'line-clamp-3')}
                    onClick={() => setExpanded(!expanded)}
               >
                    {dataPost?.content}
               </p>

               <Card className='relative w-full aspect-[3/2] flex justify-center items-center mt-3'>
                    <Image
                         src={dataPost?.imageUrl ?? '/images/default-fallback-image.png'}
                         fill
                         sizes="100%"
                         priority
                         alt="Picture of the author"
                         className="object-contain rounded-2xl"
                    />
               </Card>
               <div className='flex gap-3 mt-2'>
                    <Button variant='ghost' size='lg' onClick={handleVotePost} >
                         <Heart className={clsx(isVoted && 'text-red-600')} />
                         <span className={clsx(isVoted && 'text-red-600')}>{voteCount}</span>
                    </Button>

                    <DialogComment>
                         <Button variant='ghost' size='lg' >
                              <MessageCircle size={92} /> {dataPost?.commentCount}
                         </Button>
                    </DialogComment>

                    <DialogShare linkShare={`${BASE_URL}${ROUTES.FORUM}/${dataPost?.id}`}>
                         <Button variant='ghost' size='lg'>
                              <Share2 />
                         </Button>
                    </DialogShare>
               </div>
          </div>
     )
}
