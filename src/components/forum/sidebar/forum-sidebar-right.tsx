import * as React from "react"

import {
     Sidebar,
     SidebarContent,
     SidebarFooter,
     SidebarHeader,
     SidebarMenu,
     SidebarMenuButton,
     SidebarMenuItem,
     SidebarSeparator
} from "@/components/ui/sidebar"

export function ForumSidebarRight({
     ...props
}: React.ComponentProps<typeof Sidebar>) {
     return (
          <Sidebar
               collapsible="none"
               className="sticky top-16 hidden h-[calc(100svh-64px)] border-l lg:flex"
               {...props}
          >
               <SidebarHeader className="border-sidebar-border h-16 border-b">
               </SidebarHeader>
               <SidebarContent>
                    <SidebarSeparator className="mx-0" />
               </SidebarContent>
               <SidebarFooter>
                    <SidebarMenu>
                         <SidebarMenuItem>
                              <SidebarMenuButton>
                                   <span>Button</span>
                              </SidebarMenuButton>
                         </SidebarMenuItem>
                    </SidebarMenu>
               </SidebarFooter>
          </Sidebar>
     )
}
