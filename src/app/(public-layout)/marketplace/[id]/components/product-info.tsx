'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/path'
import { cartApi } from '@/lib/apis/cartApi'
import { MarketplaceDetail } from '@/types/marketplace'
import { ShoppingCart, Star } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ProductInfo({
    id,
    name,
    rating,
    reviewCount,
    price,
    originalPrice,
    features,
    author }:
    MarketplaceDetail) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleAddToCart = async () => {
        setIsSubmitting(true)
        try {
            const res = await cartApi.addItem({
                productId: id,
                quantity: 1
            })
            if (res) {
                toast.success('Product added successfully!')
            }
        } catch (error) {
            console.error('Error adding product:', error)
            toast.error('Failed to adding product. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='col-span-5 flex flex-col gap-6'>

            <h1 className='text-3xl font-bold'>{name}</h1>
            <Link href={ROUTES.PROFILE(author?.id)}>
                {author && (
                    <div className='flex items-center gap-3'>
                        <Avatar className='size-8'>
                            <AvatarImage src={author?.avatar} alt={author?.name} />
                            <AvatarFallback>{author?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className='font-semibold hover:text-primary'>{author?.name}</p>
                        </div>
                    </div>
                )}
            </Link>

            <div className='flex items-center gap-2'>
                <div className='flex text-yellow-500'>
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className='w-5 h-5'
                            fill={i < Math.floor(rating || 0) ? 'currentColor' : 'none'}
                            stroke="currentColor"
                        />
                    ))}
                </div>
                <span className='font-medium'>{rating}</span>
                <span className='text-muted-foreground'>({reviewCount} reviews)</span>
            </div>

            <div className='flex items-center gap-3'>
                <span className='text-3xl font-bold'>{price?.toLocaleString('vi-VN') || 0} ₫</span>
                <span className='text-xl text-muted-foreground line-through'>{originalPrice?.toLocaleString('vi-VN') || 0} ₫</span>
            </div>

            <div className='border-t pt-6'>
                <div className='mb-4'>
                    <label className='text-sm font-medium mb-2 block'>Features:</label>
                    <div className='flex flex-wrap gap-2'>
                        {features?.map((feature, index) => (
                            <button
                                key={index}
                                className='px-4 py-2 border rounded-md text-sm hover:bg-accent transition-colors'
                            >
                                {feature}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex gap-3'>
                <Button
                    onClick={handleAddToCart}
                    size={'lg'}
                    className='flex-1 bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2'
                    disabled={isSubmitting}
                >
                    <ShoppingCart className='w-5 h-5' />
                    {isSubmitting ? 'Adding' : 'Add to Cart'}
                </Button>
            </div>
        </div>
    )
}
