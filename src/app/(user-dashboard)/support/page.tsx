"use client";

import { useEffect, useState } from 'react';
import { ticketApi } from '@/lib/apis/ticketApi';
import { Ticket, TicketStatus } from '@/types/ticket';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from '@/components/ui/table';
import { Plus, MessageSquare, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CreateTicketDialog } from './components/create-ticket-dialog';

export default function SupportPage() {
     const router = useRouter();
     const [tickets, setTickets] = useState<Ticket[]>([]);
     const [loading, setLoading] = useState(false);
     const [activeTab, setActiveTab] = useState<'all' | TicketStatus>('all');
     const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

     useEffect(() => {
          fetchTickets();
     }, []);

     const fetchTickets = async () => {
          try {
               setLoading(true);
               const data = await ticketApi.getUserTickets();
               setTickets(data);
          } catch (error) {
               console.error('Error fetching tickets:', error);
               toast.error('Failed to fetch tickets');
          } finally {
               setLoading(false);
          }
     };

     const filteredTickets = activeTab === 'all'
          ? tickets
          : tickets.filter(ticket => ticket.status === activeTab);

     const getStatusBadge = (status: TicketStatus) => {
          const config: Record<TicketStatus, { variant: any; label: string; icon: React.ReactNode; className?: string }> = {
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

          const item = config[status];
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

     const formatDate = (dateString: string) => {
          return new Date(dateString).toLocaleString('en-US', {
               year: 'numeric',
               month: 'short',
               day: 'numeric',
               hour: '2-digit',
               minute: '2-digit',
          });
     };

     const stats = {
          total: tickets.length,
          open: tickets.filter(t => t.status === 'open').length,
          in_progress: tickets.filter(t => t.status === 'in_progress').length,
          resolved: tickets.filter(t => t.status === 'resolved').length,
          closed: tickets.filter(t => t.status === 'closed').length,
     };

     return (
          <div className="container mx-auto py-6 space-y-6 p-8">
               <div className="flex items-center justify-between">
                    <div>
                         <h1 className="text-3xl font-bold">Support Tickets</h1>
                         <p className="text-muted-foreground mt-1">
                              Manage your support requests and get help
                         </p>
                    </div>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                         <Plus className="mr-2 h-4 w-4" />
                         Create Ticket
                    </Button>
               </div>

               {/* Stats Cards */}
               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Total</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold">{stats.total}</div>
                         </CardContent>
                    </Card>
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Open</CardTitle>
                              <AlertCircle className="h-4 w-4 text-blue-500" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold">{stats.open}</div>
                         </CardContent>
                    </Card>
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                              <Clock className="h-4 w-4 text-yellow-500" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold">{stats.in_progress}</div>
                         </CardContent>
                    </Card>
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold">{stats.resolved}</div>
                         </CardContent>
                    </Card>
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Closed</CardTitle>
                              <XCircle className="h-4 w-4 text-muted-foreground" />
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold">{stats.closed}</div>
                         </CardContent>
                    </Card>
               </div>

               {/* Tickets Table */}
               <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                    <TabsList>
                         <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                         <TabsTrigger value="open">Open ({stats.open})</TabsTrigger>
                         <TabsTrigger value="in_progress">In Progress ({stats.in_progress})</TabsTrigger>
                         <TabsTrigger value="resolved">Resolved ({stats.resolved})</TabsTrigger>
                         <TabsTrigger value="closed">Closed ({stats.closed})</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-4">
                         <Card>
                              <CardHeader>
                                   <CardTitle>Your Tickets</CardTitle>
                                   <CardDescription>
                                        {loading ? 'Loading...' : `${filteredTickets.length} ticket(s)`}
                                   </CardDescription>
                              </CardHeader>
                              <CardContent>
                                   {loading ? (
                                        <div className="flex justify-center items-center py-12">
                                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                        </div>
                                   ) : filteredTickets.length === 0 ? (
                                        <div className="text-center py-12 text-muted-foreground">
                                             No tickets found
                                        </div>
                                   ) : (
                                        <div className="overflow-x-auto">
                                             <Table>
                                                  <TableHeader>
                                                       <TableRow>
                                                            <TableHead>Ticket ID</TableHead>
                                                            <TableHead>Title</TableHead>
                                                            <TableHead>Category</TableHead>
                                                            <TableHead>Priority</TableHead>
                                                            <TableHead>Status</TableHead>
                                                            <TableHead>Messages</TableHead>
                                                            <TableHead>Created</TableHead>
                                                            <TableHead>Actions</TableHead>
                                                       </TableRow>
                                                  </TableHeader>
                                                  <TableBody>
                                                       {filteredTickets.map((ticket) => (
                                                            <TableRow key={ticket.id}>
                                                                 <TableCell className="font-mono text-xs">
                                                                      {ticket.id.substring(0, 8)}...
                                                                 </TableCell>
                                                                 <TableCell className="font-medium max-w-xs truncate">
                                                                      {ticket.title}
                                                                 </TableCell>
                                                                 <TableCell>
                                                                      <Badge variant="outline">{ticket.category}</Badge>
                                                                 </TableCell>
                                                                 <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                                                                 <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                                                                 <TableCell>
                                                                      <div className="flex items-center gap-1">
                                                                           <MessageSquare className="h-4 w-4" />
                                                                           <span>{ticket.messages.length}</span>
                                                                      </div>
                                                                 </TableCell>
                                                                 <TableCell className="text-sm">
                                                                      {formatDate(ticket.createdAt)}
                                                                 </TableCell>
                                                                 <TableCell>
                                                                      <Button
                                                                           size="sm"
                                                                           variant="outline"
                                                                           onClick={() => router.push(`/support/${ticket.id}`)}
                                                                      >
                                                                           View Details
                                                                      </Button>
                                                                 </TableCell>
                                                            </TableRow>
                                                       ))}
                                                  </TableBody>
                                             </Table>
                                        </div>
                                   )}
                              </CardContent>
                         </Card>
                    </TabsContent>
               </Tabs>

               {/* Create Ticket Dialog */}
               <CreateTicketDialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                    onSuccess={() => {
                         fetchTickets();
                         toast.success('Ticket created successfully');
                    }}
               />
          </div>
     );
}
