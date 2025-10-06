'use client'

import { PostProps } from '@/interface/post'
import { Avatar, Button, Image, Menu, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { LuDot } from 'react-icons/lu'
import { PiShareFat } from 'react-icons/pi'

export default function Post({ user, time, title, content, imageUrl, commentCount, id }: PostProps) {
     return (
          <div className='p-5'>
               <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                         <Link href={`/profile/${user.name}`}><Avatar src={user.avatarUrl} /></Link>
                         <span className='font-bold ml-2 text-[var(--color-text-muted)]'>{user.name}</span>
                         <LuDot />
                         <span className='text-[var(--color-text-subtle)]'>{time}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                         <Button size='xs' radius='lg' variant={user.isFollowed ? 'filled' : 'default'}>
                              {user.isFollowed ? 'Follow' : 'Following'}
                         </Button>
                         <Menu shadow="md" width={200} offset={20} position='bottom-end'>
                              <Menu.Target>
                                   <UnstyledButton className='hover:opacity-85 duration-300'>
                                        <BsThreeDots />
                                   </UnstyledButton>
                              </Menu.Target>

                              <Menu.Dropdown>
                                   <Menu.Label>Application</Menu.Label>
                                   <Menu.Item>
                                        Settings
                                   </Menu.Item>
                              </Menu.Dropdown>
                         </Menu>
                    </div>
               </div>

               <h1 className='font-bold mt-2'>{title}</h1>
               <p className='text-base/5'>{content}</p>

               <div className='w-full aspect-[3/2] flex justify-center items-center bg-[var(--color-box-inside)] rounded-2xl mt-3'>
                    <Image
                         src={imageUrl}
                         fit='contain'
                         fallbackSrc='/images/default-fallback-image.png'
                         className='max-h-full max-w-full'
                         radius='lg'
                    />
               </div>
               <div className='flex gap-3 mt-4'>
                    <Button variant='default' size='compact-md' radius='lg'>Vote</Button>
                    <Link href={`/forum/${id}`}>
                         <Button variant='default' size='compact-md' radius='lg' leftSection={<FaRegComment />}>
                              {commentCount}
                         </Button>
                    </Link>
                    <Button variant='default' size='compact-md' radius='lg' leftSection={<PiShareFat />}>Share</Button>
               </div>
          </div>
     )
}
