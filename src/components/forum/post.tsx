import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PostType } from '@/types/post'
import clsx from 'clsx'
import { Dot } from "lucide-react"
import Image from "next/image"
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Card } from "../ui/card"

export default function Post({ dataPost }: { dataPost: PostType }) {
     const [expanded, setExpanded] = useState(false)

     return (
          <div className='p-5 hover:backdrop-brightness-95 rounded-2xl duration-300'>
               <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                         <Avatar>
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>CN</AvatarFallback>
                         </Avatar>
                         <span className='font-bold ml-2 text-[var(--c-text-title)]'>{`123`}</span>
                         <Dot />
                         <span className='text-[var(--color-text-muted)]'>{dataPost?.createdAt}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                         <Button>
                              {true ? 'Follow' : 'Following'}
                         </Button>
                    </div>
               </div>

               <h1 className='font-bold mt-2 text-[var(--c-text-title)]'>{dataPost?.title}</h1>
               <p
                    className={clsx('text-base/5 text-justify my-1 duration-300 cursor-pointer', !expanded && 'line-clamp-3')}
                    onClick={() => setExpanded(!expanded)}
               >
                    {dataPost?.content}
               </p>

               <Card className='w-full aspect-[3/2] flex justify-center items-center mt-3'>
                    <Image
                         src={dataPost?.imageUrl ?? '/images/default-fallback-image.png'}
                         width={500}
                         height={500}
                         alt="Picture of the author"
                         className='max-h-full max-w-full object-contain'
                    />
               </Card>
               <div className='flex gap-3 mt-4'>
                    <Button variant='default'>Vote</Button>
                    <Link href={`/forum/${dataPost?.id}`}>
                         <Button variant='default' >
                              {dataPost?.commentCount}
                         </Button>
                    </Link>
                    <Button variant='default'>Share</Button>
               </div>
          </div>
     )
}
