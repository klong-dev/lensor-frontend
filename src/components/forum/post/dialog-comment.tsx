import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Send } from "lucide-react"
import React, { useState } from 'react'
import Comment from "./comment"
import { useTranslations } from "next-intl"
import { useUserStore } from "@/stores/user-store"
import { useCreateComment, useComments } from "@/lib/hooks/usePostHooks"
import { CommentResponseType } from "@/types/post"

export default function DialogComment({ children, postId }: { children: React.ReactNode, postId: string }) {
     const t = useTranslations('Forum')
     const user = useUserStore(state => state.user)
     const [content, setContent] = useState('')
     const [isLoading, setIsLoading] = useState(false)
     const { createComment } = useCreateComment()
     const { data: commentsData, isLoading: isLoadingComments } = useComments(postId)

     const handleCreateComment = async () => {
          if (!content.trim()) return

          try {
               setIsLoading(true)
               await createComment(postId, content, null)
               setContent('')
          } catch (error) {
               console.error('Error creating comment:', error)
          } finally {
               setIsLoading(false)
          }
     }

     return (
          <Dialog>
               <DialogTrigger asChild>{children}</DialogTrigger>
               <DialogContent className="h-[95%] !max-w-[750px]">
                    <DialogHeader className="shrink-0">
                         <DialogTitle>{t('comment')} ({commentsData?.data?.count || 0})</DialogTitle>
                         <DialogDescription>
                              {t('shareYourComment')}
                         </DialogDescription>

                    </DialogHeader>
                    <div
                         className="pr-2 h-[480px] overflow-y-auto 
                              [&::-webkit-scrollbar]:w-1
                              hover:[&::-webkit-scrollbar]:w-1
                              [&::-webkit-scrollbar-track]:bg-transparent
                              [&::-webkit-scrollbar-thumb]:bg-gray-400/0
                              hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
                              [&::-webkit-scrollbar-thumb]:rounded-full
                              transition-colors
                              duration-300"
                    >
                         {isLoadingComments ? (
                              <div className="text-center py-4">Loading...</div>
                         ) : commentsData?.data?.comments?.length > 0 ? (
                              commentsData.data.comments.map((comment: CommentResponseType) => (
                                   <Comment
                                        key={comment.id}
                                        data={comment}
                                   />
                              ))
                         ) : (
                              <div className="text-center py-4 text-muted-foreground">
                                   {t('noComments')}
                              </div>
                         )}
                    </div>
                    <InputGroup className="h-12">
                         <InputGroupInput
                              placeholder={`${t('search')}...`}
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              onKeyDown={(e) => {
                                   if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handleCreateComment()
                                   }
                              }}
                         />
                         <InputGroupAddon>
                              <Avatar>
                                   <AvatarImage src={user?.user_metadata.avatar_url} />
                                   <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                         </InputGroupAddon>
                         <InputGroupAddon align="inline-end">
                              <Button
                                   onClick={handleCreateComment}
                                   disabled={isLoading || !content.trim()}
                              >
                                   <Send />
                              </Button>
                         </InputGroupAddon>
                    </InputGroup>
               </DialogContent>
          </Dialog>
     )
}
