export interface NavbarLinkProps {
     label: string,
     icon: React.ReactNode,
     href: string,
     collapsed: boolean
}

export interface SidebarProps {
     listItems: {
          title: string,
          subs: {
               label: string,
               icon: React.ReactNode,
               href: string
          }[]
     }[]
}