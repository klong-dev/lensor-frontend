'usee client'

import { Burger, Button, Drawer, NavLink } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface MainHeaderProps {
  isLogin: boolean
}

export default function MainHeader({ isLogin }: MainHeaderProps) {
  const t = useTranslations('MainHeader')
  const [opened, { open, close }] = useDisclosure(false)

  const navLinkItems = [
    { title: t('feature'), href: '/' },
    { title: t('pricing'), href: '/' },
    { title: t('faq'), href: '/' }
  ]

  return (
    <header className='border-b-[0.5px] border-b-gray-300/10 pl-2 pr-2'>
      <div className='container flex justify-between gap-10 items-center h-16'>
        <Link href='/#'>LOGO</Link>
        <div className='hidden md:flex gap-10 items-center'>
          {navLinkItems.map((item, index) =>
            <Link href={item.href} key={index}>{item.title}</Link>)
          }
          {!isLogin && <Button variant='default'>{t('login')}</Button>}
        </div>

        <Burger className='md:hidden' opened={opened} onClick={open} />
      </div>

      <Drawer
        opened={opened}
        onClose={close}
        position='right'
        overlayProps={{ backgroundOpacity: 0.5, blur: 1 }}
      >
        {navLinkItems.map((item, index) =>
          <NavLink key={index} href={item.href} label={item.title} className='font-bold' />
        )}
      </Drawer>
    </header>
  )
}
