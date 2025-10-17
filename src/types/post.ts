export type PostType = {
     id: string,
     user: {
          id: string,
          avatarUrl: string,
          name: string,
          isFollowed: boolean
     },
     time: string,
     title: string,
     content?: string,
     imageUrl?: string,
     commentCount: number,
     createdAt: string
}