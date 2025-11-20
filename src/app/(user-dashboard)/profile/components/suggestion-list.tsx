'use client'

import React from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useMyFollowing } from '@/lib/hooks/useFollow'
import { Loader2, Users } from 'lucide-react'

export default function SuggestionList() {
  const { following, loading } = useMyFollowing()
  const defaultAvatar = '/images/avatar_test.jpg'

  // Ensure following is always an array
  const followingList = Array.isArray(following) ? following : []

  if (loading) {
    return (
      <div className='flex flex-col h-120 py-4 px-5 pt-0'>
        <h3 className='font-bold text-2xl mb-8 ps-3 flex items-center gap-2'>
          <Users className='h-6 w-6' />
          Following
        </h3>
        <div className='flex justify-center items-center h-40'>
          <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col h-120 py-4 px-5 pt-0'>
      <h3 className='font-bold text-2xl mb-8 ps-3 flex items-center gap-2'>
        <Users className='h-6 w-6' />
        Following ({followingList.length})
      </h3>
      <div className='flex flex-col gap-0 overflow-y-scroll overflow-x-hidden
      [&::-webkit-scrollbar]:w-0
        hover:[&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-gray-400
        [&::-webkit-scrollbar-thumb]:rounded-full
        transition-all duration-300'>

        {followingList.length === 0 ? (
          <div className='text-center py-8 text-muted-foreground'>
            <Users className='h-12 w-12 mx-auto mb-3 opacity-40' />
            <p className='text-sm'>You are not following anyone yet</p>
          </div>
        ) : (
          followingList.map((follow, index) => (
            <Link key={follow.id} href={`/profile/${follow.following?.id}`}>
              <div className='flex justify-start items-center gap-3 hover:bg-[#45464A] transition-colors cursor-pointer p-2 rounded-xl me-2'>
                <Avatar>
                  <AvatarImage src={follow.following?.avatarUrl} />
                  <AvatarFallback>
                    {follow.following?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col justify-center items-start gap-0 flex-1 min-w-0'>
                  <h5 className='font-bold text-lg truncate w-full'>{follow.following?.name}</h5>
                  <h6 className='text-xs truncate w-full text-muted-foreground'>{follow.following?.email}</h6>
                </div>
              </div>
              {index === followingList.length - 1 ? (
                <div className='border-t border-transparent my-3' />
              ) : (
                <div className='border-t border-grey/10 my-3' />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
