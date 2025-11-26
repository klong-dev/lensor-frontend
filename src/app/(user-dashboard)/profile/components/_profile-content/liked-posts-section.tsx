"use client"

import { LostConnect } from '@/components/empty/lost-connect'
import { Skeleton } from '@/components/ui/skeleton'
import { useLikedPosts } from '@/lib/hooks/usePostHooks'
import { PostType } from '@/types/post'
import { Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/constants/path'
import { BASE_URL } from '@/constants'
import Image from 'next/image'

export default function LikedPostsSection() {
     const { data, error, isLoading, mutate } = useLikedPosts()

     if (error) return <LostConnect refecth={mutate} />

     if (isLoading) {
          return (
               <div className='space-y-3'>
                    {[...Array(3)].map((_, i) => (
                         <div key={i} className='flex gap-3 p-3 border rounded-lg'>
                              <Skeleton className='w-20 h-20 rounded flex-shrink-0' />
                              <div className='flex-1 space-y-2'>
                                   <Skeleton className='h-4 w-3/4' />
                                   <Skeleton className='h-3 w-full' />
                                   <Skeleton className='h-3 w-1/2' />
                              </div>
                         </div>
                    ))}
               </div>
          )
     }

     const posts = data?.data || []

     if (posts.length === 0) {
          return (
               <div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
                    <Heart className='h-16 w-16 text-muted-foreground mb-4' />
                    <h3 className='text-lg font-semibold mb-2'>No liked posts yet</h3>
                    <p className='text-sm text-muted-foreground max-w-sm'>
                         Posts you like will appear here. Start exploring and liking posts!
                    </p>
               </div>
          )
     }

     return (
          <div className='space-y-2'>
               {posts.map((post: PostType) => {
                    const imageUrl = post.thumbnailUrl || post.imageUrl;
                    const fullImageUrl = imageUrl ? `${BASE_URL}${imageUrl}` : '';

                    return (
                         <Link
                              key={post.id}
                              href={ROUTES.POST(post.id)}
                              className='flex gap-3 p-3 border rounded-lg hover:bg-accent transition-colors group'
                         >
                              <div className='relative w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-muted'>
                                   {imageUrl ? (
                                        <Image
                                             src={fullImageUrl}
                                             alt={post.title || 'Post image'}
                                             fill
                                             sizes='80px'
                                             className='object-cover group-hover:scale-105 transition-transform'
                                             unoptimized
                                        />
                                   ) : (
                                        <div className='w-full h-full flex items-center justify-center text-xs text-muted-foreground'>
                                             No Image
                                        </div>
                                   )}
                              </div>
                              <div className='flex-1 min-w-0'>
                                   <h3 className='font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors'>
                                        {post.title}
                                   </h3>
                                   <p className='text-xs text-muted-foreground line-clamp-2 mt-1'>
                                        {post.content}
                                   </p>
                                   <div className='flex items-center gap-3 mt-2 text-xs text-muted-foreground'>
                                        <span className='flex items-center gap-1'>
                                             <Heart className='w-3 h-3' />
                                             {post.voteCount}
                                        </span>
                                        <span className='flex items-center gap-1'>
                                             <MessageCircle className='w-3 h-3' />
                                             {post.commentCount}
                                        </span>
                                        <span>{post.createdAt}</span>
                                   </div>
                              </div>
                         </Link>
                    );
               })}
          </div>
     )
}
