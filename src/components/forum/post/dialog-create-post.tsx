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
import React, { ChangeEvent, useState } from 'react'
import { toast } from "sonner"
import CarouselPreview from "./carousel-preview"

export default function DialogCreatePost({ children }: { children: React.ReactNode }) {
     const [files, setFiles] = useState<File[] | undefined>()
     const [filePreview, setFilePreview] = useState<string[] | undefined>()
     const [isOpen, setIsOpen] = useState(false)
     const [isLoading, setIsLoading] = useState(false)
     const [title, setTitle] = useState('')
     const [content, setContent] = useState('')
     const [category, setCategory] = useState('general')

     const { mutate } = usePosts()

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
               toast.error('Please enter post title')
               return
          }

          if (!files || files.length === 0) {
               toast.error('Please select an image')
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
               toast.success('Post created successfully!')
               mutate()
               setIsOpen(false)
               handleClose()
          } catch (error) {
               console.error('Error creating post:', error)
               toast.error('Failed to create post')
          } finally {
               setIsLoading(false)
          }
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
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
               <DialogTrigger asChild>
                    {children}
               </DialogTrigger>
               <DialogOverlay className="backdrop-blur-[2px]">
                    <DialogContent
                         className='sm:max-w-[475px] max-h-[640px]'
                         onInteractOutside={e => handleOnLoading(e)}
                         onEscapeKeyDown={e => handleOnLoading(e)}
                         showCloseButton={!isLoading}
                    >
                         <DialogHeader>
                              <DialogTitle>Create your new post</DialogTitle>
                              <DialogDescription>
                                   Share your moments with the community
                              </DialogDescription>
                         </DialogHeader>
                         <div className="grid gap-4">
                              <Input
                                   placeholder="Title"
                                   value={title}
                                   onChange={handleChangeTitle}
                                   disabled={isLoading}
                              />
                              <InputGroup>
                                   <InputGroupTextarea
                                        className="h-30"
                                        placeholder="Your post description"
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
                                                  <Spinner /> Uploading....
                                             </div>
                                        </DropzoneContent>
                                   </Dropzone>
                                   :
                                   <CarouselPreview files={filePreview} handleClearImage={handleClearImage} />}
                         </div>
                         <DialogFooter>
                              <DialogClose asChild>
                                   <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                                        Cancel
                                   </Button>
                              </DialogClose>
                              <Button onClick={handlePost} disabled={isLoading}>
                                   {isLoading && <Spinner />}
                                   Post
                              </Button>
                         </DialogFooter>
                    </DialogContent>
               </DialogOverlay>
          </Dialog>
     )
}
