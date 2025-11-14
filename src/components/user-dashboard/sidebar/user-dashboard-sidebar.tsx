"use client"

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
import {
  AudioWaveform,
  Bell,
  ChartLine,
  CirclePoundSterling,
  Command,
  GalleryVerticalEnd,
  Images,
  Mail,
  Package,
  ShoppingCart,
  Store,
  TicketCheck,
  User,
  Wallet
} from "lucide-react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import * as React from "react"

export function UserDashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const user = useUserStore(state => state.user)
  const t = useTranslations('Sidebar')

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
        name: t('profile'),
        url: ROUTES.CURRENT_PROFILE,
        icon: User,
      },
      {
        name: t('message'),
        url: ROUTES.MESSAGE,
        icon: Mail,
      },
      {
        name: t('notification'),
        url: ROUTES.NOTIFICATION,
        icon: Bell,
      },
      {
        name: t('cart'),
        url: ROUTES.CART,
        icon: ShoppingCart,
      },
      {
        name: t("wallet"),
        url: ROUTES.WALLET,
        icon: CirclePoundSterling,
      },
      {
        name: t("purchasedPresets"),
        url: ROUTES.PURCHASED_PRESETS,
        icon: TicketCheck,
      },
    ],
    public: [
      {
        name: t('forum'),
        url: ROUTES.FORUM,
        icon: Images,
      },
      {
        name: t('marketplace'),
        url: ROUTES.MARKETPLACE,
        icon: Store,
      },
    ],
    yourBooth: [
      {
        name: 'Revenue Statistics',
        url: ROUTES.STATISTICS,
        icon: ChartLine,
      },
      {
        name: 'Product Management',
        url: ROUTES.PRODUCT_MANAGEMENT,
        icon: Package,
      },
      {
        name: 'Sold Orders',
        url: ROUTES.SOLD_ORDERS,
        icon: Wallet,
      },
    ],
  }


  const navMainsWithActive = data.navMains.map(item => ({
    ...item,
    isActive: pathname === item.url || pathname.startsWith(item.url + '/')
  }))

  const publicWithActive = data.public.map(item => ({
    ...item,
    isActive: pathname === item.url || pathname.startsWith(item.url + '/')
  }))

  const yourBoothWithActive = data.yourBooth.map(item => ({
    ...item,
    isActive: pathname === item.url || pathname.startsWith(item.url + '/')
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain title={t('personalSpace')} items={navMainsWithActive} />
        <NavMain title={t('publicSpaces')} items={publicWithActive} />
        <NavMain title={'Your Booth'} items={yourBoothWithActive} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
