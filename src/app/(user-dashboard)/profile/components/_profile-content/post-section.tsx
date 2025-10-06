import Post from '@/components/forum/post'
import React from 'react'
import dataPost from '@/data-test/forum.json'

export default function PostSection() {
  const firstPost = dataPost.data[1]

  return (
    <div>
      <div className='border border-black/10 rounded-2xl '>
        <Post
          id={firstPost.id}
          user={firstPost.user}
          time={firstPost.createdAt}
          title={firstPost.title}
          content={firstPost.content}
          imageUrl={firstPost.imageUrl}
          commentCount={firstPost.commentCount}
        />
      </div>
    </div>
  )
}
