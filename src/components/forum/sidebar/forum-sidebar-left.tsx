"use client"

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { usePosts } from "@/lib/hooks/usePostHooks"
import { PostType } from "@/types/post"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

const getCameraBrand = (make?: string, model?: string): string => {
     const brand = (make || model || '').toLowerCase()
     if (brand.includes('canon')) return 'Canon'
     if (brand.includes('nikon')) return 'Nikon'
     if (brand.includes('sony')) return 'Sony'
     if (brand.includes('fuji')) return 'Fujifilm'
     if (brand.includes('olympus')) return 'Olympus'
     if (brand.includes('panasonic')) return 'Panasonic'
     if (brand.includes('leica')) return 'Leica'
     if (brand.includes('pentax')) return 'Pentax'
     return 'Unknown'
}

export function ForumSidebarLeft({ ...props }: React.ComponentProps<typeof Sidebar>) {
     const { data } = usePosts()
     const router = useRouter()
     const searchParams = useSearchParams()
     const currentFilter = searchParams.get('camera')

     const posts: PostType[] = data?.data || []

     const cameraBrands = useMemo(() => {
          const counts = new Map<string, number>()

          posts.forEach(post => {
               if (post.imageMetadata?.cameraMake || post.imageMetadata?.cameraModel) {
                    const brand = getCameraBrand(post.imageMetadata.cameraMake, post.imageMetadata.cameraModel)
                    counts.set(brand, (counts.get(brand) || 0) + 1)
               }
          })

          return Array.from(counts.entries())
               .sort((a, b) => b[1] - a[1])
               .slice(0, 8)
     }, [posts])

     const handleBrandClick = (brand: string) => {
          const params = new URLSearchParams(searchParams.toString())
          brand === 'Unknown' ? params.delete('camera') : params.set('camera', brand)
          router.push(`/forum?${params.toString()}`)
     }

     return (
          <Sidebar className="border-r-0 pt-16" {...props}>
               <SidebarHeader className="px-4 py-3 border-b">
                    <h2 className="text-sm font-semibold">Camera Brands</h2>
               </SidebarHeader>
               <SidebarContent className="px-2 py-2">
                    {cameraBrands.length === 0 ? (
                         <div className="px-3 py-8 text-center text-xs text-muted-foreground">
                              No camera data
                         </div>
                    ) : (
                         <div className="space-y-1">
                              {cameraBrands.map(([brand, count]) => (
                                   <button
                                        key={brand}
                                        onClick={() => handleBrandClick(brand)}
                                        className={cn(
                                             "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                                             "hover:bg-accent hover:text-accent-foreground",
                                             currentFilter === brand && "bg-accent text-accent-foreground font-medium"
                                        )}
                                   >
                                        <span>{brand}</span>
                                        <span className="text-xs text-muted-foreground">{count}</span>
                                   </button>
                              ))}
                         </div>
                    )}
               </SidebarContent>
               <SidebarRail />
          </Sidebar>
     )
}
