import React from "react"
import ChatSidebar from "./components/chat-sidebar"

export default function MessageLayout({ children }: { children: React.ReactNode }) {
     return (
          <div className="flex h-screen w-full">
               <div className="hidden md:block">
                    <ChatSidebar />
               </div>
               <main className="flex-1 overflow-auto w-full">
                    {children}
               </main>
          </div>
     )
}
