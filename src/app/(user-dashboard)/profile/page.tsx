'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useUserStore } from '@/stores/user-store'
import ProfileContent from './components/_profile-content/profile-content'
import About from './components/about'
import SuggestionList from './components/suggestion-list'
import { authHelpers } from '@/lib/supabase'

export default function ProfilePage() {
     const isOwnProfile = false

     const { user } = useUserStore()

     return (
          <div className='container mx-auto p-5'>
               <Card className='overflow-hidden pt-0'>
                    <div className='relative h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
                         <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                              {/* <Button
                                   variant='secondary'
                                   size='sm'
                                   className='absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90'
                              >
                                   Edit Cover
                              </Button> */}
                    </div>

                    <div className='relative px-8'>
                         <div className='flex items-end justify-between -mt-20'>
                              <div className='flex items-end gap-6'>
                                   <Avatar className='h-40 w-40 border-4 border-background shadow-xl'>
                                        <AvatarImage src={user?.user_metadata.picture} />
                                        <AvatarFallback className='text-4xl bg-primary/10 text-primary'>
                                             {user?.user_metadata.name?.charAt(0) || 'U'}
                                        </AvatarFallback>
                                   </Avatar>

                                   <div className='mb-4 space-y-1'>
                                        <h1 className='text-3xl font-bold text-foreground'>
                                             {user?.user_metadata.name || 'User Name'}
                                        </h1>
                                        <p className='text-sm text-muted-foreground'>
                                             {user?.email || 'user@example.com'}
                                        </p>
                                   </div>
                              </div>

                              <div className='mb-4 flex items-center gap-3'>
                                   <Button variant='default' size='lg'>
                                        Edit Profile
                                   </Button>
                                   {/* <Button variant='outline' size='lg'>
                                        Follow
                                   </Button>
                                   <Button variant='default' size='lg'>
                                        View Portfolio
                                   </Button> */}
                              </div>
                         </div>

                         <div className='mt-6 flex items-center gap-8 text-sm'>
                              <div className='flex items-center gap-2'>
                                   <span className='font-semibold text-foreground'>124</span>
                                   <span className='text-muted-foreground'>Followers</span>
                              </div>
                              <div className='flex items-center gap-2'>
                                   <span className='font-semibold text-foreground'>89</span>
                                   <span className='text-muted-foreground'>Following</span>
                              </div>
                              <div className='flex items-center gap-2'>
                                   <span className='font-semibold text-foreground'>42</span>
                                   <span className='text-muted-foreground'>Posts</span>
                              </div>
                         </div>
                    </div>
               </Card>

               <div className='grid grid-cols-4 items-start gap-5 mt-5'>
                    <Card className='sticky top-0'>
                         <About />
                    </Card>
                    <Card className='col-span-2 p-4'>
                         <ProfileContent />
                    </Card>
                    <div className='bg-[var(--color-box-inside)] rounded-md'>
                         <Card className='sticky top-0'>
                              <SuggestionList />
                         </Card>
                    </div>
               </div>
          </div>
     )
}
