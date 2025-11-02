'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/path'
import { useUserStore } from '@/stores/user-store'
import { Bell, ChevronDown, ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function MainHeader() {
  const t = useTranslations('Header')
  const tButton = useTranslations('Button')
  const currentPath = usePathname()
  const user = useUserStore(state => state.user)

  const navLinkItems = [
    { title: t('forum'), href: ROUTES.FORUM },
    { title: t('marketplace'), href: ROUTES.MARKETPLACE },
    { title: t('createPortfolio'), href: ROUTES.CREATE_PORTFOLIO }
  ]

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
              <Link href={ROUTES.LOGIN}><Button variant='secondary'>{tButton('register')}</Button></Link>
              <Link href={ROUTES.LOGIN}><Button>{tButton('login')}</Button></Link>
            </>
            : <>
              <div className='flex justify-end items-center gap-1'>
                <div className='flex items-center'>
                  <Link href={ROUTES.CURRENT_PROFILE} className='max-w-32 overflow-hidden text-nowrap text-ellipsis'>Nguyễn Huỳnh Bảo Trọng</Link>
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
                <Button variant='ghost' size='icon'><Link href={ROUTES.CART}><ShoppingCart /></Link></Button>
                <Button variant='ghost' size='icon'><Link href={ROUTES.NOTIFICATION}><Bell /></Link></Button>
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
import { useEffect, useState } from 'react'
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