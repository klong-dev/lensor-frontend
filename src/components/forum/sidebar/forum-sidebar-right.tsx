"use client"

import { MessageSquare, Users } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
     Sidebar,
     SidebarContent,
     SidebarHeader,
     SidebarMenu,
     SidebarMenuButton,
     SidebarMenuItem,
     SidebarFooter
} from "@/components/ui/sidebar"
import { useForums } from "@/lib/hooks/useForumHooks"
import { cn } from "@/lib/utils"

interface Forum {
     id: string
     name: string
     description: string
     communicateCount: number
}

export function ForumSidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
     const { data, isLoading } = useForums()
     const [showAll, setShowAll] = React.useState(false)
     const forums: Forum[] = data?.data || []
     const displayedForums = showAll ? forums : forums.slice(0, 8)
     const hasMore = forums.length > 8

     return (
          <Sidebar
               collapsible="none"
               className="sticky top-16 hidden h-[calc(100svh-64px)] border-l lg:flex"
               {...props}
          >
               <SidebarHeader className="h-11 border-b px-4">
                    <h2 className="text-sm font-semibold">Popular Forums</h2>
               </SidebarHeader>

               <SidebarContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    <SidebarMenu className="gap-0.5 p-2">
                         {isLoading ? (
                              Array.from({ length: 6 }).map((_, i) => (
                                   <SidebarMenuItem key={i}>
                                        <div className="flex items-center gap-2.5 px-2 py-2">
                                             <Skeleton className="h-8 w-8 rounded-lg" />
                                             <div className="flex-1 space-y-1.5">
                                                  <Skeleton className="h-3 w-24" />
                                                  <Skeleton className="h-2.5 w-full" />
                                             </div>
                                        </div>
                                   </SidebarMenuItem>
                              ))
                         ) : forums.length === 0 ? (
                              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                                   <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-3" />
                                   <p className="text-sm font-medium text-muted-foreground">No forums yet</p>
                                   <p className="text-xs text-muted-foreground/70 mt-1">Check back later</p>
                              </div>
                         ) : (
                              displayedForums.map((forum) => (
                                   <SidebarMenuItem key={forum.id}>
                                        <SidebarMenuButton asChild className="h-auto p-0">
                                             <Link
                                                  href={`/forum/${forum.id}`}
                                                  className={cn(
                                                       "group flex items-center gap-2.5 px-2 py-2 rounded-lg",
                                                       "hover:bg-accent transition-colors duration-200"
                                                  )}
                                             >
                                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                                       <MessageSquare className="h-3.5 w-3.5 text-primary" />
                                                  </div>
                                                  <div className="flex-1 min-w-0">
                                                       <p className="text-xs font-medium truncate group-hover:text-primary transition-colors">{forum.name}</p>
                                                       <div className="flex items-center gap-1.5 mt-0.5">
                                                            <Users className="h-2.5 w-2.5 text-muted-foreground" />
                                                            <span className="text-[10px] text-muted-foreground">
                                                                 {forum.communicateCount} {forum.communicateCount === 1 ? 'post' : 'posts'}
                                                            </span>
                                                       </div>
                                                  </div>
                                             </Link>
                                        </SidebarMenuButton>
                                   </SidebarMenuItem>
                              ))
                         )}
                    </SidebarMenu>
               </SidebarContent>

               {!isLoading && hasMore && (
                    <SidebarFooter className="border-t p-2">
                         <Button
                              variant="ghost"
                              size="sm"
                              className="w-full text-xs"
                              onClick={() => setShowAll(!showAll)}
                         >
                              {showAll ? 'Show Less' : `View All (${forums.length})`}
                         </Button>
                    </SidebarFooter>
               )}
          </Sidebar>
     )
}
