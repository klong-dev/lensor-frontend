import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { BookMarked, Eye, Flag, Trash2 } from "lucide-react"
import React from 'react'

interface DropdownMenuPostProps {
     children: React.ReactNode,
     handleDeletePost: () => void,
     handleReportPost: () => void,
     handleSavePost: () => void,
     handleViewDetail: () => void,
     isOwner: boolean
}

export default function DropdownMenuPost(props: DropdownMenuPostProps) {
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>{props.children}</DropdownMenuTrigger>
               <DropdownMenuContent>
                    <DropdownMenuItem onClick={props.handleViewDetail}>
                         <Eye /> View detail
                    </DropdownMenuItem>
                    <DropdownMenuItem
                         onClick={props.handleReportPost}
                         className={props.isOwner ? 'hidden' : ''}
                    >
                         <Flag /> Report
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={props.handleSavePost}>
                         <BookMarked /> Save post
                    </DropdownMenuItem>
                    <DropdownMenuItem
                         variant="destructive"
                         onClick={props.handleDeletePost}
                         className={props.isOwner ? '' : 'hidden'}
                    >
                         <Trash2 /> Delete post
                    </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}
