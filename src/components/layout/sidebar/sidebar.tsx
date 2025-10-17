"use client"

import { SidebarProps } from '@/interface/sidebar'
import { Avatar, Menu, Select, Switch, TextInput, UnstyledButton, useMantineColorScheme } from '@mantine/core'
import { useDebouncedState, useHotkeys } from '@mantine/hooks'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri'
import NavbarLink from './components/navbar-link'

export default function Sidebar({ listItems }: SidebarProps) {
     const t = useTranslations('Sidebar')
     const [searchValue, setSearchValue] = useDebouncedState('', 750)
     const { setColorScheme, colorScheme, toggleColorScheme } = useMantineColorScheme()
     const [collapsed, setCollapsed] = useState(false)

     useEffect(() => {
          console.log(`SEARCH SIDEBAR: ${searchValue}`)
     }, [searchValue])

     const onChangeTheme = (value: boolean) => {
          setColorScheme(`${value ? 'dark' : 'light'}`)
     }

     const onChangeLanguage = (value: string | null) => {

     }

     useHotkeys([
          ['mod + j', () => toggleColorScheme()],
     ])

     return (
          <nav
               className={
                    clsx('hidden lg:block h-screen fixed top-0 border-r border-black/10 dark:border-white/10 duration-300',
                         collapsed ? 'w-15' : 'w-64'
                    )
               }>
               <button
                    onClick={() => setCollapsed(!collapsed)}
                    className='absolute hover:opacity-80 duration-300 bg-white dark:bg-neutral-900 right-[-13px] top-8 rounded-full p-1 cursor-pointer'
               >
                    {collapsed ? <RiArrowRightDoubleLine /> : <RiArrowLeftDoubleLine />}

               </button>
               <div className={clsx('flex flex-col justify-between h-full')}>
                    <div className='p-2'>
                         <h1 className='mb-5'>LOGO</h1>

                         <TextInput
                              radius='md'
                              placeholder={t('search')}
                              leftSection={<CiSearch />}
                              className={clsx('my-2', collapsed && 'hidden')}
                              onChange={(e) => setSearchValue(e.currentTarget.value)}
                         />

                         {listItems.map((item, index) =>
                              <div key={index}>
                                   {!collapsed && <h1 className='text-neutral-600 text-xs py-1'>{item.title}</h1>}
                                   {item.subs.map((sub, index) =>
                                        <NavbarLink
                                             key={index}
                                             href={sub.href}
                                             label={sub.label}
                                             icon={sub.icon}
                                             collapsed={collapsed}
                                        />
                                   )}
                              </div>
                         )}
                    </div>

                    <div className={clsx('flex items-center justify-between py-3 px-2', collapsed && 'hidden')}>
                         <div className='hidden lg:flex gap-2'>
                              <Link href='/profile/36'>
                                   <Avatar src='/images/avatar_test.jpg' />
                              </Link>
                              <Link href='/profile/36' className='flex-1 w-[150px] overflow-hidden text-sm'>
                                   <p className='truncate whitespace-nowrap font-bold'>Bảo Trọng Nguyễn Huỳnh</p>
                                   <p className='truncate whitespace-nowrap opacity-80'>baotrong@gmail.com</p>
                              </Link>
                         </div>
                         <Menu shadow="md" position='right-end' withArrow>
                              <Menu.Target>
                                   <UnstyledButton><BsThreeDots size={20} /></UnstyledButton>
                              </Menu.Target>

                              <Menu.Dropdown>
                                   <Menu.Label>Application</Menu.Label>
                                   <Menu.Item closeMenuOnClick={false}>
                                        <Switch
                                             label='Theme'
                                             labelPosition='left'
                                             size="md"
                                             color="dark.4"
                                             onLabel={<IoMdMoon />}
                                             offLabel={<IoMdSunny />}
                                             onChange={e => onChangeTheme(e.currentTarget.checked)}
                                             defaultChecked={colorScheme === 'dark'}
                                        />
                                   </Menu.Item>
                                   <Menu.Item closeMenuOnClick={false}>
                                        <Select
                                             label="Language"
                                             placeholder="Language"
                                             data={['EN', 'VI']}
                                             onChange={onChangeLanguage}
                                        />
                                   </Menu.Item>
                              </Menu.Dropdown>
                         </Menu>
                    </div>
               </div>
          </nav>
     )
}
