import { UserDashboardSidebar } from "@/components/user-dashboard/sidebar/user-dashboard-sidebar"
import BreadcrumbHeader from "@/components/layout/header/breadcrumb-header"
import {
     SidebarInset,
     SidebarProvider
} from "@/components/ui/sidebar"
import { useTranslations } from 'next-intl'
import React from 'react'

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
     const t = useTranslations('Sidebar')

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
