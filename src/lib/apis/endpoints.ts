const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || ''

export const createEndpoints = (resource: string) => {
     return {
          all: `${API_PREFIX}/${resource}`,
          byId: (id: string | number) => `${API_PREFIX}/${resource}/${id}`
     }
}

export const endpoints = {
     post: createEndpoints('posts'),
     marketplace: createEndpoints('marketplaces'),
     product: createEndpoints('products'),
     forum: createEndpoints('forums'),
     comment: {
          byPostId: (postId: string) => `${API_PREFIX}/posts/${postId}/comments`
     },
     like: {
          byPostId: (postId: string) => `${API_PREFIX}/posts/${postId}/like`
     },
     payment: {
          paypal: `${API_PREFIX}/payment/paypal/create`,
          vnpay: `${API_PREFIX}/payment/vnpay/create`,
          vnpayCallback: `${API_PREFIX}/payment/vnpay-return`
     },
     wallet: `${API_PREFIX}/wallet`,
     paymentHistory: `${API_PREFIX}/payment-history`,
     message: {
          all: `${API_PREFIX}/chat/rooms`,
          detail: (roomId: string) => `${API_PREFIX}/chat/rooms/${roomId}`,
          allMessage: (roomId: string, limit: number = 50) => `${API_PREFIX}/chat/rooms/${roomId}/messages?limit=${limit}`,
          createDirect: (otherUserId: string) => `${API_PREFIX}/chat/direct/${otherUserId}`
     }
}