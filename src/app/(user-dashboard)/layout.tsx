import UserSidebar from '@/components/layout/sidebar/user-sidebar'
import React from 'react'

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
     return (
          <div className='grid lg:grid-cols-[250px_1fr]'>
               <div className='hidden lg:block'>
                    <UserSidebar />
               </div>
               <section>
                    {children}
               </section>
          </div>
     )
}
