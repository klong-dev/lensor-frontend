'use client'

import { Avatar, Menu, Switch, TextInput, UnstyledButton, useMantineColorScheme } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { FaHome, FaMoneyCheckAlt, FaPhotoVideo, FaTools, FaUser } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import NavbarLink from './navbar-link'

export default function UserSidebar() {
     const [active, setActive] = useState(0)
     const [searchValue, setSearchValue] = useState('')
     const [debounced] = useDebouncedValue(searchValue, 750)
     const { setColorScheme, colorScheme } = useMantineColorScheme()

     useEffect(() => {
          console.log(`SEARCH SIDEBAR: ${debounced}`)
     }, [debounced])

     const onChangeTheme = (value: boolean) => {
          setColorScheme(`${value ? 'dark' : 'light'}`)
     }

     const sidebar = [
          {
               title: 'MENU',
               subs: [
                    {
                         label: 'Forum',
                         icon: <FaHome />,
                         href: '/forum'
                    },
                    {
                         label: 'Profile',
                         icon: <FaUser />,
                         href: '/profile/36'
                    },
                    {
                         label: 'Message',
                         icon: <FaMessage />,
                         href: '/message'
                    },
                    {
                         label: 'Purchases',
                         icon: <FaMoneyCheckAlt />,
                         href: '/purchases'
                    },
                    {
                         label: 'Gallery',
                         icon: <FaPhotoVideo />,
                         href: '/gallery'
                    },
               ]
          },
          {
               title: 'Settings',
               subs: [
                    {
                         label: 'Setting',
                         icon: <FaTools />,
                         href: '/setting'
                    },
                    {
                         label: 'Help',
                         icon: <FaTools />,
                         href: '/setting'
                    },
                    {
                         label: 'Subscriptions',
                         icon: <FaTools />,
                         href: '/setting'
                    }
               ]
          }
     ]

     return (
          <nav className='h-screen flex flex-col justify-between sticky top-0 bg-[var(--color-box-inside)]'>
               <div className='p-4'>
                    <h1 className='py-8'>LENSOR LOGO</h1>

                    <TextInput
                         radius='md'
                         placeholder='Search'
                         leftSection={<CiSearch />}
                         className='my-2'
                         onChange={(e) => setSearchValue(e.currentTarget.value)}
                    />

                    {sidebar.map((item, index) =>
                         <div key={index}>
                              <h1 className='text-neutral-600 text-sm py-1'>{item.title}</h1>
                              {item.subs.map((sub, index) =>
                                   <NavbarLink
                                        key={index}
                                        href={sub.href}
                                        label={sub.label}
                                        icon={sub.icon}
                                        isActive={index === active}
                                        onClick={() => setActive(index)}
                                   />
                              )}
                         </div>
                    )}
               </div>
               <div className='flex items-center justify-between py-3 px-2'>
                    <div className='flex gap-2'>
                         <Link href='/profile/36'><Avatar src='/images/avatar_test.jpg' /></Link>
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
                         </Menu.Dropdown>
                    </Menu>
               </div>
          </nav>
     )
}
