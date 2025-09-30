'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavbarLinkProps {
     label: string,
     icon: React.ReactNode,
     href: string,
     isActive: boolean,
     onClick: () => void
}

export default function NavbarLink({ label, icon, href, isActive, onClick }: NavbarLinkProps) {
     const pathname = usePathname()

     return (
          <Link
               href={href}
               className={
                    `flex items-center gap-3 py-2 px-6 opacity-70 hover:opacity-90 duration-200 transition-all rounded-lg
                    ${pathname.split('/')[1] === href.split('/')[1] && 'bg-[var(--color-box-inside)] to-40% opacity-100'}
                    `
               }
               onClick={onClick}
          >
               {icon}
               <span className=''>{label}</span>
          </Link>
     )
}
