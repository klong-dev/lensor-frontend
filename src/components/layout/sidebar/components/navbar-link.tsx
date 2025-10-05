'use client'

import { NavbarLinkProps } from '@/types'
import { Tooltip } from '@mantine/core'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavbarLink({ label, icon, href, collapsed }: NavbarLinkProps) {
     const pathname = usePathname()
     const idFromLabel = label.replace(/\s+/g, "").toLowerCase()

     return (
          <Link
               href={href}
               className={clsx(
                    'flex items-center opacity-70 hover:opacity-90 duration-300 transition-all rounded-lg',
                    pathname.split('/')[1] === href.split('/')[1] && 'bg-[var(--color-box-inside)] opacity-100',
                    collapsed ? 'p-2 justify-center text-2xl' : 'py-2 px-6 gap-3'
               )}
          >
               {collapsed && <Tooltip target={`#${idFromLabel}`} label={label} position='right' offset={10} withArrow />}
               <div id={idFromLabel}>{icon}</div>
               {!collapsed && <span>{label}</span>}
          </Link>
     )
}
