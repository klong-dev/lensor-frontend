'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useUserStore } from '@/stores/user-store'
import ProfileContent from './components/_profile-content/profile-content'
import About from './components/about'
import SuggestionList from './components/suggestion-list'
import { authHelpers } from '@/lib/supabase'
import { useFollowStats, useUserFollowers, useUserFollowing } from '@/lib/hooks/useFollow'
import { useState } from 'react'
import Link from 'next/link'
import { Users, Loader2 } from 'lucide-react'
import { FollowButton } from '@/components/forum/FollowButton'

export default function ProfilePage() {
     const isOwnProfile = false
     const { user } = useUserStore()
     const [followersDialogOpen, setFollowersDialogOpen] = useState(false)
     const [followingDialogOpen, setFollowingDialogOpen] = useState(false)
     const [postsCount, setPostsCount] = useState(0)

     const userId = user?.id || ''
     const { stats, loading: statsLoading } = useFollowStats(userId)
     const { followers } = useUserFollowers(userId)
     const { following } = useUserFollowing(userId)

     return (
          <div className='container mx-auto p-3 md:p-5'>
               <Card className='overflow-hidden pt-0'>
                    <div className='relative h-32 md:h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
                         <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                         {/* <Button
                                   variant='secondary'
                                   size='sm'
                                   className='absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90'
                              >
                                   Edit Cover
                              </Button> */}
                    </div>

                    <div className='relative px-4 md:px-8'>
                         <div className='flex flex-col md:flex-row items-center md:items-end justify-between -mt-12 md:-mt-20 gap-4'>
                              <div className='flex flex-col md:flex-row items-center md:items-end gap-3 md:gap-6'>
                                   <Avatar className='h-24 w-24 md:h-40 md:w-40 border-4 border-background shadow-xl'>
                                        <AvatarImage src={user?.user_metadata.picture} />
                                        <AvatarFallback className='text-2xl md:text-4xl bg-primary/10 text-primary'>
                                             {user?.user_metadata.name?.charAt(0) || 'U'}
                                        </AvatarFallback>
                                   </Avatar>

                                   <div className='mb-0 md:mb-4 space-y-1 text-center md:text-left'>
                                        <h1 className='text-xl md:text-3xl font-bold text-foreground'>
                                             {user?.user_metadata.name || 'User Name'}
                                        </h1>
                                        <p className='text-xs md:text-sm text-muted-foreground'>
                                             {user?.email || 'user@example.com'}
                                        </p>
                                   </div>
                              </div>

                              <div className='mb-0 md:mb-4 flex items-center gap-2 md:gap-3 w-full md:w-auto'>
                                   <Button variant='default' size='default' className='flex-1 md:flex-none md:size-lg'>
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

                         <div className='mt-4 md:mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 text-sm'>
                              <button
                                   onClick={() => setFollowersDialogOpen(true)}
                                   className='flex items-center gap-2 hover:underline cursor-pointer'
                              >
                                   <span className='font-semibold text-foreground'>
                                        {statsLoading ? <Loader2 className='h-4 w-4 animate-spin inline' /> : stats?.followersCount || 0}
                                   </span>
                                   <span className='text-muted-foreground'>Followers</span>
                              </button>
                              <button
                                   onClick={() => setFollowingDialogOpen(true)}
                                   className='flex items-center gap-2 hover:underline cursor-pointer'
                              >
                                   <span className='font-semibold text-foreground'>
                                        {statsLoading ? <Loader2 className='h-4 w-4 animate-spin inline' /> : stats?.followingCount || 0}
                                   </span>
                                   <span className='text-muted-foreground'>Following</span>
                              </button>
                              <div className='flex items-center gap-2'>
                                   <span className='font-semibold text-foreground'>{postsCount}</span>
                                   <span className='text-muted-foreground'>Posts</span>
                              </div>
                         </div>
                    </div>
               </Card>

               <div className='grid grid-cols-1 lg:grid-cols-4 items-start gap-3 md:gap-5 mt-3 md:mt-5'>
                    <Card className='lg:sticky top-0 order-2 lg:order-1'>
                         <About />
                    </Card>
                    <Card className='lg:col-span-2 p-4 order-1 lg:order-2'>
                         <ProfileContent onPostsCountChange={setPostsCount} />
                    </Card>
                    <div className='bg-[var(--color-box-inside)] rounded-md order-3'>
                         <Card className='lg:sticky top-0'>
                              <SuggestionList />
                         </Card>
                    </div>
               </div>

               {/* Followers Dialog */}
               <Dialog open={followersDialogOpen} onOpenChange={setFollowersDialogOpen}>
                    <DialogContent className='max-w-md'>
                         <DialogHeader>
                              <DialogTitle className='flex items-center gap-2'>
                                   <Users className='h-5 w-5' />
                                   Followers
                              </DialogTitle>
                         </DialogHeader>
                         <div className='max-h-[400px] overflow-y-auto space-y-3'>
                              {followers.length === 0 ? (
                                   <p className='text-center text-sm text-muted-foreground py-8'>No followers yet</p>
                              ) : (
                                   followers.map((follow) => (
                                        <div key={follow.id} className='flex items-center justify-between gap-3'>
                                             <Link
                                                  href={`/profile/${follow.follower?.id}`}
                                                  className='flex items-center gap-3 flex-1 hover:bg-muted/50 rounded-lg p-2 transition'
                                                  onClick={() => setFollowersDialogOpen(false)}
                                             >
                                                  <Avatar className='h-10 w-10'>
                                                       <AvatarImage src={follow.follower?.avatarUrl} />
                                                       <AvatarFallback>
                                                            {follow.follower?.name?.charAt(0)?.toUpperCase()}
                                                       </AvatarFallback>
                                                  </Avatar>
                                                  <div className='flex-1 min-w-0'>
                                                       <p className='text-sm font-medium truncate'>{follow.follower?.name}</p>
                                                       <p className='text-xs text-muted-foreground truncate'>{follow.follower?.email}</p>
                                                  </div>
                                             </Link>
                                             <FollowButton userId={follow.follower?.id || ''} size='sm' variant='outline' />
                                        </div>
                                   ))
                              )}
                         </div>
                    </DialogContent>
               </Dialog>

               {/* Following Dialog */}
               <Dialog open={followingDialogOpen} onOpenChange={setFollowingDialogOpen}>
                    <DialogContent className='max-w-md'>
                         <DialogHeader>
                              <DialogTitle className='flex items-center gap-2'>
                                   <Users className='h-5 w-5' />
                                   Following
                              </DialogTitle>
                         </DialogHeader>
                         <div className='max-h-[400px] overflow-y-auto space-y-3'>
                              {following.length === 0 ? (
                                   <p className='text-center text-sm text-muted-foreground py-8'>Not following anyone yet</p>
                              ) : (
                                   following.map((follow) => (
                                        <div key={follow.id} className='flex items-center justify-between gap-3'>
                                             <Link
                                                  href={`/profile/${follow.following?.id}`}
                                                  className='flex items-center gap-3 flex-1 hover:bg-muted/50 rounded-lg p-2 transition'
                                                  onClick={() => setFollowingDialogOpen(false)}
                                             >
                                                  <Avatar className='h-10 w-10'>
                                                       <AvatarImage src={follow.following?.avatarUrl} />
                                                       <AvatarFallback>
                                                            {follow.following?.name?.charAt(0)?.toUpperCase()}
                                                       </AvatarFallback>
                                                  </Avatar>
                                                  <div className='flex-1 min-w-0'>
                                                       <p className='text-sm font-medium truncate'>{follow.following?.name}</p>
                                                       <p className='text-xs text-muted-foreground truncate'>{follow.following?.email}</p>
                                                  </div>
                                             </Link>
                                             <FollowButton userId={follow.following?.id || ''} size='sm' variant='outline' />
                                        </div>
                                   ))
                              )}
                         </div>
                    </DialogContent>
               </Dialog>
          </div>
     )
}
