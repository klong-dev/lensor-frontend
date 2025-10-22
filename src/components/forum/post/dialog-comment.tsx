import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Send } from "lucide-react"
import React from 'react'
import Comment from "./comment"

export default function DialogComment({ children }: { children: React.ReactNode }) {
     return (
          <Dialog>
               <DialogTrigger asChild>{children}</DialogTrigger>
               <DialogContent className="h-[95%] !max-w-[750px]">
                    <DialogHeader className="shrink-0">
                         <DialogTitle>Comment (25)</DialogTitle>
                         <DialogDescription>
                              Share your comment
                         </DialogDescription>

                    </DialogHeader>
                    <div
                         className="pr-2 overflow-y-auto 
                              [&::-webkit-scrollbar]:w-1
                              hover:[&::-webkit-scrollbar]:w-1
                              [&::-webkit-scrollbar-track]:bg-transparent
                              [&::-webkit-scrollbar-thumb]:bg-gray-400/0
                              hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
                              [&::-webkit-scrollbar-thumb]:rounded-full
                              transition-colors
                              duration-300"
                    >
                         <Comment hasChild />
                         <Comment />
                         <Comment />
                         <Comment />
                    </div>
                    <InputGroup className="h-12">
                         <InputGroupInput placeholder="Search..." />
                         <InputGroupAddon>
                              <Avatar>
                                   <AvatarImage src="https://github.com/shadcn.png" />
                                   <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                         </InputGroupAddon>
                         <InputGroupAddon align="inline-end"><Button><Send /></Button></InputGroupAddon>
                    </InputGroup>
               </DialogContent>
          </Dialog>
     )
}
