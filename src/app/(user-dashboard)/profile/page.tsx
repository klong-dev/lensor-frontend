'use client'

import { FollowButton } from '@/components/forum/FollowButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useFollowStats, useUserFollowers, useUserFollowing } from '@/lib/hooks/useFollow'
import { useUserStore } from '@/stores/user-store'
import { Loader2, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import ProfileContent from './components/_profile-content/profile-content'
import About from './components/about'
import SuggestionList from './components/suggestion-list'

export default function ProfilePage() {
     const { user } = useUserStore()
     const [followersDialogOpen, setFollowersDialogOpen] = useState(false)
     const [followingDialogOpen, setFollowingDialogOpen] = useState(false)
     const [postsCount, setPostsCount] = useState(0)

     const userId = user?.id || ''
     const { stats, loading: statsLoading } = useFollowStats(userId)
     const { followers } = useUserFollowers(userId)
     const { following } = useUserFollowing(userId)

     console.log(user);

     return (
          <div className='container mx-auto p-2 sm:p-3 md:p-5'>
               <Card className='overflow-hidden pt-0'>
                    <div className='relative h-24 sm:h-32 md:h-48 lg:h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
                         <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                    </div>

                    <div className='relative px-2 sm:px-3 md:px-4 lg:px-8'>
                         <div className='flex flex-col md:flex-row items-center md:items-end justify-between -mt-10 sm:-mt-12 md:-mt-16 lg:-mt-20 gap-2 sm:gap-3 md:gap-4'>
                              <div className='flex flex-col md:flex-row items-center md:items-end gap-2 sm:gap-3 md:gap-4 lg:gap-6'>
                                   <Avatar className='h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 border-4 border-background shadow-xl'>
                                        <AvatarImage src={user?.user_metadata.picture} />
                                        <AvatarFallback className='text-lg sm:text-xl md:text-2xl lg:text-4xl bg-primary/10 text-primary'>
                                             {user?.user_metadata.name?.charAt(0) || 'U'}
                                        </AvatarFallback>
                                   </Avatar>

                                   <div className='mb-0 md:mb-2 lg:mb-4 space-y-0.5 sm:space-y-1 text-center md:text-left'>
                                        <h1 className='text-base sm:text-lg md:text-xl lg:text-3xl font-bold text-foreground'>
                                             {user?.user_metadata.full_name || 'User Name'}
                                        </h1>
                                        <p className='text-[10px] sm:text-xs md:text-sm text-muted-foreground'>
                                             {user?.email || 'user@example.com'}
                                        </p>
                                   </div>
                              </div>

                              <div className='mb-0 md:mb-2 lg:mb-4 flex items-center gap-2 md:gap-3 w-full md:w-auto'>
                                   <Button
                                        variant='default'
                                        size='default'
                                        className='flex-1 md:flex-none h-8 sm:h-9 md:h-10 text-xs sm:text-sm'
                                        onClick={() => toast.info('Coming soon! This feature is under development.')}
                                   >
                                        Edit Profile
                                   </Button>
                              </div>
                         </div>

                         <div className='mt-3 sm:mt-4 md:mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm'>
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

               <div className='grid grid-cols-1 lg:grid-cols-4 items-start gap-2 sm:gap-3 md:gap-5 mt-2 sm:mt-3 md:mt-5'>
                    <Card className='hidden lg:block lg:sticky top-0 order-2 lg:order-1'>
                         <About />
                    </Card>
                    <Card className='lg:col-span-2 p-2 sm:p-3 md:p-4 order-1 lg:order-2'>
                         <ProfileContent onPostsCountChange={setPostsCount} />
                    </Card>
                    <div className='bg-[var(--color-box-inside)] rounded-md order-3 hidden lg:block'>
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
