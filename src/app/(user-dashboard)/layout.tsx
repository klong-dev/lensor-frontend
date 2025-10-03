import UserSidebar from '@/components/layout/sidebar/user-sidebar'
import { Divider } from '@mantine/core'
import React from 'react'

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
     return (
          <div className='grid grid-cols-[50px_1fr] lg:grid-cols-[250px_1fr]'>
               <div>
                    <UserSidebar />
               </div>
               <section>
                    {children}
               </section>
          </div>
     )
}
