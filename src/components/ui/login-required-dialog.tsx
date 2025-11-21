'use client'

import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogIn, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface LoginRequiredDialogProps {
     open: boolean
     onOpenChange: (open: boolean) => void
     title?: string
     description?: string
}

export function LoginRequiredDialog({
     open,
     onOpenChange,
     title = "Login Required",
     description = "You need to be logged in to perform this action. Please login to continue."
}: LoginRequiredDialogProps) {
     const router = useRouter()

     const handleLogin = () => {
          if (typeof window !== 'undefined') {
               sessionStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search)
               router.push('/(auth)/login')
          }
          onOpenChange(false)
     }

     return (
          <Dialog open={open} onOpenChange={onOpenChange}>
               <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                         <DialogTitle className="flex items-center gap-2">
                              <LogIn className="h-5 w-5 text-primary" />
                              {title}
                         </DialogTitle>
                         <DialogDescription className="pt-2">
                              {description}
                         </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex-row gap-2 sm:justify-end">
                         <Button
                              variant="outline"
                              onClick={() => onOpenChange(false)}
                              className="flex-1 sm:flex-none"
                         >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                         </Button>
                         <Button
                              onClick={handleLogin}
                              className="flex-1 sm:flex-none"
                         >
                              <LogIn className="h-4 w-4 mr-2" />
                              Login
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}
