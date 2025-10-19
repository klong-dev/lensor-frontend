import MainHeader from '@/components/layout/header/main-header'
import React from 'react'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
     return (
          <>
               <MainHeader />
               {children}
          </>
     )
}
