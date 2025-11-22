"use client"

import { LostConnect } from "@/components/empty/lost-connect"
import DialogCreatePost from "@/components/forum/post/dialog-create-post"
import Post from "@/components/forum/post/post"
import PostSkeleton from "@/components/forum/post/post-skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { usePosts } from "@/lib/hooks/usePostHooks"
import { useUserStore } from "@/stores/user-store"
import { PostType } from "@/types/post"
import { Loader2, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState, useCallback } from "react"

const POSTS_PER_PAGE = 2

const getCameraBrand = (make?: string, model?: string): string => {
  const brand = (make || model || '').toLowerCase()
  if (brand.includes('canon')) return 'Canon'
  if (brand.includes('nikon')) return 'Nikon'
  if (brand.includes('sony')) return 'Sony'
  if (brand.includes('fuji')) return 'Fujifilm'
  if (brand.includes('olympus')) return 'Olympus'
  if (brand.includes('panasonic')) return 'Panasonic'
  if (brand.includes('leica')) return 'Leica'
  if (brand.includes('pentax')) return 'Pentax'
  return 'Unknown'
}

export default function ForumPage() {
  const t = useTranslations("Forum")
  const tButton = useTranslations("Button")
  const { data, error, mutate, isValidating } = usePosts()
  const user = useUserStore(state => state.user)
  const searchParams = useSearchParams()
  const cameraFilter = searchParams.get('camera')

  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)

  const allPosts = data?.data || []
  const filteredPosts = cameraFilter
    ? allPosts.filter((post: PostType) => {
      const brand = getCameraBrand(post.imageMetadata?.cameraMake, post.imageMetadata?.cameraModel)
      return brand === cameraFilter
    })
    : allPosts

  const displayPosts = filteredPosts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredPosts.length

  const observerRef = useRef<IntersectionObserver | null>(null)

  const lastPostRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setIsLoading(true)
        setTimeout(() => {
          setVisibleCount(prev => prev + POSTS_PER_PAGE)
          setIsLoading(false)
        }, 300)
      }
    })

    if (node) {
      observerRef.current.observe(node)
    }
  }, [hasMore, isLoading])

  useEffect(() => {
    const redirect = sessionStorage.getItem('redirectAfterLogin')
    if (redirect !== '/forum') {
      sessionStorage.setItem('redirectAfterLogin', '/forum')
    }
  }, [])

  useEffect(() => {
    setVisibleCount(POSTS_PER_PAGE)
  }, [cameraFilter])

  const clearFilter = () => window.history.pushState({}, '', '/forum')

  if (error) return <LostConnect refecth={mutate} />

  return (
    <div className="w-[720px] mx-auto">
      <div className="p-5">
        <DialogCreatePost>
          <Card className="flex flex-row items-center gap-3 px-3 py-3">
            {user && (
              <Avatar>
                <AvatarImage src={user.user_metadata.avatar_url} />
                <AvatarFallback>{user.user_metadata.name}</AvatarFallback>
              </Avatar>
            )}
            <Input disabled placeholder={t("placeholderInputCreatePost")} className="flex-1" />
            <Button>{tButton("createPost")}</Button>
          </Card>
        </DialogCreatePost>
      </div>

      {cameraFilter && (
        <div className="px-5 pb-3">
          <Badge variant="secondary" className="gap-2">
            {cameraFilter}
            <button onClick={clearFilter} className="hover:bg-accent rounded-sm">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        </div>
      )}

      {isValidating ? (
        <PostSkeleton />
      ) : filteredPosts.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          <p>No posts found{cameraFilter ? ` for ${cameraFilter}` : ''}</p>
        </div>
      ) : (
        <>
          {displayPosts.map((post: PostType, index: number) => (
            <div key={post.id}>
              <Post dataPost={post} />
              {index < displayPosts.length - 1 && <hr className="solid" />}
            </div>
          ))}

          {hasMore && (
            <div ref={lastPostRef} className="py-8 flex flex-col justify-center items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="text-base font-medium text-foreground">Loading...</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
