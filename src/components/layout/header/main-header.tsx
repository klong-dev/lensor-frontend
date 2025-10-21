'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/path'
import { Bell, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MainHeader() {
  const t = useTranslations('MainHeader')
  const currentPath = usePathname()
  const [isLogin, setIsLogin] = useState(true)
  console.log(currentPath)

  const navLinkItems = [
    { title: 'Forum', href: ROUTES.FORUM },
    { title: 'Marketplace', href: ROUTES.MARKETPLACE },
    { title: 'Create portfolio', href: ROUTES.MARKETPLACE }
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
          {!isLogin
            ? <>
              <Link href={ROUTES.LOGIN}><Button variant='secondary'>Register</Button></Link>
              <Link href={ROUTES.LOGIN}><Button>Login</Button></Link>
            </>
            : <>
              <div className='flex justify-end items-center gap-1'>
                <div className='flex items-center'>
                  <Link href={ROUTES.CURRENT_PROFILE} className='max-w-32 overflow-hidden text-nowrap text-ellipsis'>Nguyễn Huỳnh Bảo Trọng</Link>
                  <DropdownMenuUser><Button variant='ghost' size='icon'><ChevronDown /></Button></DropdownMenuUser>
                </div>
                <Link href={ROUTES.CURRENT_PROFILE}>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>BT</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
              <div className='flex'>
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
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'
import { useState } from 'react'

function DropdownMenuUser({ children }: { children: React.ReactNode }) {
  const { setTheme, resolvedTheme } = useTheme()

  const handleChangeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><Link href={ROUTES.CURRENT_PROFILE}>Profile</Link></DropdownMenuItem>
        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <Switch id="dark-mode" onCheckedChange={handleChangeTheme} checked={resolvedTheme === 'dark'} />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}