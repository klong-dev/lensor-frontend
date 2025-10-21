import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

interface Review {
    id: number
    userName: string
    userAvatar: string
    rating: number
    date: string
    comment: string
    helpful: number
}

interface Warranty {
    duration: string
    coverage: string
    terms: string[]
}

interface ProductDetailsTabsProps {
    description: string
    category: string
    fileFormat: string
    fileSize: string
    includesCount: number
    compatibility: string[]
    warranty: Warranty
    rating: number
    reviewCount: number
    reviews: Review[]
}

export default function ProductDetailsTabs({
    description,
    category,
    fileFormat,
    fileSize,
    includesCount,
    compatibility,
    warranty,
    rating,
    reviewCount,
    reviews
}: ProductDetailsTabsProps) {
    return (
        <div className='mt-12'>
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="warranty">Warranty Policy</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews ({reviewCount})</TabsTrigger>
                </TabsList>

                {/* Description Tab */}
                <TabsContent value="description" className="mt-6">
                    <div className='border rounded-lg p-6'>
                        <h2 className='text-2xl font-bold mb-4'>Product Description</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            {description}
                        </p>
                        <div className='grid grid-cols-2 gap-4 mt-6'>
                            <div>
                                <h3 className='font-semibold mb-2'>Specifications</h3>
                                <ul className='space-y-2 text-sm text-muted-foreground'>
                                    <li><strong>Category:</strong> {category}</li>
                                    <li><strong>File Format:</strong> {fileFormat}</li>
                                    <li><strong>File Size:</strong> {fileSize}</li>
                                    <li><strong>Includes:</strong> {includesCount} presets</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className='font-semibold mb-2'>Compatibility</h3>
                                <ul className='space-y-2 text-sm text-muted-foreground'>
                                    {compatibility.map((item, index) => (
                                        <li key={index}>✓ {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Warranty Policy Tab */}
                <TabsContent value="warranty" className="mt-6">
                    <div className='border rounded-lg p-6'>
                        <h2 className='text-2xl font-bold mb-4'>Warranty Policy</h2>
                        <div className='space-y-4'>
                            <div className='flex items-start gap-3'>
                                <div className='text-3xl'>🛡️</div>
                                <div>
                                    <h3 className='font-semibold text-lg'>{warranty.duration} Money-Back Guarantee</h3>
                                    <p className='text-muted-foreground'>{warranty.coverage}</p>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <h4 className='font-semibold mb-2'>Terms & Conditions:</h4>
                                <ul className='space-y-2 text-sm text-muted-foreground'>
                                    {warranty.terms.map((term, index) => (
                                        <li key={index}>• {term}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6">
                    <div className='border rounded-lg p-6'>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='text-2xl font-bold'>Customer Reviews</h2>
                            <div className='flex items-center gap-2'>
                                <div className='flex text-yellow-500'>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className='text-lg'>
                                            {i < Math.floor(rating) ? '★' : '☆'}
                                        </span>
                                    ))}
                                </div>
                                <span className='font-semibold'>{rating} out of 5</span>
                            </div>
                        </div>

                        <div className='space-y-6'>
                            {reviews.map((review) => (
                                <div key={review.id} className='border-b pb-6 last:border-b-0'>
                                    <div className='flex items-start gap-4'>
                                        <Image
                                            src={review.userAvatar}
                                            alt={review.userName}
                                            width={48}
                                            height={48}
                                            className='rounded-full'
                                            unoptimized
                                        />
                                        <div className='flex-1'>
                                            <div className='flex items-center justify-between mb-2'>
                                                <h4 className='font-semibold'>{review.userName}</h4>
                                                <span className='text-sm text-muted-foreground'>{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <div className='flex text-yellow-500 mb-2'>
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className='text-sm'>
                                                        {i < review.rating ? '★' : '☆'}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className='text-muted-foreground mb-2'>{review.comment}</p>
                                            <button className='text-sm text-muted-foreground hover:text-foreground'>
                                                👍 Helpful ({review.helpful})
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
