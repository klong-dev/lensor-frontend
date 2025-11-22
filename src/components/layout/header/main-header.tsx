'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ROUTES } from '@/constants/path'
import { notificationApi } from '@/lib/apis/notificationApi'
import { useCart } from '@/lib/hooks/useCartHooks'
import { useNotifications } from '@/lib/hooks/useNotificationHooks'
import { useCartStore } from '@/stores/cart-store'
import { useNotificationStore } from '@/stores/notification-store'
import { useUserStore } from '@/stores/user-store'
import { useWalletStore } from '@/stores/wallet-store'
import { Bell, ChevronDown, Menu, ShoppingCart, Wallet } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MainHeader() {
  const t = useTranslations('Header')
  const tButton = useTranslations('Button')
  const currentPath = usePathname()
  const user = useUserStore(state => state.user)
  const { walletData, fetchWallet } = useWalletStore()
  const { itemCount, setCart } = useCartStore()
  const { unreadCount, setNotifications } = useNotificationStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    <header className='z-30 backdrop-blur-2xl border-b-[0.5px] border-b-gray-300/10 px-3 md:px-6 sticky top-0'>
      <div className='flex justify-between gap-2 md:gap-10 items-center h-14 md:h-16'>
        <div className='flex items-center gap-2 w-40'>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className='lg:hidden'>
              <Button variant='ghost' size='icon' className='h-9 w-9'>
                <Menu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-[280px] sm:w-[320px]'>
              <div className='flex flex-col gap-4 mt-8'>
                <Link href={ROUTES.FORUM} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={currentPath === ROUTES.FORUM ? 'secondary' : 'ghost'}
                    className='w-full justify-start text-base'
                  >
                    {t('forum')}
                  </Button>
                </Link>
                <Link href={ROUTES.MARKETPLACE} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={currentPath === ROUTES.MARKETPLACE ? 'secondary' : 'ghost'}
                    className='w-full justify-start text-base'
                  >
                    {t('marketplace')}
                  </Button>
                </Link>
                {user && (
                  <>
                    <hr className='my-2' />
                    <Link href={ROUTES.WALLET} onClick={() => setMobileMenuOpen(false)}>
                      <Button variant='outline' className='w-full justify-start gap-2'>
                        <Wallet className='h-4 w-4' />
                        <span>{formattedBalance} ₫</span>
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Link href='/#' className='text-violet-600 text-xl md:text-2xl font-extrabold'>
            LENSOR
          </Link>
        </div>

        <div className='hidden lg:flex gap-10 items-center'>
          {navLinkItems.map((item, index) =>
            <Link href={item.href} key={index}>
              <Button variant={currentPath === item.href ? 'secondary' : 'ghost'}>{item.title}</Button>
            </Link>
          )}
        </div>

        <div className='flex justify-end items-center gap-1 sm:gap-2 md:gap-5 w-auto md:w-44'>
          {!user
            ? <>
              <Button variant='secondary' onClick={handleLoginRedirect} size='sm' className='hidden md:inline-flex'>
                {tButton('register')}
              </Button>
              <Button onClick={handleLoginRedirect} size='sm' className='h-8 md:h-9 text-xs md:text-sm'>{tButton('login')}</Button>
            </>
            : <>
              <div className='hidden md:flex justify-end items-center gap-1'>
                <div className='flex items-center'>
                  <Link href={ROUTES.CURRENT_PROFILE} className='max-w-32 overflow-hidden text-nowrap text-ellipsis'>
                    {user?.user_metadata.name}
                  </Link>
                  <DropdownMenuUser>
                    <Button variant='ghost' size='icon'><ChevronDown /></Button>
                  </DropdownMenuUser>
                </div>
                <Link href={ROUTES.CURRENT_PROFILE}>
                  <Avatar>
                    <AvatarImage src={user?.user_metadata.avatar_url} />
                    <AvatarFallback>BT</AvatarFallback>
                  </Avatar>
                </Link>
              </div>

              <div className='flex gap-1'>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant='ghost' size='icon' className='relative h-9 w-9 hidden md:inline-flex'>
                      <Wallet className='h-4 w-4' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-3' align='end'>
                    <div className='flex flex-col gap-1'>
                      <p className='text-xs text-muted-foreground'>Balance</p>
                      <p className='text-lg font-bold'>{formattedBalance} ₫</p>
                      <Link href={ROUTES.WALLET} className='mt-2'>
                        <Button size='sm' className='w-full'>
                          View Wallet
                        </Button>
                      </Link>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button variant='ghost' size='icon' className='relative h-9 w-9'>
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
                <Button variant='ghost' size='icon' className='relative h-9 w-9' onClick={handleNotificationClick}>
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

                <Link href={ROUTES.CURRENT_PROFILE} className='md:hidden'>
                  <Avatar className='h-9 w-9'>
                    <AvatarImage src={user?.user_metadata.avatar_url} />
                    <AvatarFallback>BT</AvatarFallback>
                  </Avatar>
                </Link>
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