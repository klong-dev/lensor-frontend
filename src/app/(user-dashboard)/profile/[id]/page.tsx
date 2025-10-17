'use client'

import Image from 'next/image'
import ProfileContent from '../components/_profile-content/profile-content'
import About from '../components/about'
import SuggestionList from '../components/suggestion-list'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

export default function ProfilePage() {
     const isOwnProfile = false
     const { id: userId } = useParams()

     return (
          <div className='container mx-auto p-5'>
               <Card className=''>
                    <div className='relative'>
                         <div className='relative group'>
                              
                         </div>
                         <div className='flex items-end'>
                              <Avatar className='w-48 h-48'>
                                   <AvatarImage src="https://github.com/shadcn.png" />
                                   <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <span className='text-3xl font-bold mb-5 ml-3'>Trà Thảo</span>
                         </div>
                    </div>
                    <div className='h-30 flex justify-end items-center gap-5 px-20'>
                         {isOwnProfile
                              ? <Button variant='default'><span className='w-29'>Edit profile</span></Button>
                              : <>
                                   <Button><span className='w-29'>Follow</span></Button>
                                   <Button variant='default'><span className='w-29'>Go to portfolio</span></Button>
                              </>

                         }
                    </div>
               </Card>

               <div className='grid grid-cols-4 items-start gap-5 mt-5'>
                    <Card className='sticky top-0'>
                         fsd
                         {/* <About /> */}
                    </Card>
                    <Card className='col-span-2 p-4'>
                         <ProfileContent />
                    </Card>
                    <div className='bg-[var(--color-box-inside)] rounded-md'>
                         {/* <SuggestionList /> */}
                    </div>
               </div>
          </div>
     )
}
