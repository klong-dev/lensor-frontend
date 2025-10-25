import { ScrollArea } from '@/components/ui/scroll-area'
import ChatItem from './chat-item'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Search } from 'lucide-react'

export const mockMessages = [
     {
          chatPartner: {
               id: "u1",
               avatar: "https://i.pravatar.cc/150?img=1",
               fullname: "Ajabi",
          },
          chatId: "chat-1",
          lastMessage: "Hello! My name is Ajabi, I'm a creative designer.",
          lastMessageTime: "15:53",
          countUnreadMessage: "2",
          isActive: false,
     },
     {
          chatPartner: {
               id: "u2",
               avatar: "https://i.pravatar.cc/150?img=2",
               fullname: "Bingi Dingi",
          },
          chatId: "chat-2",
          lastMessage: "Landing page for website is almost done.",
          lastMessageTime: "15:55",
          countUnreadMessage: "0",
          isActive: true,
     },
     {
          chatPartner: {
               id: "u3",
               avatar: "https://i.pravatar.cc/150?img=3",
               fullname: "Salman Birat",
          },
          chatId: "chat-3",
          lastMessage: "Can we schedule a quick meeting tomorrow?",
          lastMessageTime: "16:02",
          countUnreadMessage: "9",
          isActive: false,
     },
     {
          chatPartner: {
               id: "u4",
               avatar: "https://i.pravatar.cc/150?img=4",
               fullname: "Nayem Hasan",
          },
          chatId: "chat-4",
          lastMessage: "Sure! I’ll send you the updated design files.",
          lastMessageTime: "16:10",
          countUnreadMessage: "0",
          isActive: false,
     },
     {
          chatPartner: {
               id: "u5",
               avatar: "https://i.pravatar.cc/150?img=5",
               fullname: "Elena Disay",
          },
          chatId: "chat-5",
          lastMessage: "Thanks for the feedback, I'll apply those changes.",
          lastMessageTime: "16:15",
          countUnreadMessage: "3",
          isActive: false,
     },
];

export default function ChatSidebar() {
     return (
          <ScrollArea className='w-[310px] border-r-2'>
               <div className='p-4 sticky top-0 z-10 backdrop-blur-2xl'>
                    <h1 className='py-3 scroll-m-20 text-2xl font-semibold tracking-tight'>Messages</h1>
                    <InputGroup>
                         <InputGroupInput placeholder="Search..." />
                         <InputGroupAddon>
                              <Search />
                         </InputGroupAddon>
                         <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
                    </InputGroup>
               </div>
               <div className='pr-2'>
                    {mockMessages?.map((item, index) => (
                         <ChatItem data={item} key={index} />
                    ))}
               </div>
          </ScrollArea>
     )
}
