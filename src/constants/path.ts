export const ROUTES = {
     HOME: '/',
     LOGIN: '/login',
     //SIDEBAR:
     FORUM: '/forum',
     PROFILE: (id: string | number) => `/profile/${id}`,
     PORTFOLIO: '/portfolio',
     MESSAGE: '/message',
     MARTKETPLACE: '/marketplace',
     PURCHASED_PRESET: '/purchased-presets',
     CART: '/cart',
     SETTING: '/setting',
     HELP: '/help'
}