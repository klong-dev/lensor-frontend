'use client'

import { Button } from "@/components/ui/button"
import {
     Dialog,
     DialogClose,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogOverlay,
     DialogTitle,
     DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group"
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone'
import { Spinner } from "@/components/ui/spinner"
import { postApi } from "@/lib/apis/postApi"
import { usePosts } from "@/lib/hooks/usePostHooks"
import { resizeImage } from "@/utils/imageTools"
import { useTranslations } from "next-intl"
import React, { ChangeEvent, useState } from 'react'
import { toast } from "sonner"
import CarouselPreview from "./carousel-preview"
import { useUserStore } from "@/stores/user-store"
import { useRouter } from "next/navigation"
import { LoginRequiredDialog } from "@/components/ui/login-required-dialog"

export default function DialogCreatePost({ children }: { children: React.ReactNode }) {
     const t = useTranslations("Forum")
     const tButton = useTranslations("Button")
     const [files, setFiles] = useState<File[] | undefined>()
     const [filePreview, setFilePreview] = useState<string[] | undefined>()
     const [isOpen, setIsOpen] = useState(false)
     const [isLoading, setIsLoading] = useState(false)
     const [showLoginDialog, setShowLoginDialog] = useState(false)
     const [title, setTitle] = useState('')
     const [content, setContent] = useState('')
     const [category, setCategory] = useState('general')
     const { mutate } = usePosts()
     const user = useUserStore(state => state.user)
     const router = useRouter();

     const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value)
     }

     const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
          setContent(e.target.value)
     }

     const handleClearImage = () => {
          setFilePreview(undefined)
          setFiles(undefined)
     }

     const handleClose = () => {
          handleClearImage()
          setTitle('')
          setContent('')
          setCategory('general')
     }

     const handlePost = async () => {
          if (!title.trim()) {
               toast.error(t('missingTitleToast'))
               return
          }

          if (!files || files.length === 0) {
               toast.error(t('missingImageToast'))
               return
          }

          setIsLoading(true)
          try {
               const formData = new FormData()
               formData.append('title', title.trim())
               formData.append('content', content.trim())
               // formData.append('catagory', category)
               formData.append('image', files[0])
               await postApi.create(formData)
               toast.success(t('postSuccessToast'))
               mutate()
               setIsOpen(false)
               handleClose()
          } catch (error) {
               console.error('Error creating post:', error)
               toast.error(t('postFailToast'))
          } finally {
               setIsLoading(false)
          }
     }

     const handleTriggerClick = () => {
          if (!user) {
               setShowLoginDialog(true)
               return
          }
          setIsOpen(true)
     }

     const handleDrop = async (files: File[]) => {
          setFiles(files)
          setIsLoading(true)
          if (files.length > 0) {
               try {
                    const resizedPreviews = await Promise.all(
                         files.map(file => resizeImage(file))
                    )
                    setFilePreview(resizedPreviews)
               } catch (error) {
                    console.error('Error processing images:', error)
               }
          }
          setIsLoading(false)
     }

     const handleOnLoading = (e: CustomEvent | React.KeyboardEvent<Element> | KeyboardEvent) => {
          if (isLoading) e.preventDefault()
     }

     return (
          <>
               <div onClick={handleTriggerClick}>
                    {children}
               </div>

               <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogOverlay className="backdrop-blur-[2px]">
                         <DialogContent
                              className='w-[calc(100vw-1rem)] sm:w-[90vw] md:max-w-[520px] max-h-[92vh] overflow-y-auto p-3 sm:p-4 md:p-6'
                              onInteractOutside={e => handleOnLoading(e)}
                              onEscapeKeyDown={e => handleOnLoading(e)}
                              showCloseButton={!isLoading}
                         >
                              <DialogHeader className="space-y-2">
                                   <DialogTitle className="text-base sm:text-lg">{t('dialogCreateTitle')}</DialogTitle>
                                   <DialogDescription className="text-xs sm:text-sm">
                                        {t('dialogCreateDescription')}
                                   </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-3 sm:gap-4">
                                   <Input
                                        placeholder={t('titleInputPlaceholder')}
                                        value={title}
                                        onChange={handleChangeTitle}
                                        disabled={isLoading}
                                        className="text-sm h-9 sm:h-10"
                                   />
                                   <InputGroup>
                                        <InputGroupTextarea
                                             className="h-24 sm:h-30 text-sm"
                                             placeholder={t('descriptionInputPlaceholder')}
                                             value={content}
                                             onChange={handleChangeContent}
                                             disabled={isLoading}
                                        />
                                   </InputGroup>

                                   {!filePreview
                                        ?
                                        <Dropzone
                                             accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                                             onDrop={handleDrop}
                                             onError={console.error}
                                             src={files}
                                             className="w-full aspect-[3/2] text-xs sm:text-sm"
                                             maxFiles={5}
                                        >
                                             <DropzoneEmptyState />
                                             <DropzoneContent>
                                                  <div className="w-full aspect-[3/2] flex justify-center items-center gap-2 text-xs sm:text-sm">
                                                       <Spinner className="h-4 w-4" /> {t('uploading')}....
                                                  </div>
                                             </DropzoneContent>
                                        </Dropzone>
                                        :
                                        <CarouselPreview files={filePreview} handleClearImage={handleClearImage} />}
                              </div>
                              <DialogFooter className="gap-2 sm:gap-0 flex-col sm:flex-row">
                                   <DialogClose asChild>
                                        <Button variant="outline" onClick={handleClose} disabled={isLoading} className="w-full sm:w-auto h-9 text-xs sm:text-sm">
                                             {tButton('cancel')}
                                        </Button>
                                   </DialogClose>
                                   <Button onClick={handlePost} disabled={isLoading} className="w-full sm:w-auto h-9 text-xs sm:text-sm">
                                        {isLoading && <Spinner className="h-3.5 w-3.5" />}
                                        {tButton('post')}
                                   </Button>
                              </DialogFooter>
                         </DialogContent>
                    </DialogOverlay>
               </Dialog>

               <LoginRequiredDialog
                    open={showLoginDialog}
                    onOpenChange={setShowLoginDialog}
                    title="Login Required"
                    description="You need to be logged in to create a post. Please login to continue."
               />
          </>
     )
}
