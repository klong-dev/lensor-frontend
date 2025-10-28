import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BASE_URL } from "@/constants"
import { ROUTES } from "@/constants/path"
import { PostType } from '@/types/post'
import clsx from 'clsx'
import { Dot, Ellipsis, Heart, ImageIcon, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'
import { Button } from '../../ui/button'
import { Card } from "../../ui/card"
import DialogComment from "./dialog-comment"
import { DialogShare } from "./dialog-share"
import DropdownMenuPost from "./dropdown-menu-post"
import { postApi } from "@/lib/apis/postApi"
import { usePosts } from "@/lib/hooks/usePostHooks"

export default function Post({ dataPost }: { dataPost: PostType }) {
     const [expanded, setExpanded] = useState(false)
     const [isVoted, setIsVoted] = useState(false)
     const [voteCount, setVoteCount] = useState(12)
     const [isFollowing, setIsFollowing] = useState(false)
     const [imageError, setImageError] = useState(false)
     const { mutate } = usePosts()

     const handleVotePost = () => {
          setIsVoted(!isVoted)
          setVoteCount(isVoted ? voteCount - 1 : voteCount + 1)
     }

     const handleFollow = () => {
          setIsFollowing(!isFollowing)
     }

     const handleDeletePost = async () => {
          const res = await postApi.delete(dataPost.id)
          console.log(res);
          mutate()
     }

     const handleSavePost = () => {
          console.log('Save post')
     }

     const handleReportPost = () => {
          console.log('Report')
     }

     return (
          <div className='p-5 hover:backdrop-brightness-95 dark:hover:backdrop-brightness-0 rounded-2xl duration-300 my-3'>
               <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                         <Link href={ROUTES.PROFILE('id-abc-test')} className="hover:opacity-80 duration-300">
                              <Avatar>
                                   <AvatarImage src={dataPost?.user.avatarUrl} />
                                   <AvatarFallback>NHBT</AvatarFallback>
                              </Avatar>
                         </Link>
                         <Link href={ROUTES.PROFILE(dataPost?.user.id)} className='font-bold ml-2 text-[var(--c-text-title)] hover:opacity-80 duration-300'>
                              {dataPost?.user.name}
                         </Link>
                         <Dot />
                         <span className='text-[var(--color-text-muted)]'>{dataPost?.createdAt}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                         <Button onClick={handleFollow} variant={dataPost?.user.isFollowed ? 'outline' : 'default'}>
                              {dataPost?.user.isFollowed ? 'Following' : 'Follow'}
                         </Button>
                         <DropdownMenuPost
                              handleDeletePost={handleDeletePost}
                              handleReportPost={handleReportPost}
                              handleSavePost={handleSavePost}
                              handleViewDetail={handleDeletePost}
                         >
                              <Button variant='ghost'>
                                   <Ellipsis />
                              </Button>
                         </DropdownMenuPost>
                    </div>
               </div>

               <h1 className='font-bold mt-2 text-[var(--c-text-title)]'>{dataPost?.title}</h1>
               <p
                    className={clsx('text-base/5 text-justify my-1 duration-300 cursor-pointer', !expanded && 'line-clamp-3')}
                    onClick={() => setExpanded(!expanded)}
               >
                    {dataPost?.content}
               </p>

               <Card className='relative w-full aspect-[3/2] flex justify-center items-center mt-3 bg-muted/30'>
                    {dataPost?.imageUrl && !imageError ? (
                         <Image
                              src={`${BASE_URL}${dataPost?.imageUrl}`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              alt={dataPost?.title || "Post image"}
                              className="object-contain rounded-2xl"
                              unoptimized
                              onError={(e) => {
                                   setImageError(true)
                              }}
                         />
                    ) : (
                         <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                              <ImageIcon size={48} />
                              <p className="text-sm">Image not available</p>
                         </div>
                    )}
               </Card>

               <div className='flex gap-3 mt-2'>
                    <Button variant='ghost' size='lg' onClick={handleVotePost} >
                         <Heart className={clsx(isVoted && 'text-red-600')} />
                         <span className={clsx(isVoted && 'text-red-600')}>{dataPost?.voteCount}</span>
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
