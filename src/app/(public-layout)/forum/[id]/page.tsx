"use client";

import PostSkeleton from "@/components/forum/post/post-skeleton";
import Post from "@/components/forum/post/post";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePostDetail, useComments } from "@/lib/hooks/usePostHooks";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CommentResponseType } from "@/types/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { LostConnect } from "@/components/empty/lost-connect";

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { data: postData, isLoading: postLoading, error: postError, mutate: mutatePost } = usePostDetail(id as string);
  const { data: commentsData, isLoading: commentsLoading, mutate: mutateComments } = useComments(id as string);

  const comments = commentsData?.data?.comments || [];
  const commentCount = commentsData?.data?.count || 0;

  if (postError) return <LostConnect refecth={mutatePost} />;

  return (
    <div className="container mx-auto max-w-4xl px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-3 sm:mb-4 h-8 sm:h-9 text-xs sm:text-sm">
        <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        Back
      </Button>

      {postLoading ? (
        <PostSkeleton />
      ) : (
        <Card className="overflow-hidden">
          <Post dataPost={postData?.data} />

          <div className="px-2 sm:px-3 md:px-5 pb-3 sm:pb-4 md:pb-5">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mt-3 sm:mt-4 md:mt-6 mb-2 sm:mb-3 md:mb-4 pb-2 border-b">
              Comments ({commentCount})
            </h2>

            {commentsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex gap-3">
                    <div className="rounded-full bg-muted h-10 w-10" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/4" />
                      <div className="h-3 bg-muted rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : comments.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {comments.map((comment: CommentResponseType) => (
                  <div key={comment.id} className="flex gap-2 sm:gap-3">
                    <Avatar className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10">
                      <AvatarImage src={comment.user.avatarUrl} />
                      <AvatarFallback className="text-xs sm:text-sm">{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="bg-muted rounded-2xl px-2 sm:px-3 md:px-4 py-1.5 sm:py-2">
                        <p className="font-semibold text-xs sm:text-sm">{comment.user.name}</p>
                        <p className="text-xs sm:text-sm mt-0.5 sm:mt-1">{comment.content}</p>
                      </div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 ml-2 sm:ml-3 md:ml-4">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8 text-xs sm:text-sm">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
