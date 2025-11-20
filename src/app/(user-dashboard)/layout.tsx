"use client"

import {
     SidebarInset,
     SidebarProvider
} from "@/components/ui/sidebar"
import { UserDashboardSidebar } from "@/components/user-dashboard/sidebar/user-dashboard-sidebar"
import { SocketProvider } from "@/contexts/socket-context"
import React from 'react'

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
     return (
          <SocketProvider>
               <SidebarProvider>
                    <UserDashboardSidebar />
                    <SidebarInset>
                         {/* <BreadcrumbHeader /> */}
                         <div>
                              {children}
                         </div>
                    </SidebarInset>
               </SidebarProvider>
          </SocketProvider>
     )
}
