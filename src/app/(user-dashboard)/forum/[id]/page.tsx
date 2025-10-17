'use client'

import React from 'react'
import Post from '../../../../components/forum/post'
import { useParams } from 'next/navigation'
import { usePostDetail } from '@/lib/hooks/usePostHooks'

export default function PostDetail() {
     const { id } = useParams()
     const { data } = usePostDetail(id as string)
     console.log(data);
     
     return (
          <h1>{id}</h1>
     )
}
