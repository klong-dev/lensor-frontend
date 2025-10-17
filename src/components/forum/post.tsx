import { PostType } from '@/types/post'
import { Avatar, Button, Image, Menu, UnstyledButton } from '@mantine/core'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { LuDot } from 'react-icons/lu'
import { PiShareFat } from 'react-icons/pi'

export default function Post({ dataPost }: { dataPost: PostType }) {
     const [expanded, setExpanded] = useState(false)

     return (
          <div className='p-5'>
               <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                         <Link href={`/profile/${123}`}><Avatar src={''} /></Link>
                         <span className='font-bold ml-2 text-[var(--c-text-title)]'>{`123`}</span>
                         <LuDot />
                         <span className='text-[var(--color-text-muted)]'>{dataPost?.createdAt}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                         <Button size='xs' radius='lg' variant={true ? 'filled' : 'default'}>
                              {true ? 'Follow' : 'Following'}
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

               <h1 className='font-bold mt-2 text-[var(--c-text-title)]'>{dataPost?.title}</h1>
               <p
                    className={clsx('text-base/5 text-justify my-1 duration-300 cursor-pointer', !expanded && 'line-clamp-3')}
                    onClick={() => setExpanded(!expanded)}
               >
                    {dataPost?.content}
               </p>

               <div className='w-full aspect-[3/2] flex justify-center items-center bg-[var(--color-box-inside)] rounded-2xl mt-3'>
                    <Image
                         src={dataPost?.imageUrl}
                         fit='contain'
                         fallbackSrc='/images/default-fallback-image.png'
                         className='max-h-full max-w-full'
                         radius='lg'
                    />
               </div>
               <div className='flex gap-3 mt-4'>
                    <Button variant='default' size='compact-md' radius='lg'>Vote</Button>
                    <Link href={`/forum/${dataPost?.id}`}>
                         <Button variant='default' size='compact-md' radius='lg' leftSection={<FaRegComment />}>
                              {dataPost?.commentCount}
                         </Button>
                    </Link>
                    <Button variant='default' size='compact-md' radius='lg' leftSection={<PiShareFat />}>Share</Button>
               </div>
          </div>
     )
}
