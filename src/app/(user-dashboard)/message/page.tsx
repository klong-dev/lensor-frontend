import React from 'react'
import { MessageCircle } from 'lucide-react'

export default function MessagePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <MessageCircle className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-semibold mb-2">Select a conversation</h2>
      <p className="text-sm text-muted-foreground max-w-sm">
        Choose a conversation from the sidebar to start messaging
      </p>
    </div>
  )
}
