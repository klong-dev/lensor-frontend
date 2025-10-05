import UserSidebar from '@/components/layout/sidebar/user-sidebar'
import React from 'react'

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
     return (
          <div className='grid grid-cols-[auto_1fr]'>
               <div>
                    <UserSidebar />
               </div>
               <section>
                    {children}
               </section>
          </div>
     )
}
