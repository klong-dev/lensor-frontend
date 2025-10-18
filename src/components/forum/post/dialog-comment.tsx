import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import React from 'react'

export default function DialogComment({ children }: { children: React.ReactNode }) {
     return (
          <Dialog>
               <DialogTrigger asChild>{children}</DialogTrigger>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Comment</DialogTitle>
                         <DialogDescription>
                              Share your comment
                         </DialogDescription>
                    </DialogHeader>
               </DialogContent>
          </Dialog>
     )
}
