import React from 'react'

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function SuggestionList() {
  const demoUserData = [
    {
      id: 1,
      name: "Sarah Johnsonasa",
      email: "sarah.johnson@gmail.com",
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@hotmail.com",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      email: "emma.rodriguez@yahoo.com",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@outlook.com",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Lisa Park",
      email: "lisa.park@gmail.com",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "James Wilson",
      email: "james.wilson@icloud.com",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 7,
      name: "Maria Garcia",
      email: "maria.garcia@protonmail.com",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 8,
      name: "Alex Kumar",
      email: "alex.kumar@gmail.com",
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 9,
      name: "Rachel Green",
      email: "rachel.green@live.com",
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 10,
      name: "Robert Martinez",
      email: "robert.martinez@fastmail.com",
      imageUrl: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face"
    }
  ]
  const defaultAvatar = '/images/avatar_test.jpg'

  return (
    <div className='flex flex-col h-120 py-4 px-5 pt-0'>
      <h3 className=' font-bold text-2xl mb-8 ps-3'>You might know</h3>
      <div className='flex flex-col gap-0 overflow-y-scroll overflow-x-hidden
      [&::-webkit-scrollbar]:w-0
        hover:[&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-gray-400
        [&::-webkit-scrollbar-thumb]:rounded-full
        transition-all duration-300'>

        {demoUserData.map((user) => (
          <Link key={user.id} href='/'>
            <div className='flex justify-start items-center gap-3 hover:bg-[#45464A] transition-colors cursor-pointer p-2 rounded-xl me-2'>
              {/* <Avatar
                src={user.imageUrl || defaultAvatar}
                alt={user.name}
                size='md'
              /> */}
              <Avatar>
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>{defaultAvatar}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col justify-center items-start gap-0 flex-1 min-w-0'>
                <h5 className='font-bold text-lg truncate w-full'>{user.name}</h5>
                <h6 className='text-xs truncate w-full'>{user.email}</h6>
              </div>
            </div>
            {user.id == demoUserData.length ? <div className='border-t border-transparent my-3' /> : <div className='border-t border-grey/10 my-3' />}
          </Link>
        ))}
      </div>
    </div>
  )
}
