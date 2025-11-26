export const ROUTES = {
     HOME: '/',
     LOGIN: '/login',
     //SIDEBAR:
     FORUM: '/forum',
     POST: (id: string) => `/forum/${id}`,
     PROFILE: (id: string | number) => `/profile/${id}`,
     CURRENT_PROFILE: '/profile',
     PORTFOLIO: '/portfolio',
     MESSAGE: '/message',
     MARKETPLACE: '/marketplace',
     CART: '/cart',
     SETTING: '/setting',
     HELP: '/help',
     NOTIFICATION: '/notification',
     CREATE_PORTFOLIO: '/create-portfolio',
     PURCHASED_PRESETS: '/purchased-presets',
     WALLET: '/wallet',
     PRODUCT_MANAGEMENT: '/product-management',
     STATISTICS: '/statistics',
     SOLD_ORDERS: '/sold-orders',
     SUPPORT: '/support'
}