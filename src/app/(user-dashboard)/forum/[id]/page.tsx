'use client'

import React from 'react'
import Post from '../../../../components/forum/post'
import { useParams } from 'next/navigation'

export default function PostDetail() {
     const { id } = useParams()
     return (
          <h1>{id}</h1>
     )
}
