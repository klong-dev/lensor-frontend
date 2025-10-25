import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ROUTES } from "@/constants/path"
import Link from "next/link"

interface DataMessageProps {
     chatPartner: {
          id: string,
          avatar: string,
          fullname: string,
     },
     chatId: string,
     lastMessage: string,
     lastMessageTime: string,
     countUnreadMessage: string,
     isActive: boolean
}

export default function ChatItem({ data }: { data: DataMessageProps }) {
     return (
          <Link href={`${ROUTES.MESSAGE}/${data.chatId}`} className="border-b flex justify-between p-4 cursor-pointer hover:bg-accent duration-200">
               <div className="flex items-center gap-2">
                    <div className="relative">
                         <Avatar className="w-10 h-10">
                              <AvatarImage src={data?.chatPartner.avatar} alt={data?.chatPartner.fullname} />
                              <AvatarFallback>{data?.chatPartner.fullname}</AvatarFallback>
                         </Avatar>
                         {
                              data?.isActive &&
                              <div className="absolute right-0 bottom-0">
                                   <span className="relative flex size-[10px]">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex size-[10px] rounded-full bg-green-500" />
                                   </span>
                              </div>
                         }
                    </div>
                    <div>
                         <h1 className="font-bold tracking-tight">{data?.chatPartner.fullname}</h1>
                         <p className="text-muted-foreground text-sm truncate w-44 overflow-hidden">{data?.lastMessage}</p>
                    </div>
               </div>

               <div className="flex flex-col items-center gap-1">
                    <span className="text-muted-foreground text-sm">{data?.lastMessageTime}</span>
                    <Badge>{data?.countUnreadMessage}</Badge>
               </div>

          </Link>
     )
}
