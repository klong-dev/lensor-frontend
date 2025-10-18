import { ForumSidebarLeft } from '@/components/forum/sidebar/forum-sidebar-left'
import { ForumSidebarRight } from '@/components/forum/sidebar/forum-sidebar-right'
import MainHeader from '@/components/layout/header/main-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

export default function ForumLayout({ children }: { children: React.ReactNode }) {
     return (
          <>
               <MainHeader />
               <SidebarProvider>
                    <ForumSidebarLeft />
                    <SidebarInset>
                         <div className='max-w-[700px] mx-auto'>
                              {children}
                         </div>
                    </SidebarInset>
                    <ForumSidebarRight />
               </SidebarProvider>
          </>
     )
}
