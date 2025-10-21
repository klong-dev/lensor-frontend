import Image from 'next/image'
import React from 'react'

interface RelatedProduct {
    id: string
    name: string
    price: number
    originalPrice: number
    image: string
    rating: number
    downloads: number
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
                    <div key={product.id} className='border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer'>
                        <div className='relative aspect-video'>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className='object-cover'
                                unoptimized
                            />
                        </div>
                        <div className='p-4'>
                            <h3 className='font-semibold mb-2 line-clamp-1'>{product.name}</h3>
                            <div className='flex items-center gap-2 mb-2'>
                                <div className='flex text-yellow-500 text-sm'>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>
                                            {i < Math.floor(product.rating) ? '★' : '☆'}
                                        </span>
                                    ))}
                                </div>
                                <span className='text-xs text-muted-foreground'>({product.downloads})</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='text-lg font-bold'>${product.price}</span>
                                <span className='text-sm text-muted-foreground line-through'>${product.originalPrice}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
