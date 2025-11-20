export interface UserProfile {
     id: string
     email: string
     name: string
     avatarUrl: string
     createdAt: string
     updatedAt: string
     emailConfirmedAt: string
     lastSignInAt: string
     posts: UserPost[]
     products: UserProduct[]
     isFollowing?: boolean
     followerCount?: number
     followingCount?: number
     postCount?: number
}

export interface UserPost {
     id: string
     title: string
     content: string
     imageUrl: string
     thumbnailUrl: string
     isNSFW: boolean
     createdAt: string
}

export interface UserProduct {
     id: string
     title: string
     description: string
     price: string
     image: string
     thumbnail: string
     rating: string
     reviewCount: number
     sellCount: number
     createdAt: string
}
