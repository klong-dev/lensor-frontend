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
import React, { useState } from 'react'

const customScrollbar = '[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full transition-all duration-300'

export default function DialogCreatePost({ children }: { children: React.ReactNode }) {
     const [files, setFiles] = useState<File[] | undefined>()
     const [filePreview, setFilePreview] = useState<string | undefined>()

     const handleClose = () => {
          setFiles(undefined)
          setFilePreview(undefined)
     }

     const handleDrop = (files: File[]) => {
          console.log(files)
          setFiles(files)
          if (files.length > 0) {
               const reader = new FileReader()
               reader.onload = (e) => {
                    if (typeof e.target?.result === 'string') {
                         setFilePreview(e.target?.result)
                    }
               }
               reader.readAsDataURL(files[0])
          }
     }

     return (
          <Dialog>
               <DialogTrigger asChild>
                    {children}
               </DialogTrigger>
               <DialogOverlay className="backdrop-blur-[2px]">
                    <DialogContent className={`sm:max-w-[475px] max-h-[640px] overflow-y-scroll ${customScrollbar}`}>
                         <DialogHeader>
                              <DialogTitle>Create your new post</DialogTitle>
                              <DialogDescription>
                                   Description
                              </DialogDescription>
                         </DialogHeader>
                         <div className="grid gap-4">
                              <Input placeholder="Title" />
                              <InputGroup>
                                   <InputGroupTextarea className="h-30" placeholder="Your post description" />
                              </InputGroup>

                              <Dropzone
                                   accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                                   onDrop={handleDrop}
                                   onError={console.error}
                                   src={files}
                                   className="w-full aspect-[3/2]"
                              >
                                   <DropzoneEmptyState />
                                   <DropzoneContent>
                                        {filePreview && (
                                             <div className="w-full aspect-[3/2]">
                                                  <img
                                                       alt="Preview"
                                                       className="absolute top-0 left-0 h-full w-full object-cover"
                                                       src={filePreview}
                                                  />
                                             </div>
                                        )}
                                   </DropzoneContent>
                              </Dropzone>
                         </div>
                         <DialogFooter>
                              <DialogClose asChild>
                                   <Button variant="outline" onClick={handleClose}>Cancel</Button>
                              </DialogClose>
                              <Button type="submit">Post</Button>
                         </DialogFooter>
                    </DialogContent>
               </DialogOverlay>
          </Dialog>
     )
}
