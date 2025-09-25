import Link from 'next/link'
import React from 'react'

interface NavbarLinkProps {
     label: string,
     icon: React.ReactNode,
     href: string,
     isActive: boolean,
     onClick: () => void
}

export default function NavbarLink({ label, icon, href, isActive, onClick }: NavbarLinkProps) {
     return (
          <Link
               href={href}
               className={
                    `flex items-center gap-3 py-3 pl-8 opacity-70 hover:opacity-90 duration-200 transition-all
                    ${isActive && 'bg-gradient-to-r from-neutral-700 to-40% opacity-100'}
                    `
               }
               onClick={onClick}
          >
               {icon}
               <span className=''>{label}</span>
          </Link>
     )
}
