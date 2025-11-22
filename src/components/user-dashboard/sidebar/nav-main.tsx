"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import {
  Folder,
  MoreHorizontal,
  type LucideIcon
} from "lucide-react"
import Link from "next/link"

export function NavMain({
  title,
  items
}: {
  title: string,
  items: {
    name: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    badge?: number
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild className={item.isActive ? 'bg-sidebar-accent' : ''}>
              <Link href={item.url}>
                <item.icon />
                <span>{item.name}</span>
                {item.badge && item.badge > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-violet-600"
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Link href={item.url}>Go to this page</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
