import React from 'react'
import { UserRound, Cake, MapPin, Mail } from 'lucide-react'
import { useUserStore } from '@/stores/user-store'

export default function About() {
  const user = useUserStore(state => state.user)

  return (
    <div className='flex flex-col h-auto py-4 px-8 pt-0'>
      <h3 className='font-bold text-2xl mb-10'>About me</h3>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-start items-start gap-2 '>
          <UserRound className='flex-shrink-0' />
          <h4 className='text-'>Male</h4>
        </div>
        <div className='border-t border-grey/10 my-3' />
        <div className='flex justify-start items-start gap-2'>
          <Cake className='flex-shrink-0' />
          <h4 className='text-md'>29/03/2004</h4>
        </div>
        <div className='border-t border-grey/10 my-3' />
        <div className='flex justify-start items-start gap-2'>
          <MapPin className='flex-shrink-0' />
          <h4 className='text-md'>FPT University</h4>
        </div>
        <div className='border-t border-grey/10 my-3' />
        <div className='flex justify-start items-start gap-2 mb-4'>
          <Mail className='flex-shrink-0' />
          <h4 className='text-md'>{user?.email}</h4>
        </div>
      </div>
    </div>
  )
}
