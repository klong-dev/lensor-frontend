export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TicketMessage {
     id: string;
     sender: string;
     message: string;
     attachments: string[];
     createdAt: string;
}

export interface Ticket {
     id: string;
     title: string;
     description: string;
     status: TicketStatus;
     priority: TicketPriority;
     category: string;
     createdBy: string;
     assignedTo: string | null;
     attachments: string[];
     messages: TicketMessage[];
     createdAt: string;
     updatedAt: string;
     closedAt: string | null;
}

export interface CreateTicketPayload {
     title: string;
     description: string;
     priority: TicketPriority;
     category: string;
     attachments?: File[];
}

export interface AddMessagePayload {
     message: string;
     attachments?: File[];
}

export interface TicketsResponse {
     data: Ticket[];
}

export interface TicketResponse {
     data: Ticket;
}

export interface MessageResponse {
     data: TicketMessage;
}
