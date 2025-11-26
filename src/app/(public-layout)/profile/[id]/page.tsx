'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { BASE_URL } from '@/constants'
import { ROUTES } from '@/constants/path'
import { userApi } from '@/lib/apis/userApi'
import { messageApi } from '@/lib/apis/messageApi'
import { useUserStore } from '@/stores/user-store'
import { UserPost, UserProduct } from '@/types'
import { MessageCircle, Calendar, Loader2, Package, Image as ImageIcon, Users } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'
import { FollowButton } from '@/components/forum/FollowButton'
import { useFollowStats, useUserFollowers, useUserFollowing } from '@/lib/hooks/useFollow'
import useSWR from 'swr'

export default function PublicProfile() {
  const params = useParams()
  const router = useRouter()
  const currentUser = useUserStore(state => state.user)
  const userId = params.id as string
  const [messageLoading, setMessageLoading] = useState(false)
  const [followersDialogOpen, setFollowersDialogOpen] = useState(false)
  const [followingDialogOpen, setFollowingDialogOpen] = useState(false)

  const { data: profileData, isLoading } = useSWR(
    userId ? `profile-${userId}` : null,
    () => userApi.getUserProfile(userId)
  )

  const { stats } = useFollowStats(userId)
  const { followers } = useUserFollowers(userId)
  const { following } = useUserFollowing(userId)

  const isOwnProfile = currentUser?.id === userId
  const profile = profileData?.data

  useEffect(() => {
    if (isOwnProfile) {
      router.replace(ROUTES.CURRENT_PROFILE)
    }
  }, [isOwnProfile, router])

  const handleMessage = async () => {
    try {
      setMessageLoading(true)
      const { data } = await messageApi.createDirectChat(userId)
      router.push(`${ROUTES.MESSAGE}?roomId=${data.id}`)
    } catch (error) {
      console.error('Error creating chat:', error)
      toast.error('Failed to start conversation')
    } finally {
      setMessageLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className='max-w-3xl mx-auto py-6 px-4'>
        <Card>
          <CardContent className='p-8'>
            <div className='flex items-center gap-6'>
              <div className='h-24 w-24 rounded-full bg-muted animate-pulse' />
              <div className='flex-1 space-y-3'>
                <div className='h-6 bg-muted rounded animate-pulse w-48' />
                <div className='h-4 bg-muted rounded animate-pulse w-64' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className='max-w-3xl mx-auto py-6 px-4'>
        <Card>
          <CardContent className='p-12 text-center'>
            <p className='text-muted-foreground'>User not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const activePosts = profile.posts || []
  const activeProducts = profile.products || []

  return (
    <div className='max-w-3xl mx-auto py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4 space-y-3 sm:space-y-4'>
      {/* Profile Header */}
      <Card>
        <CardContent className='p-3 sm:p-5 md:p-8'>
          <div className='flex items-start gap-3 sm:gap-4 md:gap-6'>
            <Avatar className='h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 border'>
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback className='text-lg sm:text-xl md:text-2xl'>
                {profile.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className='flex-1 min-w-0'>
              <div className='flex items-start justify-between gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4'>
                <div className='flex-1 min-w-0'>
                  <h1 className='text-base sm:text-xl md:text-2xl font-bold truncate mb-0.5 sm:mb-1'>{profile.name}</h1>
                  <p className='text-[10px] sm:text-xs md:text-sm text-muted-foreground truncate'>{profile.email}</p>
                </div>

                <div className='flex items-center gap-1 sm:gap-2 flex-shrink-0'>
                  <FollowButton userId={userId} size="sm" />
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleMessage}
                    disabled={messageLoading}
                  >
                    {messageLoading ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <MessageCircle className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>

              <div className='flex items-center gap-3 sm:gap-4 md:gap-6 text-[10px] sm:text-xs md:text-sm flex-wrap'>
                <button
                  onClick={() => setFollowersDialogOpen(true)}
                  className='hover:underline cursor-pointer'
                >
                  <span className='font-semibold'>{stats?.followersCount || 0}</span>
                  <span className='text-muted-foreground ml-0.5 sm:ml-1'>Followers</span>
                </button>
                <button
                  onClick={() => setFollowingDialogOpen(true)}
                  className='hover:underline cursor-pointer'
                >
                  <span className='font-semibold'>{stats?.followingCount || 0}</span>
                  <span className='text-muted-foreground ml-0.5 sm:ml-1'>Following</span>
                </button>
                <div>
                  <span className='font-semibold'>{activePosts.length}</span>
                  <span className='text-muted-foreground ml-0.5 sm:ml-1'>Posts</span>
                </div>
                <div>
                  <span className='font-semibold'>{activeProducts.length}</span>
                  <span className='text-muted-foreground ml-0.5 sm:ml-1'>Products</span>
                </div>
              </div>

              <p className='text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3 flex items-center gap-1'>
                <Calendar className='h-3 w-3' />
                Joined {formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className='w-full grid grid-cols-2 h-9 sm:h-10 md:h-11'>
          <TabsTrigger value="posts" className='gap-1 sm:gap-2 text-xs sm:text-sm'>
            <ImageIcon className='h-3 w-3 sm:h-4 sm:w-4' />
            <span className='hidden sm:inline'>Posts</span>
            <Badge variant='secondary' className='ml-0.5 sm:ml-1 text-[10px] sm:text-xs'>{activePosts.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="shop" className='gap-1 sm:gap-2 text-xs sm:text-sm'>
            <Package className='h-3 w-3 sm:h-4 sm:w-4' />
            <span className='hidden sm:inline'>Shop</span>
            <Badge variant='secondary' className='ml-0.5 sm:ml-1 text-[10px] sm:text-xs'>{activeProducts.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className='mt-3 sm:mt-4'>
          {activePosts.length === 0 ? (
            <Card>
              <CardContent className='p-12 text-center'>
                <ImageIcon className='h-12 w-12 mx-auto text-muted-foreground/40 mb-3' />
                <p className='text-sm text-muted-foreground'>No posts yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4'>
              {activePosts.map((post: UserPost) => (
                <Link key={post.id} href={`/forum/${post.id}`} className='block'>
                  <div className="relative w-full aspect-square bg-card rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                    <img
                      src={`${BASE_URL}${post.thumbnailUrl}`}
                      alt={post.title}
                      className='absolute inset-0 w-full h-full object-cover'
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                      <h3 className="text-xs sm:text-sm text-white font-medium line-clamp-2">{post.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="shop" className='mt-3 sm:mt-4'>
          {activeProducts.length === 0 ? (
            <Card>
              <CardContent className='p-8 sm:p-10 md:p-12 text-center'>
                <Package className='h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground/40 mb-3' />
                <p className='text-xs sm:text-sm text-muted-foreground'>No products available</p>
              </CardContent>
            </Card>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4'>
              {activeProducts.map((product: UserProduct) => (
                <Link
                  key={product.id}
                  href={`/marketplace/${product.id}`}
                  className='block'
                >
                  <div className="relative w-full aspect-square bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                    <img
                      src={`${BASE_URL}${product.thumbnail}`}
                      alt={product.title}
                      className='absolute inset-0 w-full h-full object-cover'
                    />

                    <div className="p-2 sm:p-3 md:p-4 absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 transition duration-200 ease-in-out group-hover:opacity-0">
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-semibold mb-0.5 sm:mb-1 md:mb-2 truncate">{product.title}</h3>
                      <p className="text-sm sm:text-base md:text-lg text-white font-bold">{parseFloat(product.price).toLocaleString('vi-VN')} ₫</p>
                    </div>

                    <div className='absolute p-2 sm:p-3 md:p-4 inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent transition opacity-0 duration-200 ease-in-out group-hover:opacity-100'>
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-semibold mb-1 sm:mb-2 truncate">{product.title}</h3>
                      <p className="text-[10px] sm:text-xs md:text-sm text-white/90 mb-2 sm:mb-3 md:mb-4 line-clamp-2">{product.description}</p>

                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-[8px] sm:text-[10px] md:text-xs text-white/80">Price</p>
                          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-bold truncate">{parseFloat(product.price).toLocaleString('vi-VN')} ₫</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[8px] sm:text-[10px] md:text-xs text-white/80">Sold</p>
                          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-semibold">{product.sellCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

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
                  {follow.follower?.id !== currentUser?.id && (
                    <FollowButton userId={follow.follower?.id || ''} size='sm' variant='outline' />
                  )}
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
                  {follow.following?.id !== currentUser?.id && (
                    <FollowButton userId={follow.following?.id || ''} size='sm' variant='outline' />
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
