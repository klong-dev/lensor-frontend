'use client'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/path'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MainHeaderProps {
  isLogin: boolean
}

export default function MainHeader() {
  const t = useTranslations('MainHeader')
  const currentPath = usePathname()
  console.log(currentPath)

  const navLinkItems = [
    { title: 'Forum', href: ROUTES.FORUM },
    { title: 'Marketplace', href: ROUTES.MARTKETPLACE },
    { title: 'Create portfolio', href: ROUTES.MARTKETPLACE }
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
        <div className='w-64'>

        </div>
      </div>
    </header>
  )
}
