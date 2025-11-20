import { apiClient } from './client';
import {
     Ticket,
     TicketMessage,
     TicketsResponse,
     TicketResponse,
     MessageResponse,
     CreateTicketPayload,
     AddMessagePayload,
} from '@/types/ticket';

export const ticketApi = {
     /**
      * Create a new ticket
      */
     async createTicket(payload: CreateTicketPayload): Promise<Ticket> {
          const formData = new FormData();
          formData.append('title', payload.title);
          formData.append('description', payload.description);
          formData.append('priority', payload.priority);
          formData.append('category', payload.category);

          if (payload.attachments && payload.attachments.length > 0) {
               payload.attachments.forEach((file) => {
                    formData.append('attachments', file);
               });
          }

          const res = await apiClient.post<TicketResponse>('/tickets', formData, {
               headers: {
                    'Content-Type': 'multipart/form-data',
               },
          });
          return res.data.data;
     },

     /**
      * Get all user tickets
      */
     async getUserTickets(): Promise<Ticket[]> {
          const res = await apiClient.get<TicketsResponse>('/tickets');
          return res.data.data;
     },

     /**
      * Get ticket by ID
      */
     async getTicketById(ticketId: string): Promise<Ticket> {
          const res = await apiClient.get<TicketResponse>(`/tickets/${ticketId}`);
          return res.data.data;
     },

     /**
      * Add message/reply to ticket
      */
     async addMessage(ticketId: string, payload: AddMessagePayload): Promise<TicketMessage> {
          const formData = new FormData();
          formData.append('message', payload.message);

          if (payload.attachments && payload.attachments.length > 0) {
               payload.attachments.forEach((file) => {
                    formData.append('attachments', file);
               });
          }

          const res = await apiClient.post<MessageResponse>(`/tickets/${ticketId}/messages`, formData, {
               headers: {
                    'Content-Type': 'multipart/form-data',
               },
          });
          return res.data.data;
     },

     /**
      * Close ticket
      */
     async closeTicket(ticketId: string): Promise<Ticket> {
          const res = await apiClient.patch<TicketResponse>(`/tickets/${ticketId}/close`);
          return res.data.data;
     },

     /**
      * Reopen ticket
      */
     async reopenTicket(ticketId: string): Promise<Ticket> {
          const res = await apiClient.patch<TicketResponse>(`/tickets/${ticketId}/reopen`);
          return res.data.data;
     },
};
