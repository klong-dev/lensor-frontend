'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/constants/path'
import { useUserStore } from '@/stores/user-store'
import { useWalletStore } from '@/stores/wallet-store'
import { useCartStore } from '@/stores/cart-store'
import { useNotificationStore } from '@/stores/notification-store'
import { Bell, ChevronDown, ShoppingCart, Wallet } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCart } from '@/lib/hooks/useCartHooks'
import { useNotifications } from '@/lib/hooks/useNotificationHooks'
import { notificationApi } from '@/lib/apis/notificationApi'

export default function MainHeader() {
  const t = useTranslations('Header')
  const tButton = useTranslations('Button')
  const currentPath = usePathname()
  const user = useUserStore(state => state.user)
  const { walletData, fetchWallet } = useWalletStore()
  const { itemCount, setCart } = useCartStore()
  const { unreadCount, setNotifications } = useNotificationStore()

  const { data: cartData } = useCart()
  const { data: notificationData } = useNotifications()

  useEffect(() => {
    if (user) {
      fetchWallet()
    }
  }, [user, fetchWallet])

  useEffect(() => {
    if (cartData) {
      setCart(cartData)
    }
  }, [cartData, setCart])

  useEffect(() => {
    if (notificationData?.data) {
      setNotifications(notificationData.data.notifications, notificationData.data.meta.unreadCount)
    }
  }, [notificationData, setNotifications])

  const handleNotificationClick = async () => {
    if (user && unreadCount > 0) {
      try {
        await notificationApi.markAllAsRead()
      } catch (error) {
        console.error('Failed to mark all as read:', error)
      }
    }
  }

  const balance = walletData?.balance || 0
  const formattedBalance = balance.toLocaleString('vi-VN')

  const navLinkItems = [
    { title: t('forum'), href: ROUTES.FORUM },
    { title: t('marketplace'), href: ROUTES.MARKETPLACE }
  ]

  // Hàm xử lý lưu session và chuyển hướng login
  const handleLoginRedirect = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search)
      window.location.href = '/(auth)/login'
    }
  }

  return (
    <header className='z-30 backdrop-blur-2xl border-b-[0.5px] border-b-gray-300/10 pl-2 pr-2 sticky top-0'>
      <div className='flex justify-between gap-10 items-center h-16'>
        <div className='w-64'><Link href='/#' className='text-violet-600 text-2xl font-extrabold ml-5'>LENSOR</Link></div>
        <div className='hidden md:flex gap-10 items-center'>
          {navLinkItems.map((item, index) =>
            <Link href={item.href} key={index}>
              <Button variant={currentPath === item.href ? 'secondary' : 'ghost'}>{item.title}</Button>
            </Link>
          )}
        </div>
        <div className='w-64 flex justify-end items-center gap-5'>
          {!user
            ? <>
              <Button variant='secondary' onClick={handleLoginRedirect}>{tButton('register')}</Button>
              <Button onClick={handleLoginRedirect}>{tButton('login')}</Button>
            </>
            : <>
              <Link href={ROUTES.WALLET}>
                <Button variant='outline' size='sm' className='gap-1.5'>
                  <Wallet className='h-4 w-4' />
                  <span className='font-semibold'>{formattedBalance} ₫</span>
                </Button>
              </Link>
              <div className='flex justify-end items-center gap-1'>
                <div className='flex items-center'>
                  <Link href={ROUTES.CURRENT_PROFILE} className='max-w-32 overflow-hidden text-nowrap text-ellipsis'>{user?.user_metadata.name}</Link>
                  <DropdownMenuUser><Button variant='ghost' size='icon'><ChevronDown /></Button></DropdownMenuUser>
                </div>
                <Link href={ROUTES.CURRENT_PROFILE}>
                  <Avatar>
                    <AvatarImage src={user?.user_metadata.avatar_url} />
                    <AvatarFallback>BT</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
              <div className='flex'>
                <Button variant='ghost' size='icon' className='relative'>
                  <Link href={ROUTES.CART}>
                    <ShoppingCart className='h-4 w-4' />
                    {itemCount > 0 && (
                      <Badge
                        variant='destructive'
                        className='absolute -top-0.5 right-0.5 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-violet-600 hover:bg-violet-600'
                      >
                        {itemCount > 99 ? '99+' : itemCount}
                      </Badge>
                    )}
                  </Link>
                </Button>
                <Button variant='ghost' size='icon' className='relative' onClick={handleNotificationClick}>
                  <Link href={ROUTES.NOTIFICATION}>
                    <Bell className='h-4 w-4' />
                    {unreadCount > 0 && (
                      <Badge
                        variant='destructive'
                        className='absolute -top-0.5 right-0.5 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-violet-600 hover:bg-violet-600'
                      >
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </Badge>
                    )}
                  </Link>
                </Button>
              </div>
            </>
          }
        </div>
      </div>
    </header>
  )
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { APP_NAME, DEFAULT_LOCALE } from '@/constants'
import { authHelpers } from '@/lib/supabase'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { toast } from 'sonner'

function DropdownMenuUser({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState("")
  const { setTheme, resolvedTheme } = useTheme()
  const router = useRouter()
  const tButton = useTranslations('Button')
  const tToastMsg = useTranslations("ToastMessage")

  const handleChangeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
  }

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${APP_NAME}_LOCALE=`))
      ?.split("=")[1]

    if (cookieLocale) {
      setLocale(cookieLocale)
    } else {
      setLocale(DEFAULT_LOCALE)
      document.cookie = `${APP_NAME}_LOCALE=${DEFAULT_LOCALE}`
      router.refresh()
    }
  }, [router])

  const handleChangeLanguage = (newLocale: string) => {
    setLocale(newLocale)
    document.cookie = `${APP_NAME}_LOCALE=${newLocale}`
    router.refresh()
  }

  const handleLogout = async () => {
    const res = await authHelpers.signOut()
    if (!res.error) {
      toast(tToastMsg("loggoutSuccess"))
      router.refresh()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{tButton('myAccount')}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href={ROUTES.CURRENT_PROFILE}>{tButton('profile')}</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <Label htmlFor="dark-mode">{tButton('darkMode')}</Label>
          <Switch id="dark-mode" onCheckedChange={handleChangeTheme} checked={resolvedTheme === 'dark'} />
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <Select onValueChange={handleChangeLanguage} defaultValue={locale}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{tButton('languages')}</SelectLabel>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="vi">Việt Nam</SelectItem>
                <SelectItem value="jp">日本語</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogout}>
          {tButton('logout')}
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}