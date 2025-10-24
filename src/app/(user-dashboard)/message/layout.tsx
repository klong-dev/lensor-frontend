import React from "react"
import ChatSidebar from "./components/chat-sidebar"

export default function MessageLayout({ children }: { children: React.ReactNode }) {
     return (
          <div className="flex h-screen w-full">
               <ChatSidebar />
               <main className="flex-1 overflow-auto">
                    {children}
               </main>
          </div>
     )
}
