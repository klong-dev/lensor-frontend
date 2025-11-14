import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { BookMarked, Eye, Flag, Trash2, Bookmark } from "lucide-react"
import { useTranslations } from "next-intl"
import React from 'react'

interface DropdownMenuPostProps {
     children: React.ReactNode,
     handleDeletePost: () => void,
     handleReportPost: () => void,
     handleSavePost: () => void,
     handleViewDetail: () => void,
     isSaved: boolean,
     isOwner: boolean
}

export default function DropdownMenuPost(props: DropdownMenuPostProps) {
     const tButton = useTranslations('Button')

     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>{props.children}</DropdownMenuTrigger>
               <DropdownMenuContent>
                    <DropdownMenuItem onClick={props.handleViewDetail}>
                         <Eye />
                         {tButton('viewDetail')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                         onClick={props.handleReportPost}
                         className={props.isOwner ? 'hidden' : ''}
                    >
                         <Flag />
                         {tButton('report')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={props.handleSavePost}>
                         {props.isSaved ? <BookMarked className="fill-current" /> : <Bookmark />}
                         {props.isSaved ? tButton('unsavePost') : tButton('savePost')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                         variant="destructive"
                         onClick={props.handleDeletePost}
                         className={props.isOwner ? '' : 'hidden'}
                    >
                         <Trash2 />
                         {tButton('deletePost')}
                    </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}
