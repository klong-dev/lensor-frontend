"use client"

import {
     SidebarInset,
     SidebarProvider,
     SidebarTrigger
} from "@/components/ui/sidebar"
import { UserDashboardSidebar } from "@/components/user-dashboard/sidebar/user-dashboard-sidebar"
import { SocketProvider } from "@/contexts/socket-context"
import { Separator } from "@/components/ui/separator"
import React from 'react'

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
     return (
          <SocketProvider>
               <SidebarProvider defaultOpen={false}>
                    <UserDashboardSidebar />
                    <SidebarInset>
                         <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 md:hidden">
                              <SidebarTrigger />
                              <Separator orientation="vertical" className="h-6" />
                              <span className="font-semibold text-lg">LENSOR</span>
                         </header>
                         <div className="p-3 md:p-6">
                              {children}
                         </div>
                    </SidebarInset>
               </SidebarProvider>
          </SocketProvider>
     )
}
