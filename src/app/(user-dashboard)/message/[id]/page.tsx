import { MessageCircle } from 'lucide-react'

export default function MessageDetail() {
     return (
          <div className="flex h-full items-center justify-center bg-background">
               <div className="text-center">
                    <MessageCircle className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                    <h2 className="mb-2 text-2xl font-semibold">Select a conversation</h2>
                    <p className="text-muted-foreground">
                         Choose a message from the inbox to start chatting
                    </p>
               </div>
          </div>
     )
}
