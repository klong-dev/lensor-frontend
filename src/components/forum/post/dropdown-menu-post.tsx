import React from 'react'
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuLabel,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookMarked, Eye, Flag, Trash2 } from "lucide-react"

interface DropdownMenuPostProps {
     children: React.ReactNode,
     handleDeletePost: () => void,
     handleReportPost: () => void,
     handleSavePost: () => void,
     handleViewDetail: () => void
}

export default function DropdownMenuPost(props: DropdownMenuPostProps) {
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>{props.children}</DropdownMenuTrigger>
               <DropdownMenuContent>
                    <DropdownMenuLabel>Action for this post</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={props.handleViewDetail}>
                         <Eye /> View detail
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={props.handleReportPost}>
                         <Flag /> Report
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={props.handleSavePost}>
                         <BookMarked /> Save post
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onClick={props.handleDeletePost}>
                         <Trash2 /> Delete post
                    </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}
