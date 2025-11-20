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
import { UserProfile, UserPost } from '@/types'
import { MessageCircle, Calendar, Loader2, Package, Image as ImageIcon, Users } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Post from '@/components/forum/post/post'
import { PostType } from '@/types/post'
import { formatDistanceToNow } from 'date-fns'
import { FollowButton } from '@/components/forum/FollowButton'
import { useFollowStats, useUserFollowers, useUserFollowing } from '@/lib/hooks/useFollow'

export default function PublicProfile() {
  const params = useParams()
  const router = useRouter()
  const currentUser = useUserStore(state => state.user)
  const userId = params.id as string
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [messageLoading, setMessageLoading] = useState(false)
  const [followersDialogOpen, setFollowersDialogOpen] = useState(false)
  const [followingDialogOpen, setFollowingDialogOpen] = useState(false)

  const { stats, refetch: refetchStats } = useFollowStats(userId)
  const { followers } = useUserFollowers(userId)
  const { following } = useUserFollowing(userId)

  const isOwnProfile = currentUser?.id === userId

  useEffect(() => {
    if (isOwnProfile) {
      router.replace(ROUTES.CURRENT_PROFILE)
      return
    }
    fetchProfile()
  }, [userId, currentUser, isOwnProfile])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const { data } = await userApi.getUserProfile(userId)
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
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

  return (
    <div className='max-w-3xl mx-auto py-6 px-4 space-y-4'>
      {/* Profile Header */}
      <Card>
        <CardContent className='p-8'>
          <div className='flex items-start gap-6'>
            <Avatar className='h-24 w-24 border'>
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback className='text-2xl'>
                {profile.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className='flex-1 min-w-0'>
              <div className='flex items-start justify-between gap-4 mb-4'>
                <div className='flex-1 min-w-0'>
                  <h1 className='text-2xl font-bold truncate mb-1'>{profile.name}</h1>
                  <p className='text-sm text-muted-foreground truncate'>{profile.email}</p>
                </div>

                <div className='flex items-center gap-2 flex-shrink-0'>
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

              <div className='flex items-center gap-6 text-sm'>
                <button
                  onClick={() => setFollowersDialogOpen(true)}
                  className='hover:underline cursor-pointer'
                >
                  <span className='font-semibold'>{stats?.followersCount || 0}</span>
                  <span className='text-muted-foreground ml-1'>Followers</span>
                </button>
                <button
                  onClick={() => setFollowingDialogOpen(true)}
                  className='hover:underline cursor-pointer'
                >
                  <span className='font-semibold'>{stats?.followingCount || 0}</span>
                  <span className='text-muted-foreground ml-1'>Following</span>
                </button>
                <div>
                  <span className='font-semibold'>{profile.posts.length}</span>
                  <span className='text-muted-foreground ml-1'>Posts</span>
                </div>
                <div>
                  <span className='font-semibold'>{profile.products.length}</span>
                  <span className='text-muted-foreground ml-1'>Products</span>
                </div>
              </div>

              <p className='text-xs text-muted-foreground mt-3 flex items-center gap-1'>
                <Calendar className='h-3 w-3' />
                Joined {formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className='w-full grid grid-cols-2 h-11'>
          <TabsTrigger value="posts" className='gap-2'>
            <ImageIcon className='h-4 w-4' />
            Posts
            <Badge variant='secondary' className='ml-1'>{profile.posts.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="shop" className='gap-2'>
            <Package className='h-4 w-4' />
            Shop
            <Badge variant='secondary' className='ml-1'>{profile.products.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className='mt-4'>
          {profile.posts.length === 0 ? (
            <Card>
              <CardContent className='p-12 text-center'>
                <ImageIcon className='h-12 w-12 mx-auto text-muted-foreground/40 mb-3' />
                <p className='text-sm text-muted-foreground'>No posts yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className='space-y-0'>
              {profile.posts.map((post: UserPost, index) => (
                <div key={post.id}>
                  <Post
                    dataPost={{
                      ...post,
                      user: {
                        id: profile.id,
                        name: profile.name,
                        avatarUrl: profile.avatarUrl,
                        isFollowed: false
                      },
                      voteCount: 0,
                      commentCount: 0,
                      isLiked: false
                    } as PostType}
                  />
                  {index < profile.posts.length - 1 && <hr className='solid' />}
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="shop" className='mt-4'>
          {profile.products.length === 0 ? (
            <Card>
              <CardContent className='p-12 text-center'>
                <Package className='h-12 w-12 mx-auto text-muted-foreground/40 mb-3' />
                <p className='text-sm text-muted-foreground'>No products available</p>
              </CardContent>
            </Card>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              {profile.products.map((product) => (
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

                    <div className="p-3 absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent opacity-100 transition duration-200 ease-in-out group-hover:opacity-0">
                      <h3 className="text-sm text-white font-semibold mb-1 truncate">{product.title}</h3>
                      <p className="text-base text-white font-bold">${parseFloat(product.price).toFixed(2)}</p>
                    </div>

                    <div className='absolute p-3 inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black to-transparent transition opacity-0 duration-200 ease-in-out group-hover:opacity-100'>
                      <h3 className="text-sm text-white font-semibold mb-2 truncate">{product.title}</h3>
                      <p className="text-xs text-white/90 mb-3 line-clamp-2">{product.description}</p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-white/80">Price</p>
                          <p className="text-base text-white font-bold">${parseFloat(product.price).toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-white/80">Sold</p>
                          <p className="text-sm text-white font-semibold">{product.sellCount}</p>
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
