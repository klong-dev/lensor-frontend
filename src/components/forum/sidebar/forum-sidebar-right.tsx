"use client"

import { MessageSquare } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import {
     Sidebar,
     SidebarContent,
     SidebarHeader,
     SidebarMenu,
     SidebarMenuButton,
     SidebarMenuItem
} from "@/components/ui/sidebar"
import { useForums } from "@/lib/hooks/useForumHooks"

interface Forum {
     id: string
     name: string
     description: string
     communicateCount: number
}

export function ForumSidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
     const { data, isLoading } = useForums()
     const forums: Forum[] = data?.data || []

     return (
          <Sidebar
               collapsible="none"
               className="sticky top-16 hidden h-[calc(100svh-64px)] border-l lg:flex"
               {...props}
          >
               <SidebarHeader className="h-11 border-b px-2">
                    <h2 className="text-base font-semibold">Forums</h2>
               </SidebarHeader>

               <SidebarContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    <SidebarMenu className="gap-1 p-3">
                         {isLoading ? (
                              Array.from({ length: 6 }).map((_, i) => (
                                   <SidebarMenuItem key={i}>
                                        <div className="flex items-center gap-3 px-3 py-2.5">
                                             <Skeleton className="h-9 w-9 rounded-md" />
                                             <div className="flex-1 space-y-1.5">
                                                  <Skeleton className="h-3.5 w-28" />
                                                  <Skeleton className="h-3 w-full" />
                                             </div>
                                        </div>
                                   </SidebarMenuItem>
                              ))
                         ) : (
                              forums.map((forum) => (
                                   <SidebarMenuItem key={forum.id}>
                                        <SidebarMenuButton asChild className="h-auto p-0">
                                             <Link href={`/forum/${forum.id}`} className="flex items-center gap-3 px-3 py-2.5 rounded-md">
                                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                                                       <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                                  </div>
                                                  <div className="flex-1 min-w-0">
                                                       <p className="text-sm font-medium mb-1 truncate">{forum.name}</p>
                                                       <p className="text-xs text-muted-foreground line-clamp-1">{forum.description}</p>
                                                  </div>
                                                  {forum.communicateCount > 0 && (
                                                       <span className="text-xs text-muted-foreground">{forum.communicateCount}</span>
                                                  )}
                                             </Link>
                                        </SidebarMenuButton>
                                   </SidebarMenuItem>
                              ))
                         )}
                    </SidebarMenu>
               </SidebarContent>
          </Sidebar>
     )
}
