import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Ellipsis, Heart, MessageSquareText } from 'lucide-react'
import { CommentResponseType } from '@/types/post'

interface CommentProps {
     data: CommentResponseType
     isChild?: boolean
     hasChild?: boolean
}

const getTimeAgo = (dateString: string) => {
     const now = new Date().getTime()
     const time = new Date(dateString).getTime()
     const diffInSeconds = Math.floor((now - time) / 1000)

     if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
     const diffInMinutes = Math.floor(diffInSeconds / 60)
     if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
     const diffInHours = Math.floor(diffInMinutes / 60)
     if (diffInHours < 24) return `${diffInHours} hours ago`
     const diffInDays = Math.floor(diffInHours / 24)
     if (diffInDays < 30) return `${diffInDays} days ago`
     const diffInMonths = Math.floor(diffInDays / 30)
     if (diffInMonths < 12) return `${diffInMonths} months ago`
     const diffInYears = Math.floor(diffInMonths / 12)
     return `${diffInYears} years ago`
}

export default function Comment({ data, isChild, hasChild }: CommentProps) {
     const timeAgo = getTimeAgo(data.createdAt)

     return (
          <>
               <div className={`flex gap-2 mt-4 ${isChild && 'pl-10'}`}>
                    <Avatar>
                         <AvatarImage src={data.user.avatarUrl} />
                         <AvatarFallback><AvatarImage src="/images/default-fallback-image" /></AvatarFallback>
                    </Avatar>
                    <div>
                         <div className="flex items-center gap-3">
                              <span className="font-semibold">{data.user.name}</span>
                              <span className="text-muted-foreground text-sm">{timeAgo}</span>
                         </div>
                         <p className="leading-7 my-1 text-justify">{data.content}</p>
                         <div className="flex items-center">
                              <Button variant='ghost' size='icon'><Heart /></Button>
                              <Button variant='ghost'><MessageSquareText /> Reply</Button>
                              <Button variant='ghost' size='icon'><Ellipsis /></Button>
                         </div>
                    </div>
               </div>

               {hasChild &&
                    <>
                         <Comment data={data} isChild />
                         <Comment data={data} isChild />
                    </>
               }
          </>
     )
}
