import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Ellipsis, Heart, MessageSquareText } from 'lucide-react'

export default function Comment({ isChild, hasChild }: { isChild?: boolean, hasChild?: boolean }) {
     return (
          <>
               <div className={`flex gap-2 mt-4 ${isChild && 'pl-10'}`}>
                    <Avatar>
                         <AvatarImage src="https://github.com/shadcn.png" />
                         <AvatarFallback><AvatarImage src="images/default-fallback-image" /></AvatarFallback>
                    </Avatar>
                    <div>
                         <div className="flex items-center gap-3">
                              <span className="font-semibold">Bảo Trọng</span>
                              <span className="text-muted-foreground text-sm">58 minutes ago</span>
                         </div>
                         <p className="leading-7 my-1 text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis aliquid ipsum, quam totam quo laborum ullam maxime. Repellendus harum optio ut suscipit hic laudantium saepe, culpa dolor soluta, aliquam eligendi.</p>
                         <div className="flex items-center">
                              <Button variant='ghost' size='icon'><Heart /></Button>
                              <Button variant='ghost'><MessageSquareText /> Reply</Button>
                              <Button variant='ghost' size='icon'><Ellipsis /></Button>
                         </div>
                    </div>
               </div>

               {hasChild &&
                    <>
                         <Comment isChild />
                         <Comment isChild />
                    </>
               }
          </>
     )
}
