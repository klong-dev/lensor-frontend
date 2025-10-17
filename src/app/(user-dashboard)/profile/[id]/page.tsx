'use client'

import { ActionIcon, Box, Button, Image } from '@mantine/core'
import { MdOutlineMessage } from 'react-icons/md'
import ProfileContent from '../components/_profile-content/profile-content'
import About from '../components/about'
import SuggestionList from '../components/suggestion-list'
import { useParams } from 'next/navigation'

export default function ProfilePage() {
     const isOwnProfile = false
     const { id: userId } = useParams()

     return (
          <div className='container mx-auto p-5'>
               <div className='bg-[var(--color-box-inside)] rounded-md'>
                    <div className='relative'>
                         <div className='relative group'>
                              <Image src='/images/cover_photo.png' />
                              {isOwnProfile && <div className='opacity-0 absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 group-hover:opacity-70 duration-300'>
                                   <Button variant='default' size='md'>Edit cover photo</Button>
                              </div>}
                         </div>
                         <div className='absolute flex items-end bottom-[-90px] left-[10%]'>
                              <Image
                                   src='/images/avatar_test.jpg'
                                   w={180}
                                   h={180}
                                   radius={100}
                                   className='border-2'
                              />
                              <span className='text-3xl font-bold mb-5 ml-3'>Trà Thảo</span>
                         </div>
                    </div>
                    <div className='h-30 flex justify-end items-center gap-5 px-20'>
                         {isOwnProfile
                              ? <Button size='md' variant='default'><span className='w-29'>Edit profile</span></Button>
                              : <>
                                   <ActionIcon className='rounded' radius='xl' size='xl'>
                                        <MdOutlineMessage className='pt-0.5' size={29} />
                                   </ActionIcon>
                                   <Button size='md'><span className='w-29'>Follow</span></Button>
                                   <Button size='md' variant='default'><span className='w-29'>Go to portfolio</span></Button>
                              </>

                         }
                    </div>
               </div>

               <div className='grid grid-cols-4 items-start gap-5 mt-5'>
                    <div className='bg-[var(--color-box-inside)] rounded-md sticky top-0'>
                         <About />
                    </div>
                    <div className='col-span-2 bg-[var(--color-box-inside)] rounded-md p-4'>
                         <ProfileContent />
                    </div>
                    <div className='bg-[var(--color-box-inside)] rounded-md'>
                         <SuggestionList />
                    </div>
               </div>
          </div>
     )
}
