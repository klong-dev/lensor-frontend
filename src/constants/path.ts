export const ROUTES = {
     HOME: '/',
     LOGIN: '/login',
     //SIDEBAR:
     FORUM: '/forum',
     PROFILE: (id: string | number) => `/profile/${id}`,
     CURRENT_PROFILE: '/profile',
     PORTFOLIO: '/portfolio',
     MESSAGE: '/message',
     MARTKETPLACE: '/marketplace-2',
     PURCHASED_PRESET: '/purchased-presets',
     CART: '/cart',
     SETTING: '/setting',
     HELP: '/help',
     NOTIFICATION: '/notification'
}