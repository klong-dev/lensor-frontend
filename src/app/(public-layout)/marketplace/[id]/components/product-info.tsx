import { CreditCard, ShoppingCart } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProductInfoProps {
    name: string
    rating: number
    reviewCount: number
    price: number
    originalPrice: number
    features: string[]
    author?: {
        name: string
        avatar?: string
    }
}

export default function ProductInfo({ name, rating, reviewCount, price, originalPrice, features, author }: ProductInfoProps) {
    return (
        <div className='col-span-5 flex flex-col gap-6'>

            <h1 className='text-3xl font-bold'>{name}</h1>

            {author && (
                <div className='flex items-center gap-3'>
                    <Avatar className='size-8'>
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback>{author.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='font-semibold'>{author.name}</p>
                    </div>
                </div>
            )}

            <div className='flex items-center gap-2'>
                <div className='flex text-yellow-500'>
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className='text-xl'>
                            {i < Math.floor(rating) ? '★' : i < rating ? '⯨' : '☆'}
                        </span>
                    ))}
                </div>
                <span className='font-medium'>{rating}</span>
                <span className='text-muted-foreground'>({reviewCount} reviews)</span>
            </div>

            <div className='flex items-center gap-3'>
                <span className='text-3xl font-bold'>${price.toFixed(2)}</span>
                <span className='text-xl text-muted-foreground line-through'>${originalPrice.toFixed(2)}</span>
            </div>

            <div className='border-t pt-6'>
                <div className='mb-4'>
                    <label className='text-sm font-medium mb-2 block'>Features:</label>
                    <div className='flex flex-wrap gap-2'>
                        {features.map((feature, index) => (
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
                <button className='flex-1 bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2'>
                    <ShoppingCart className='w-5 h-5' />
                    Add to Cart
                </button>
                <button className='flex-1 bg-secondary text-secondary-foreground py-3 rounded-md font-medium hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2'>
                    <CreditCard className='w-5 h-5' />
                    Buy Now
                </button>
            </div>

            <div className='text-sm text-muted-foreground'>
                <p>Enjoy <strong>FREE express</strong> & <strong>Free Returns</strong> on orders over $35!</p>
            </div>
        </div>
    )
}
