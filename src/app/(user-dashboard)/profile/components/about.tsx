import React from 'react'
import { UserRound, Cake, MapPin, Mail } from 'lucide-react';

export default function About() {
  const demoUserData = {
    gender: 'Gay',
    birth: 'May 25th, 2004',
    address: '123/a Nguyen Ngoc Phuong Street, Ho Chi Minh City',
    email: 'trathao123@gmail.com'
  }

  return (
    <div className='flex flex-col h-auto py-4 px-8 pt-0'>
      <h3 className='font-bold text-2xl mb-10'>About me</h3>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-start items-start gap-2 '>
          <UserRound className='flex-shrink-0' />
          <h4 className='text-'>{demoUserData.gender}</h4>
        </div>
        <div className='border-t border-grey/10 my-3' />
        <div className='flex justify-start items-start gap-2'>
          <Cake className='flex-shrink-0' />
          <h4 className='text-md'>{demoUserData.birth}</h4>
        </div>
        <div className='border-t border-grey/10 my-3' />
        <div className='flex justify-start items-start gap-2'>
          <MapPin className='flex-shrink-0' />
          <h4 className='text-md'>{demoUserData.address}</h4>
        </div>
        <div className='border-t border-grey/10 my-3' />
        <div className='flex justify-start items-start gap-2 mb-4'>
          <Mail className='flex-shrink-0' />
          <h4 className='text-md'>{demoUserData.email}</h4>
        </div>
      </div>
    </div>
  )
}
