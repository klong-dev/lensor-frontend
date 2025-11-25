"use client";

import { Button } from '@/components/ui/button'
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from '@/components/ui/select'
import { ticketApi } from '@/lib/apis/ticketApi'
import { TicketPriority } from '@/types/ticket'
import { FileIcon, Loader2, Upload, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface CreateTicketDialogProps {
     open: boolean
     onOpenChange: (open: boolean) => void
     onSuccess?: () => void
}

export function CreateTicketDialog({ open, onOpenChange, onSuccess }: CreateTicketDialogProps) {
     const [title, setTitle] = useState('')
     const [description, setDescription] = useState('')
     const [priority, setPriority] = useState<TicketPriority>('medium')
     const [category, setCategory] = useState('')
     const [attachments, setAttachments] = useState<File[]>([])
     const [isSubmitting, setIsSubmitting] = useState(false)

     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = Array.from(e.target.files || [])
          if (attachments.length + files.length > 5) {
               toast.error('Maximum 5 files allowed')
               return;
          }
          setAttachments([...attachments, ...files])
     }

     const removeFile = (index: number) => {
          setAttachments(attachments.filter((_, i) => i !== index))
     }

     const handleSubmit = async () => {
          if (!title.trim()) {
               toast.error('Please enter a title');
               return
          }
          if (!description.trim()) {
               toast.error('Please enter a description');
               return
          }
          if (!category.trim()) {
               toast.error('Please select a category');
               return
          }

          try {
               setIsSubmitting(true)
               await ticketApi.createTicket({
                    title,
                    description,
                    priority,
                    category,
                    attachments: attachments.length > 0 ? attachments : undefined,
               })

               toast.success('Support ticket created successfully')
               setTitle('')
               setDescription('')
               setPriority('medium')
               setCategory('')
               setAttachments([])
               onOpenChange(false)
               if (onSuccess) onSuccess()
          } catch (error: any) {
               console.error('Error creating ticket:', error)
               toast.error(error.response?.data?.message || 'Failed to create ticket')
          } finally {
               setIsSubmitting(false)
          }
     }

     return (
          <Dialog open={open} onOpenChange={onOpenChange}>
               <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                         <DialogTitle>Create Support Ticket</DialogTitle>
                         <DialogDescription>
                              Describe your issue and our support team will assist you
                         </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                         <div className="grid gap-2">
                              <Label htmlFor="title">Title *</Label>
                              <Input
                                   id="title"
                                   placeholder="Brief summary of your issue"
                                   value={title}
                                   onChange={(e) => setTitle(e.target.value)}
                                   maxLength={200}
                              />
                         </div>

                         <div className="grid gap-2">
                              <Label htmlFor="category">Category *</Label>
                              <Select value={category} onValueChange={setCategory}>
                                   <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem value="Account Access">Account Access</SelectItem>
                                        <SelectItem value="Order Issue">Order Issue</SelectItem>
                                        <SelectItem value="Payment Problem">Payment Problem</SelectItem>
                                        <SelectItem value="Product Quality">Product Quality</SelectItem>
                                        <SelectItem value="Technical Support">Technical Support</SelectItem>
                                        <SelectItem value="Refund Request">Refund Request</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                   </SelectContent>
                              </Select>
                         </div>

                         <div className="grid gap-2">
                              <Label htmlFor="priority">Priority *</Label>
                              <Select value={priority} onValueChange={(val) => setPriority(val as TicketPriority)}>
                                   <SelectTrigger>
                                        <SelectValue />
                                   </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="urgent">Urgent</SelectItem>
                                   </SelectContent>
                              </Select>
                         </div>

                         <div className="grid gap-2">
                              <Label htmlFor="description">Description *</Label>
                              <textarea
                                   id="description"
                                   className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                   placeholder="Please provide detailed information about your issue..."
                                   value={description}
                                   onChange={(e) => setDescription(e.target.value)}
                                   maxLength={2000}
                              />
                              <p className="text-xs text-muted-foreground">
                                   {description.length}/2000 characters
                              </p>
                         </div>

                         <div className="grid gap-2">
                              <Label>Attachments (Optional, max 5 files)</Label>
                              <div className="flex items-center gap-2">
                                   <Input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        multiple
                                        accept="image/*,.pdf,.doc,.docx,.txt"
                                        onChange={handleFileChange}
                                        disabled={attachments.length >= 5}
                                   />
                                   <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => document.getElementById('file-upload')?.click()}
                                        disabled={attachments.length >= 5}
                                   >
                                        <Upload className="h-4 w-4 mr-2" />
                                        Upload Files
                                   </Button>
                                   <span className="text-sm text-muted-foreground">
                                        {attachments.length}/5 files
                                   </span>
                              </div>
                              {attachments.length > 0 && (
                                   <div className="space-y-2 mt-2">
                                        {attachments.map((file, index) => (
                                             <div
                                                  key={index}
                                                  className="flex items-center justify-between p-2 bg-muted rounded-md"
                                             >
                                                  <div className="flex items-center gap-2">
                                                       <FileIcon className="h-4 w-4" />
                                                       <span className="text-sm truncate max-w-[300px]">
                                                            {file.name}
                                                       </span>
                                                       <span className="text-xs text-muted-foreground">
                                                            ({(file.size / 1024).toFixed(1)} KB)
                                                       </span>
                                                  </div>
                                                  <Button
                                                       type="button"
                                                       variant="ghost"
                                                       size="sm"
                                                       onClick={() => removeFile(index)}
                                                  >
                                                       <X className="h-4 w-4" />
                                                  </Button>
                                             </div>
                                        ))}
                                   </div>
                              )}
                         </div>
                    </div>

                    <DialogFooter>
                         <Button
                              variant="outline"
                              onClick={() => onOpenChange(false)}
                              disabled={isSubmitting}
                         >
                              Cancel
                         </Button>
                         <Button onClick={handleSubmit} disabled={isSubmitting}>
                              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                              Create Ticket
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}
