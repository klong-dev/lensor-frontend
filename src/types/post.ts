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
     voteCount: number,
     createdAt: string
}

export type CommentType = {
     id: string,
     user: {
          id: string,
          avatarUrl: string,
          name: string
     },
     time: string,
     content: string
}