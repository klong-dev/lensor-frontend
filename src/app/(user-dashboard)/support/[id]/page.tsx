"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ticketApi } from '@/lib/apis/ticketApi';
import { Ticket, TicketMessage } from '@/types/ticket';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
     AlertCircle,
     CheckCircle,
     Clock,
     XCircle,
     ArrowLeft,
     Send,
     Loader2,
     Upload,
     X,
     FileIcon,
     Image as ImageIcon,
     Download,
} from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { useUserStore } from '@/stores/user-store';
import Image from 'next/image';

export default function TicketDetailPage() {
     const params = useParams();
     const router = useRouter();
     const ticketId = params.id as string;
     const user = useUserStore(state => state.user);

     const [ticket, setTicket] = useState<Ticket | null>(null);
     const [loading, setLoading] = useState(true);
     const [message, setMessage] = useState('');
     const [attachments, setAttachments] = useState<File[]>([]);
     const [isSending, setIsSending] = useState(false);
     const [selectedImage, setSelectedImage] = useState<string | null>(null);

     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

     useEffect(() => {
          fetchTicket();
     }, [ticketId]);

     const fetchTicket = async () => {
          try {
               setLoading(true);
               const data = await ticketApi.getTicketById(ticketId);
               setTicket(data);
          } catch (error) {
               console.error('Error fetching ticket:', error);
               toast.error('Failed to load ticket');
          } finally {
               setLoading(false);
          }
     };

     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = Array.from(e.target.files || []);
          if (attachments.length + files.length > 5) {
               toast.error('Maximum 5 files allowed');
               return;
          }
          setAttachments([...attachments, ...files]);
     };

     const removeFile = (index: number) => {
          setAttachments(attachments.filter((_, i) => i !== index));
     };

     const handleSendMessage = async () => {
          if (!message.trim() && attachments.length === 0) {
               toast.error('Please enter a message or attach files');
               return;
          }

          try {
               setIsSending(true);
               await ticketApi.addMessage(ticketId, {
                    message: message.trim(),
                    attachments: attachments.length > 0 ? attachments : undefined,
               });

               setMessage('');
               setAttachments([]);
               await fetchTicket();
               toast.success('Message sent successfully');
          } catch (error: any) {
               console.error('Error sending message:', error);
               toast.error(error.response?.data?.message || 'Failed to send message');
          } finally {
               setIsSending(false);
          }
     };

     const handleCloseTicket = async () => {
          try {
               await ticketApi.closeTicket(ticketId);
               toast.success('Ticket closed successfully');
               await fetchTicket();
          } catch (error) {
               console.error('Error closing ticket:', error);
               toast.error('Failed to close ticket');
          }
     };

     const handleReopenTicket = async () => {
          try {
               await ticketApi.reopenTicket(ticketId);
               toast.success('Ticket reopened successfully');
               await fetchTicket();
          } catch (error) {
               console.error('Error reopening ticket:', error);
               toast.error('Failed to reopen ticket');
          }
     };

     const getStatusBadge = (status: string) => {
          const config: Record<string, { variant: any; label: string; icon: React.ReactNode; className?: string }> = {
               open: {
                    variant: 'default',
                    label: 'Open',
                    icon: <AlertCircle className="h-3 w-3" />,
                    className: 'bg-blue-500 hover:bg-blue-600'
               },
               in_progress: {
                    variant: 'default',
                    label: 'In Progress',
                    icon: <Clock className="h-3 w-3" />,
                    className: 'bg-yellow-500 hover:bg-yellow-600'
               },
               resolved: {
                    variant: 'default',
                    label: 'Resolved',
                    icon: <CheckCircle className="h-3 w-3" />,
                    className: 'bg-green-500 hover:bg-green-600'
               },
               closed: {
                    variant: 'secondary',
                    label: 'Closed',
                    icon: <XCircle className="h-3 w-3" />,
               },
          };

          const item = config[status] || config.open;
          return (
               <Badge variant={item.variant} className={`flex items-center gap-1 ${item.className || ''}`}>
                    {item.icon}
                    {item.label}
               </Badge>
          );
     };

     const getPriorityBadge = (priority: string) => {
          const config: Record<string, { className: string; label: string }> = {
               low: { className: 'bg-gray-500', label: 'Low' },
               medium: { className: 'bg-blue-500', label: 'Medium' },
               high: { className: 'bg-orange-500', label: 'High' },
               urgent: { className: 'bg-red-500', label: 'Urgent' },
          };

          const item = config[priority] || config.medium;
          return (
               <Badge className={`${item.className} text-white hover:${item.className}`}>
                    {item.label}
               </Badge>
          );
     };

     if (loading) {
          return (
               <div className="flex justify-center items-center min-h-screen">
                    <Loader2 className="h-8 w-8 animate-spin" />
               </div>
          );
     }

     if (!ticket) {
          return (
               <div className="container mx-auto py-6 p-8">
                    <div className="text-center">
                         <h2 className="text-2xl font-bold mb-2">Ticket not found</h2>
                         <Button onClick={() => router.push('/support')}>
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Back to Tickets
                         </Button>
                    </div>
               </div>
          );
     }

     return (
          <div className="container mx-auto py-6 space-y-6 p-8">
               <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                         <Button variant="ghost" size="icon" onClick={() => router.push('/support')}>
                              <ArrowLeft className="h-4 w-4" />
                         </Button>
                         <div>
                              <h1 className="text-3xl font-bold">{ticket.title}</h1>
                              <p className="text-muted-foreground mt-1">
                                   Ticket ID: {ticket.id.substring(0, 12)}...
                              </p>
                         </div>
                    </div>
                    <div className="flex items-center gap-2">
                         {ticket.status === 'closed' ? (
                              <Button variant="outline" onClick={handleReopenTicket}>
                                   Reopen Ticket
                              </Button>
                         ) : (
                              <Button variant="outline" onClick={handleCloseTicket}>
                                   Close Ticket
                              </Button>
                         )}
                    </div>
               </div>

               <div className="grid gap-6 md:grid-cols-3">
                    {/* Ticket Info */}
                    <div className="md:col-span-1">
                         <Card>
                              <CardHeader>
                                   <CardTitle>Ticket Information</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                   <div>
                                        <Label className="text-sm text-muted-foreground">Status</Label>
                                        <div className="mt-1">{getStatusBadge(ticket.status)}</div>
                                   </div>
                                   <Separator />
                                   <div>
                                        <Label className="text-sm text-muted-foreground">Priority</Label>
                                        <div className="mt-1">{getPriorityBadge(ticket.priority)}</div>
                                   </div>
                                   <Separator />
                                   <div>
                                        <Label className="text-sm text-muted-foreground">Category</Label>
                                        <div className="mt-1">
                                             <Badge variant="outline">{ticket.category}</Badge>
                                        </div>
                                   </div>
                                   <Separator />
                                   <div>
                                        <Label className="text-sm text-muted-foreground">Created</Label>
                                        <p className="text-sm mt-1">
                                             {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
                                        </p>
                                   </div>
                                   <Separator />
                                   <div>
                                        <Label className="text-sm text-muted-foreground">Last Updated</Label>
                                        <p className="text-sm mt-1">
                                             {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
                                        </p>
                                   </div>
                                   {ticket.closedAt && (
                                        <>
                                             <Separator />
                                             <div>
                                                  <Label className="text-sm text-muted-foreground">Closed</Label>
                                                  <p className="text-sm mt-1">
                                                       {formatDistanceToNow(new Date(ticket.closedAt), { addSuffix: true })}
                                                  </p>
                                             </div>
                                        </>
                                   )}
                              </CardContent>
                         </Card>
                    </div>

                    {/* Messages */}
                    <div className="md:col-span-2 space-y-6">
                         {/* Initial Description */}
                         <Card>
                              <CardHeader>
                                   <CardTitle>Description</CardTitle>
                              </CardHeader>
                              <CardContent>
                                   <p className="text-sm whitespace-pre-wrap">{ticket.description}</p>
                                   {ticket.attachments && ticket.attachments.length > 0 && (
                                        <div className="mt-4">
                                             <Label className="text-sm">Attachments</Label>
                                             <div className="grid grid-cols-2 gap-2 mt-2">
                                                  {ticket.attachments.map((attachment, idx) => {
                                                       const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(attachment);
                                                       return (
                                                            <div key={idx} className="relative group">
                                                                 {isImage ? (
                                                                      <div
                                                                           className="relative h-32 rounded-md overflow-hidden border cursor-pointer"
                                                                           onClick={() => setSelectedImage(`${baseUrl}${attachment}`)}
                                                                      >
                                                                           <Image
                                                                                src={`${baseUrl}${attachment}`}
                                                                                alt={`Attachment ${idx + 1}`}
                                                                                fill
                                                                                className="object-cover"
                                                                           />
                                                                           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                                <ImageIcon className="h-6 w-6 text-white" />
                                                                           </div>
                                                                      </div>
                                                                 ) : (
                                                                      <a
                                                                           href={`${baseUrl}${attachment}`}
                                                                           target="_blank"
                                                                           rel="noopener noreferrer"
                                                                           className="flex items-center gap-2 p-3 border rounded-md hover:bg-muted"
                                                                      >
                                                                           <FileIcon className="h-4 w-4" />
                                                                           <span className="text-sm truncate">File {idx + 1}</span>
                                                                           <Download className="h-4 w-4 ml-auto" />
                                                                      </a>
                                                                 )}
                                                            </div>
                                                       );
                                                  })}
                                             </div>
                                        </div>
                                   )}
                              </CardContent>
                         </Card>

                         {/* Messages */}
                         <Card>
                              <CardHeader>
                                   <CardTitle>Messages ({ticket.messages.length})</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                   {ticket.messages.length === 0 ? (
                                        <p className="text-center text-muted-foreground py-8">
                                             No messages yet. Send a message to get a response from support.
                                        </p>
                                   ) : (
                                        ticket.messages.map((msg) => {
                                             const isCurrentUser = msg.sender === user?.id;
                                             return (
                                                  <div
                                                       key={msg.id}
                                                       className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
                                                  >
                                                       <Avatar className="h-8 w-8">
                                                            <AvatarFallback>
                                                                 {isCurrentUser ? 'You' : 'CS'}
                                                            </AvatarFallback>
                                                       </Avatar>
                                                       <div className={`flex-1 space-y-2 ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                                                            <div
                                                                 className={`rounded-lg p-3 max-w-[80%] ${
                                                                      isCurrentUser
                                                                           ? 'bg-primary text-primary-foreground ml-auto'
                                                                           : 'bg-muted'
                                                                 }`}
                                                            >
                                                                 <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                                                                 {msg.attachments && msg.attachments.length > 0 && (
                                                                      <div className="mt-2 space-y-1">
                                                                           {msg.attachments.map((attachment, idx) => {
                                                                                const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(attachment);
                                                                                return (
                                                                                     <div key={idx}>
                                                                                          {isImage ? (
                                                                                               <div
                                                                                                    className="relative h-32 w-full rounded-md overflow-hidden cursor-pointer"
                                                                                                    onClick={() => setSelectedImage(`${baseUrl}${attachment}`)}
                                                                                               >
                                                                                                    <Image
                                                                                                         src={`${baseUrl}${attachment}`}
                                                                                                         alt={`Message attachment ${idx + 1}`}
                                                                                                         fill
                                                                                                         className="object-cover"
                                                                                                    />
                                                                                               </div>
                                                                                          ) : (
                                                                                               <a
                                                                                                    href={`${baseUrl}${attachment}`}
                                                                                                    target="_blank"
                                                                                                    rel="noopener noreferrer"
                                                                                                    className="flex items-center gap-2 text-sm hover:underline"
                                                                                               >
                                                                                                    <FileIcon className="h-3 w-3" />
                                                                                                    Attachment {idx + 1}
                                                                                                    <Download className="h-3 w-3" />
                                                                                               </a>
                                                                                          )}
                                                                                     </div>
                                                                                );
                                                                           })}
                                                                      </div>
                                                                 )}
                                                            </div>
                                                            <p className="text-xs text-muted-foreground">
                                                                 {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                                                            </p>
                                                       </div>
                                                  </div>
                                             );
                                        })
                                   )}
                              </CardContent>
                         </Card>

                         {/* Reply Box */}
                         {ticket.status !== 'closed' && (
                              <Card>
                                   <CardHeader>
                                        <CardTitle>Send Message</CardTitle>
                                   </CardHeader>
                                   <CardContent className="space-y-4">
                                        <div>
                                             <Label htmlFor="message">Your Message</Label>
                                             <textarea
                                                  id="message"
                                                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                                                  placeholder="Type your message..."
                                                  value={message}
                                                  onChange={(e) => setMessage(e.target.value)}
                                                  disabled={isSending}
                                             />
                                        </div>

                                        <div>
                                             <Label>Attachments (Optional, max 5)</Label>
                                             <div className="flex items-center gap-2 mt-2">
                                                  <Input
                                                       type="file"
                                                       id="message-files"
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
                                                       onClick={() => document.getElementById('message-files')?.click()}
                                                       disabled={attachments.length >= 5 || isSending}
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
                                                                      disabled={isSending}
                                                                 >
                                                                      <X className="h-4 w-4" />
                                                                 </Button>
                                                            </div>
                                                       ))}
                                                  </div>
                                             )}
                                        </div>

                                        <Button onClick={handleSendMessage} disabled={isSending} className="w-full">
                                             {isSending ? (
                                                  <>
                                                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                       Sending...
                                                  </>
                                             ) : (
                                                  <>
                                                       <Send className="mr-2 h-4 w-4" />
                                                       Send Message
                                                  </>
                                             )}
                                        </Button>
                                   </CardContent>
                              </Card>
                         )}
                    </div>
               </div>

               {/* Image Preview Modal */}
               {selectedImage && (
                    <div
                         className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                         onClick={() => setSelectedImage(null)}
                    >
                         <div className="relative max-w-4xl max-h-[90vh]">
                              <Button
                                   size="icon"
                                   variant="ghost"
                                   className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                                   onClick={() => setSelectedImage(null)}
                              >
                                   <X className="h-4 w-4" />
                              </Button>
                              <img
                                   src={selectedImage}
                                   alt="Preview"
                                   className="max-w-full max-h-[90vh] object-contain rounded-lg"
                              />
                         </div>
                    </div>
               )}
          </div>
     );
}
