'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useParams } from 'next/navigation'
import ProfileContent from './components/_profile-content/profile-content'
import About from './components/about'
import SuggestionList from './components/suggestion-list'
import { authHelpers } from '@/lib/supabase'
import { useUserStore } from '@/stores/user-store'

export default function ProfilePage() {
     const isOwnProfile = false

     const { user, fetchUser } = useUserStore()

     const handleRefresh = () => {
          fetchUser()
     }

     return (
          <div className='container mx-auto p-5'>
               <Button onClick={handleRefresh}>Test</Button>
               <Card className=''>
                    <div className='relative'>
                         <div className='relative group'>

                         </div>
                         <div className='flex items-end'>
                              <Avatar className='w-48 h-48'>
                                   <AvatarImage src={user?.user_metadata.picture} />
                                   <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <span className='text-3xl font-bold mb-5 ml-3'>{user?.user_metadata.name}</span>
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
                         {/* <About /> */}
                         <About />
                    </Card>
                    <Card className='col-span-2 p-4'>
                         <ProfileContent />
                    </Card>
                    <div className='bg-[var(--color-box-inside)] rounded-md'>
                         {/* <SuggestionList /> */}
                         <Card className='sticky top-0'>
                              <SuggestionList />
                         </Card>
                    </div>
               </div>
          </div>
     )
}
