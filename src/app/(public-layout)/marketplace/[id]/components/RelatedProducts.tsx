import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface RelatedProduct {
    id: string
    name: string
    price: number
    originalPrice: number
    image: string
    rating: number
    downloads: number
    author?: {
        name: string
        avatar?: string
    }
}

interface RelatedProductsProps {
    products: RelatedProduct[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    return (
        <div className='mt-12'>
            <h2 className='text-2xl font-bold mb-6'>Related Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {products.map((product) => (
                    <Link key={product.id} href={`/marketplace/${product.id}`}>
                        <div className="relative w-full aspect-square bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:opacity-80 transition-shadow">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="100%"
                                className="object-cover hover:opacity-90 transition-opacity"
                                unoptimized
                            />
                            <div className="p-4 absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
                                <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>

                                {product.author && (
                                    <div className="flex items-center gap-2 mb-3">
                                        <Avatar className='size-6'>
                                            <AvatarImage src={product.author.avatar} alt={product.author.name} />
                                            <AvatarFallback className="bg-gray-700 text-white text-xs">
                                                {product.author.name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs text-gray-300">{product.author.name}</span>
                                    </div>
                                )}

                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-xs text-gray-400">Price</p>
                                        <div className='flex items-center gap-2'>
                                            <span className="text-lg font-bold">${product.price}</span>
                                            <span className='text-xs text-gray-400 line-through'>${product.originalPrice}</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-1 mb-2'>
                                        <Star fill="yellow" stroke="none" color="yellow" className="w-4 h-4" />
                                        <span className="text-sm font-semibold">{product.rating}</span>
                                        <span className='text-xs text-gray-400'>({product.downloads})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
