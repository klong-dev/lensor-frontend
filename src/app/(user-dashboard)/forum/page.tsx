import React from 'react'
import Post from './components/post'
import { Divider } from '@mantine/core'

export default function ForumPage() {
     return (
          <div className='w-150 mx-auto'>
               <Post
                    userName='Lê Trà Thảo'
                    time='4 days ago'
                    title='Post title'
                    content='Post content test Post content test Post content test Post content test Post content test Post content test'
                    imageUrl='/images/photo_test.jpg'
               />

               <Divider />

               <Post
                    userName='Lê Trà Thảo'
                    time='4 days ago'
                    title='Post title'
                    content='Post content test Post content test Post content test Post content test Post content test Post content test'
                    imageUrl='/images/photo_test_2.jpg'
               />
          </div>
     )
}
