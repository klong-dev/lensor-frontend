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
                              className='sm:max-w-[475px] max-h-[640px]'
                              onInteractOutside={e => handleOnLoading(e)}
                              onEscapeKeyDown={e => handleOnLoading(e)}
                              showCloseButton={!isLoading}
                         >
                              <DialogHeader>
                                   <DialogTitle>{t('dialogCreateTitle')}</DialogTitle>
                                   <DialogDescription>
                                        {t('dialogCreateDescription')}
                                   </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4">
                                   <Input
                                        placeholder={t('titleInputPlaceholder')}
                                        value={title}
                                        onChange={handleChangeTitle}
                                        disabled={isLoading}
                                   />
                                   <InputGroup>
                                        <InputGroupTextarea
                                             className="h-30"
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
                                             className="w-full aspect-[3/2]"
                                             maxFiles={5}
                                        >
                                             <DropzoneEmptyState />
                                             <DropzoneContent>
                                                  <div className="w-full aspect-[3/2] flex justify-center items-center gap-2">
                                                       <Spinner /> {t('uploading')}....
                                                  </div>
                                             </DropzoneContent>
                                        </Dropzone>
                                        :
                                        <CarouselPreview files={filePreview} handleClearImage={handleClearImage} />}
                              </div>
                              <DialogFooter>
                                   <DialogClose asChild>
                                        <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                                             {tButton('cancel')}
                                        </Button>
                                   </DialogClose>
                                   <Button onClick={handlePost} disabled={isLoading}>
                                        {isLoading && <Spinner />}
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
