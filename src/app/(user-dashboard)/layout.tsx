import UserSidebar from '@/components/layout/sidebar/user-sidebar'
import React from 'react'

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
     return (
          <div className='grid grid-cols-7'>
               <div>
                    <UserSidebar />
               </div>
               <section className='col-span-6'>
                    {children}
               </section>
          </div>
     )
}
