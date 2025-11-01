import {
     SidebarInset,
     SidebarProvider
} from "@/components/ui/sidebar"
import { UserDashboardSidebar } from "@/components/user-dashboard/sidebar/user-dashboard-sidebar"
import React from 'react'

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {

     return (
          <SidebarProvider>
               <UserDashboardSidebar />
               <SidebarInset>
                    {/* <BreadcrumbHeader /> */}
                    <div>
                         {children}
                    </div>
               </SidebarInset>
          </SidebarProvider>
     )
}
