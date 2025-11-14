// import { SOCKET_URL } from '@/constants'
// import io from 'socket.io-client'

// const socket = io(SOCKET_URL, {
//      transports: ['websocket', 'polling'],
//      reconnection: true,
//      reconnectionDelay: 1000,
//      reconnectionAttempts: 5
// })

// // Authenticate
// socket.emit('authenticate', { userId: 'your-user-id' })

// // Join room
// socket.emit('joinRoom', { roomId: 'room-id' })

// // Send message
// socket.emit('sendMessage', {
//      userId: 'your-user-id',
//      roomId: 'room-id',
//      content: 'Hello!'
// })

// // Listen for new messages
// socket.on('newMessage', (message) => {
//      console.log('New message:', message)
// })

// // Listen for typing indicator
// socket.on('userTyping', (data) => {
//      console.log('User typing:', data)
// })
