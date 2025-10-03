import React from 'react'
import { IoPerson } from "react-icons/io5"
import { Divider } from '@mantine/core'
import { MdCake  } from 'react-icons/md'
import { IoMdMail } from "react-icons/io"
import { FaMapLocationDot } from "react-icons/fa6"

export default function About() {
  const demoUserData = {
    gender: 'Gay',
    birth: 'May 25th, 2004',
    address: '123/a Nguyen Ngoc Phuong Street, Ho Chi Minh City',
    email: 'trathao123@gmail.com'
  }

  return (
    <div className='flex flex-col h-auto py-4 px-8'>
      <h3 className='font-bold text-2xl mb-6'>About me</h3>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-start items-start gap-2'>
          <IoPerson size='24px' className='flex-shrink-0'/>
          <h4 className='text-md'>{demoUserData.gender}</h4>
        </div>
        <Divider my='xs' />
        <div className='flex justify-start items-start gap-2'>
          <MdCake size='24px' className='flex-shrink-0'/>
          <h4 className='text-md'>{demoUserData.birth}</h4>
        </div>
        <Divider my='xs' />
        <div className='flex justify-start items-start gap-2'>
          <FaMapLocationDot size='24px' className='flex-shrink-0'/>
          <h4 className='text-md'>{demoUserData.address}</h4>
        </div>
        <Divider my='xs' />
        <div className='flex justify-start items-start gap-2 mb-4'>
          <IoMdMail size='24px' className='flex-shrink-0'/>
          <h4 className='text-md'>{demoUserData.email}</h4>
        </div>
      </div>
    </div>
  )
}
