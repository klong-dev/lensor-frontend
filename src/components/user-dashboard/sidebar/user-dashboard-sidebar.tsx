"use client"

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Images,
  Mail,
  ShoppingCart,
  Store,
  User
} from "lucide-react"
import * as React from "react"

import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/user-dashboard/sidebar/nav-main"
import { ROUTES } from "@/constants/path"

const data = {
  user: {
    name: "Nguyễn Huỳnh Bảo Trọng",
    email: "nhbaotrong@gmail.com",
    avatar: "",
  },
  teams: [
    {
      name: "Lensor",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMains: [
    {
      name: "Profile",
      url: ROUTES.CURRENT_PROFILE,
      icon: User,
    },
    {
      name: "Message",
      url: ROUTES.MESSAGE,
      icon: Mail,
    },
    {
      name: "Cart",
      url: ROUTES.CART,
      icon: ShoppingCart,
    }
  ],
  public: [
    {
      name: "Forum",
      url: ROUTES.FORUM,
      icon: Images,
    },
    {
      name: "Marketplace",
      url: ROUTES.MARKETPLACE,
      icon: Store,
    },
  ],
}

export function UserDashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain title="Personal Space" items={data.navMains} />
        <NavMain title="Public Spaces" items={data.public} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
