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

  if (postError) return <LostConnect refecth={mutatePost} />;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {postLoading ? (
        <PostSkeleton />
      ) : (
        <Card className="overflow-hidden">
          <Post dataPost={postData?.data} isDetailView />

          <div className="px-5 pb-5">
            <h2 className="text-xl font-semibold mt-6 mb-4 pb-2 border-b">Comments ({commentsData?.data?.length || 0})</h2>

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
            ) : commentsData?.data && commentsData.data?.length > 0 ? (
              <div className="space-y-4">
                {commentsData.data.map((comment: CommentResponseType) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.user.avatarUrl} />
                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-2xl px-4 py-2">
                        <p className="font-semibold text-sm">{comment.user.name}</p>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 ml-4">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
