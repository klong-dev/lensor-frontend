import { create } from 'zustand'
import { DataMessageProps } from '@/types/message'

interface ChatState {
     selectedConversation: DataMessageProps | null
     setSelectedConversation: (conversation: DataMessageProps) => void
}

export const useChatStore = create<ChatState>((set) => ({
     selectedConversation: null,
     setSelectedConversation: (conversation) => set({ selectedConversation: conversation })
}))
