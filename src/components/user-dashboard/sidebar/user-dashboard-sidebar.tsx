"use client"

import {
  AudioWaveform,
  Bell,
  Command,
  GalleryVerticalEnd,
  Images,
  Mail,
  ShoppingCart,
  Store,
  User,
} from "lucide-react"
import { usePathname } from "next/navigation"
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
import { useUserStore } from "@/stores/user-store"

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
      name: "Notification",
      url: ROUTES.NOTIFICATION,
      icon: Bell,
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
  const pathname = usePathname()
  const user = useUserStore(state => state.user)
  console.log(user);

  const navMainsWithActive = data.navMains.map(item => ({
    ...item,
    isActive: pathname === item.url || pathname.startsWith(item.url + '/')
  }))

  const publicWithActive = data.public.map(item => ({
    ...item,
    isActive: pathname === item.url || pathname.startsWith(item.url + '/')
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain title="Personal Space" items={navMainsWithActive} />
        <NavMain title="Public Spaces" items={publicWithActive} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
