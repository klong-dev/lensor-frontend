"use client";

import { LostConnect } from "@/components/empty/lost-connect";
import { Skeleton } from "@/components/ui/skeleton";
import { useSavedPosts } from "@/lib/hooks/usePostHooks";
import { PostType } from "@/types/post";
import { BookmarkX, MessageCircle, Heart } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/path";
import { BASE_URL } from "@/constants";
import Image from "next/image";

export default function SavedPostsSection() {
  const { data, error, isLoading, mutate } = useSavedPosts(20, 0);

  console.log('=== SAVED POSTS DEBUG ===');
  console.log('Full data:', data);
  console.log('error:', error);
  console.log('isLoading:', isLoading);
  console.log('data?.data:', data?.data);
  console.log('data?.data?.post:', data?.data?.post);

  if (error) {
    console.error('Error loading saved posts:', error);
    return <LostConnect refecth={mutate} />;
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-3 p-3 border rounded-lg">
            <Skeleton className="w-20 h-20 rounded flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const posts = data?.data?.post || [];
  console.log('Posts array length:', posts.length);
  console.log('Posts array:', posts);

  if (!data || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <BookmarkX className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No saved posts yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Posts you save will appear here. Start exploring and save posts you want to revisit later!
        </p>
        {data && <p className="text-xs text-muted-foreground mt-2">Debug: data exists but no posts found</p>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground mb-2">Found {posts.length} saved posts</p>
      {posts.map((post: PostType, index: number) => {
        console.log(`Rendering post ${index}:`, post);
        const imageUrl = post.thumbnailUrl || post.imageUrl;
        const fullImageUrl = imageUrl ? `${BASE_URL}${imageUrl}` : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
        console.log(`Image URL for post ${index}:`, fullImageUrl);

        return (
          <Link
            key={post.id}
            href={ROUTES.POST(post.id)}
            className="flex gap-3 p-3 border rounded-lg hover:bg-accent transition-colors group"
          >
            <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-muted">
              {imageUrl ? (
                <Image
                  src={fullImageUrl}
                  alt={post.title || 'Post image'}
                  fill
                  sizes="80px"
                  className="object-cover group-hover:scale-105 transition-transform"
                  unoptimized
                  onError={(e) => {
                    console.error('Image load error for:', fullImageUrl);
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {post.content}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {post.voteCount}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {post.commentCount}
                </span>
                <span>{post.createdAt}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
