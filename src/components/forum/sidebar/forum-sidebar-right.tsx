"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import { useForums } from "@/lib/hooks/useForumHooks"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"

interface Forum {
     id: string
     name: string
     description: string
     communicateCount: number
}

export function ForumSidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
     const { data, isLoading } = useForums()
     const [showAll, setShowAll] = useState(false)

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

               <SidebarContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden px-2 py-2">
                    {isLoading ? (
                         <div className="space-y-2">
                              {Array.from({ length: 6 }).map((_, i) => (
                                   <div key={i} className="px-3 py-2 space-y-2">
                                        <Skeleton className="h-3 w-32" />
                                        <Skeleton className="h-2.5 w-20" />
                                   </div>
                              ))}
                         </div>
                    ) : forums.length === 0 ? (
                         <div className="py-12 text-center">
                              <p className="text-sm text-muted-foreground">No forums yet</p>
                              <p className="text-xs text-muted-foreground/70 mt-1">Check back later</p>
                         </div>
                    ) : (
                         <div className="space-y-1">
                              {displayedForums.map((forum) => (
                                   <Link
                                        key={forum.id}
                                        href={`/forum/${forum.id}`}
                                        className={cn(
                                             "block px-3 py-2 rounded-lg transition-colors",
                                             "hover:bg-accent hover:text-accent-foreground"
                                        )}
                                   >
                                        <p className="text-sm font-medium truncate">{forum.name}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                             {forum.communicateCount} {forum.communicateCount === 1 ? 'post' : 'posts'}
                                        </p>
                                   </Link>
                              ))}
                         </div>
                    )}
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
