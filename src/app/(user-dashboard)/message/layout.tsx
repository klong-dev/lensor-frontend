import React from "react"
import ChatSidebar from "./components/chat-sidebar"

export default function MessageLayout({ children }: { children: React.ReactNode }) {
     return (
          <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
               <div className="hidden md:flex md:w-80 lg:w-96 border-r flex-shrink-0">
                    <ChatSidebar />
               </div>
               <div className="flex-1 flex flex-col min-w-0">
                    {children}
               </div>
          </div>
     )
}
