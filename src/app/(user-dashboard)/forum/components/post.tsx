import { PostProps } from '@/types'
import { Avatar, Button, Image, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { LuDot } from 'react-icons/lu'
import { PiShareFat } from 'react-icons/pi'

export default function Post({ userName, time, title, content, imageUrl }: PostProps) {
     return (
          <div className='p-5'>
               <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                         <Link href={`/profile/${userName}`}><Avatar src='/images/avatar_test.jpg' /></Link>
                         <span className='font-bold ml-2 text-[var(--color-text-muted)]'>{userName}</span>
                         <LuDot />
                         <span className='text-[var(--color-text-subtle)]'>{time}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                         <Button size='xs' radius='lg'>Follow</Button>
                         <UnstyledButton className='hover:opacity-85 duration-300'><BsThreeDots /></UnstyledButton>
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
                    <Link href='/forum/36'><Button variant='default' size='compact-md' radius='lg' leftSection={<FaRegComment />}>36</Button></Link>
                    <Button variant='default' size='compact-md' radius='lg' leftSection={<PiShareFat />}>Share</Button>
               </div>
          </div>
     )
}
