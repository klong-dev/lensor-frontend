import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import { MarketplaceDetail } from '@/types/marketplace'
import { Star, Shield, ThumbsUp, Check } from 'lucide-react'

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
}: MarketplaceDetail) {
    return (
        <div className='mt-12'>
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="warranty">Warranty Policy</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews ({reviewCount || 0})</TabsTrigger>
                </TabsList>


                <TabsContent value="description" className="mt-6">
                    <div className='border rounded-lg p-6'>
                        <h2 className='text-2xl font-bold mb-4'>Product Description</h2>
                        <p className='text-muted-foreground leading-relaxed mb-4'>
                            {description || 'No description available'}
                        </p>
                        <div className='grid grid-cols-2 gap-4 mt-6'>
                            <div>
                                <h3 className='font-semibold mb-2'>Specifications</h3>
                                <ul className='space-y-2 text-sm text-muted-foreground'>
                                    <li><strong>Category:</strong> {category || 'N/A'}</li>
                                    <li><strong>File Format:</strong> {fileFormat || 'N/A'}</li>
                                    <li><strong>File Size:</strong> {fileSize || 'N/A'}</li>
                                    <li><strong>Includes:</strong> {includesCount || 0} presets</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className='font-semibold mb-2'>Compatibility</h3>
                                <ul className='space-y-2 text-sm text-muted-foreground'>
                                    {compatibility?.map((item, index) => (
                                        <li key={index} className='flex items-center gap-2'>
                                            <Check className='w-4 h-4' />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </TabsContent>


                <TabsContent value="warranty" className="mt-6">
                    <div className='border rounded-lg p-6'>
                        <h2 className='text-2xl font-bold mb-4'>Warranty Policy</h2>
                        <div className='space-y-4'>
                            <div className='flex items-start gap-3'>
                                <Shield className='w-8 h-8 text-primary' />
                                <div>
                                    <h3 className='font-semibold text-lg'>{warranty?.duration || 'N/A'} Money-Back Guarantee</h3>
                                    <p className='text-muted-foreground'>{warranty?.coverage || 'No coverage information available'}</p>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <h4 className='font-semibold mb-2'>Terms & Conditions:</h4>
                                <ul className='space-y-2 text-sm text-muted-foreground'>
                                    {warranty?.terms?.map((term, index) => (
                                        <li key={index}>• {term}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </TabsContent>


                <TabsContent value="reviews" className="mt-6">
                    <div className='border rounded-lg p-6'>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='text-2xl font-bold'>Customer Reviews</h2>
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
                                <span className='font-semibold'>{rating || 0} out of 5</span>
                            </div>
                        </div>

                        <div className='space-y-6'>
                            {reviews?.map((review) => (
                                <div key={review?.id} className='border-b pb-6 last:border-b-0'>
                                    <div className='flex items-start gap-4'>
                                        <Image
                                            src={review?.userAvatar || '/images/default_avatar.jpg'}
                                            alt={review?.userName || 'User'}
                                            width={48}
                                            height={48}
                                            className='rounded-full'
                                            unoptimized
                                        />
                                        <div className='flex-1'>
                                            <div className='flex items-center justify-between mb-2'>
                                                <h4 className='font-semibold'>{review?.userName || 'Anonymous'}</h4>
                                                <span className='text-sm text-muted-foreground'>{review?.createdAt ? new Date(review?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</span>
                                            </div>
                                            <div className='flex text-yellow-500 mb-2'>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className='w-4 h-4'
                                                        fill={i < (review?.rating || 0) ? 'currentColor' : 'none'}
                                                        stroke="currentColor"
                                                    />
                                                ))}
                                            </div>
                                            <p className='text-muted-foreground mb-2'>{review?.comment || 'No comment'}</p>
                                            <button className='text-sm text-muted-foreground hover:text-foreground flex items-center gap-1'>
                                                <ThumbsUp className='w-4 h-4' />
                                                Helpful ({review?.helpful || 0})
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
