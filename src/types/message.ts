export type DataMessageProps = {
     createdAt: string,
     id: string,
     lastMessage: {
          content: string,
          createdAt: string,
          userId: string
     } | null,
     name: string,
     participantIds: string[],
     participants: [
          {
               avatar: string,
               id: string,
               name: string
          }
     ],
     type: 'direct' | string,
     unreadCount: number,
     updatedAt: string
}