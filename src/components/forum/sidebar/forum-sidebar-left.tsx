"use client"

import {
     AudioWaveform,
     Blocks,
     Calendar,
     Command,
     Home,
     Inbox,
     MessageCircleQuestion,
     Search,
     Settings2,
     Sparkles,
     Trash2,
} from "lucide-react"
import * as React from "react"

import {
     Sidebar,
     SidebarContent,
     SidebarRail
} from "@/components/ui/sidebar"
import { NavFavorites } from "./nav-favorites"
import { NavSecondary } from "./nav-secondary"

// This is sample data.
const data = {
     navSecondary: [
          {
               title: "Settings",
               url: "#",
               icon: Settings2,
          },
          {
               title: "Help",
               url: "#",
               icon: MessageCircleQuestion,
          },
     ],
     favorites: [
          {
               name: "General Discussion",
               url: "#",
               emoji: "💭",
          },
          {
               name: "Q&A / Help Desk",
               url: "#",
               emoji: "🤔",
          },
          {
               name: "News & Announcements",
               url: "#",
               emoji: "🗞️",
          },
          {
               name: "Gear Reviews",
               url: "#",
               emoji: "📷",
          },
          {
               name: "Editing & Post-Processing",
               url: "#",
               emoji: "💻",
          },
          {
               name: "Photo Showcase",
               url: "#",
               emoji: "🖼️",
          },
          {
               name: "Tutorials & Tips",
               url: "#",
               emoji: "✅",
          },
     ]
}

export function ForumSidebarLeft({
     ...props
}: React.ComponentProps<typeof Sidebar>) {
     return (
          <Sidebar className="border-r-0 pt-16" {...props}>
               {/* <SidebarHeader>
                    <TeamSwitcher teams={data.teams} />
                    <NavMain items={data.navMain} />
               </SidebarHeader> */}
               <SidebarContent>
                    <NavFavorites favorites={data.favorites} />
                    <NavSecondary items={data.navSecondary} className="mt-auto" />
               </SidebarContent>
               <SidebarRail />
          </Sidebar>
     )
}
