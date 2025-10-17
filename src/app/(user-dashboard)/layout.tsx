import { AppSidebar } from "@/components/app-sidebar"
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
               <AppSidebar />
               <SidebarInset>
                    <BreadcrumbHeader />
                    <div className="pt-16">
                         {children}
                    </div>
               </SidebarInset>
          </SidebarProvider>
     )
}
