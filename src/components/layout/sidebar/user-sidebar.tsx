'use client'

import { Divider, TextInput } from '@mantine/core'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaHome, FaMoneyCheckAlt, FaPhotoVideo, FaTools, FaUser } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import NavbarLink from './navbar-link'

export default function UserSidebar() {
     const [active, setActive] = useState(0)

     const sidebarItems = [
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

     const sideBarItemsSetting = [
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
               label: 'Supscriptions',
               icon: <FaTools />,
               href: '/setting'
          }
     ]

     return (
          <nav className='h-screen sticky top-0'>
               <h1 className='py-8'>LENSOR</h1>
               <Divider />
               <div className='mt-5 px-2'>
                    <TextInput
                         radius='md'
                         placeholder='Search'
                         leftSection={<CiSearch />}
                         className='my-2'
                    />
                    <h1 className='text-neutral-600 text-sm py-1'>MAIN MENU</h1>
                    {sidebarItems.map((item, index) =>
                         <NavbarLink
                              key={index}
                              href={item.href}
                              label={item.label}
                              icon={item.icon}
                              isActive={index === active}
                              onClick={() => setActive(index)}
                         />
                    )}
                    <h1 className='text-neutral-600 text-sm py-1'>Setting</h1>
                    {sideBarItemsSetting.map((item, index) =>
                         <NavbarLink
                              key={index}
                              href={item.href}
                              label={item.label}
                              icon={item.icon}
                              isActive={index === active}
                              onClick={() => setActive(index)}
                         />
                    )}
               </div>
          </nav>
     )
}
