import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MarketplaceDetail } from '@/types/marketplace'
import { Check, Shield, Star, Tag, User } from 'lucide-react'
import React from 'react'
import ReviewForm from './review-form'

export default function ProductDetailsTabs({
    id,
    description,
    category,
    fileFormat,
    fileSize,
    includesCount,
    compatibility,
    warranty,
    rating,
    reviewCount,
    reviews,
    specifications,
    tags,
    onReviewSuccess,
    isUserBought,
    isUserReviewed
}: MarketplaceDetail & { onReviewSuccess?: () => void }) {
    return (
        <div className='mt-8 sm:mt-12'>
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto">
                    <TabsTrigger value="description" className="text-xs sm:text-sm">Description</TabsTrigger>
                    <TabsTrigger value="warranty" className="text-xs sm:text-sm whitespace-nowrap">Warranty Policy</TabsTrigger>
                    <TabsTrigger value="reviews" className="text-xs sm:text-sm">Reviews ({reviewCount || 0})</TabsTrigger>
                </TabsList>


                <TabsContent value="description" className="mt-4 sm:mt-6">
                    <div className='border rounded-lg p-4 sm:p-6'>
                        <h2 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>Product Description</h2>
                        <p className='text-sm sm:text-base text-muted-foreground leading-relaxed mb-4'>
                            {description || 'No description available'}
                        </p>

                        {tags && tags?.length > 0 && (
                            <div className='mb-4 sm:mb-6'>
                                <h3 className='text-sm sm:text-base font-semibold mb-2 sm:mb-3 flex items-center gap-2'>
                                    <Tag className='w-3 h-3 sm:w-4 sm:h-4' />
                                    Tags
                                </h3>
                                <div className='flex flex-wrap gap-2'>
                                    {tags?.map((tag, index) => (
                                        <span
                                            key={index}
                                            className='px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm'
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6'>
                            <div>
                                <h3 className='text-sm sm:text-base font-semibold mb-2 sm:mb-3'>Product Information</h3>
                                <ul className='space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground'>
                                    <li><strong>Category:</strong> {category || 'N/A'}</li>
                                    <li><strong>File Format:</strong> {fileFormat || 'N/A'}</li>
                                    <li><strong>File Size:</strong> {fileSize || 'N/A'}</li>
                                    <li><strong>Includes:</strong> {includesCount || 0} presets</li>
                                </ul>
                            </div>
                            {compatibility !== undefined && compatibility?.length >= 1 &&
                                <div>
                                    <h3 className='text-sm sm:text-base font-semibold mb-2 sm:mb-3'>Compatibility</h3>
                                    <ul className='space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground'>
                                        {compatibility?.map((item, index) => (
                                            <li key={index} className='flex items-center gap-1.5 sm:gap-2'>
                                                <Check className='w-3 h-3 sm:w-4 sm:h-4 text-green-500 shrink-0' />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        </div>

                        {((specifications?.adjustments?.length ?? 0) > 0 ||
                            (specifications?.bestFor?.length ?? 0) > 0 ||
                            !!specifications?.difficulty) && (
                                <div className='mt-4 sm:mt-6 pt-4 sm:pt-6 border-t'>
                                    <h3 className='text-sm sm:text-base font-semibold mb-3 sm:mb-4'>Technical Specifications</h3>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                                        {specifications?.adjustments && specifications?.adjustments?.length > 0 && (
                                            <div>
                                                <h4 className='text-xs sm:text-sm font-medium mb-1.5 sm:mb-2'>Adjustments Included:</h4>
                                                <ul className='space-y-1 text-xs sm:text-sm text-muted-foreground'>
                                                    {specifications?.adjustments?.map((adjustment, index) => (
                                                        <li key={index} className='flex items-center gap-1.5 sm:gap-2'>
                                                            <Check className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500 shrink-0' />
                                                            {adjustment}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {specifications?.bestFor && specifications?.bestFor?.length > 0 && (
                                            <div>
                                                <h4 className='text-xs sm:text-sm font-medium mb-1.5 sm:mb-2'>Best For:</h4>
                                                <ul className='space-y-1 text-xs sm:text-sm text-muted-foreground'>
                                                    {specifications?.bestFor?.map((type, index) => (
                                                        <li key={index} className='flex items-center gap-1.5 sm:gap-2'>
                                                            <Check className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500 shrink-0' />
                                                            {type}
                                                        </li>
                                                    ))}
                                                </ul>
                                                {specifications?.difficulty && (
                                                    <div className='mt-2 sm:mt-3'>
                                                        <span className='text-xs sm:text-sm'><strong>Difficulty:</strong> {specifications?.difficulty}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>
                </TabsContent>


                <TabsContent value="warranty" className="mt-4 sm:mt-6">
                    <div className='border rounded-lg p-4 sm:p-6'>
                        <h2 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>Warranty Policy</h2>
                        <div className='space-y-3 sm:space-y-4'>
                            <div className='flex items-start gap-2 sm:gap-3'>
                                <Shield className='w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0' />
                                <div>
                                    <h3 className='text-base sm:text-lg font-semibold'>{warranty?.duration || 'N/A'} Money-Back Guarantee</h3>
                                    <p className='text-sm sm:text-base text-muted-foreground'>Free update</p>
                                </div>
                            </div>
                            <div className='mt-3 sm:mt-4'>
                                <h4 className='text-sm sm:text-base font-semibold mb-1.5 sm:mb-2'>Terms & Conditions:</h4>
                                <ul className='space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground'>
                                    <li>• 3-day money back guarantee</li>
                                    <li>• Compatible with future Lightroom versions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </TabsContent>


                <TabsContent value="reviews" className="mt-4 sm:mt-6">
                    <div className='space-y-4 sm:space-y-6'>
                        <div className='border rounded-lg p-4 sm:p-6 bg-gradient-to-br from-background to-muted/20'>
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Customer Reviews</h2>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6'>
                                <div className='flex flex-col items-center justify-center p-4 sm:p-6 bg-background rounded-lg border'>
                                    {rating && rating > 0 ? (
                                        <>
                                            <div className='text-4xl sm:text-5xl font-bold mb-2'>{rating.toFixed(1)}</div>
                                            <div className="flex text-yellow-500 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                                        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                                                        stroke="currentColor"
                                                    />
                                                ))}
                                            </div>
                                            <p className='text-xs sm:text-sm text-muted-foreground'>{reviewCount || 0} {reviewCount === 1 ? 'review' : 'reviews'}</p>
                                        </>
                                    ) : (
                                        <>
                                            <Star className="w-16 h-16 text-muted-foreground/20 mb-2" stroke="currentColor" />
                                            <p className='text-sm text-muted-foreground text-center'>No reviews yet</p>
                                        </>
                                    )}
                                </div>

                                <div className='md:col-span-2 space-y-2 sm:space-y-3'>
                                    {[5, 4, 3, 2, 1].map((star) => {
                                        const count = reviews?.filter(r => r.rating === star).length || 0
                                        const percentage = (reviewCount || 0) > 0 ? (count / (reviewCount || 1)) * 100 : 0

                                        return (
                                            <div key={star} className='flex items-center gap-2 sm:gap-3'>
                                                <div className='flex items-center gap-1 w-14 sm:w-20'>
                                                    <span className='text-xs sm:text-sm font-medium'>{star}</span>
                                                    <Star className='w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500' />
                                                </div>
                                                <div className='flex-1 h-2 bg-muted rounded-full overflow-hidden'>
                                                    <div
                                                        className='h-full bg-yellow-500 transition-all duration-300'
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                                <span className='text-xs sm:text-sm text-muted-foreground w-8 sm:w-12 text-right'>{count}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {isUserBought && !isUserReviewed &&
                            <ReviewForm productId={id} onSuccess={onReviewSuccess} />
                        }

                        <div className='border rounded-lg p-4 sm:p-6'>
                            <h3 className='text-lg sm:text-xl font-semibold mb-4 sm:mb-6'>All Reviews ({reviewCount || 0})</h3>

                            {reviews && reviews?.length > 0 ? (
                                <div className='space-y-4 sm:space-y-6'>
                                    {reviews?.map((review, index) => (
                                        <React.Fragment key={review?.id}>
                                            <div className='flex items-start gap-3 sm:gap-4'>
                                                <Avatar className='w-10 h-10 sm:w-12 sm:h-12 shrink-0'>
                                                    <AvatarImage
                                                        src={review?.userAvatar || '/images/default_avatar.jpg'}
                                                        alt={review?.userName || 'User'}
                                                    />
                                                    <AvatarFallback>
                                                        <User className='w-5 h-5 sm:w-6 sm:h-6' />
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div className='flex-1 space-y-2 sm:space-y-3 min-w-0'>
                                                    <div className='flex items-start justify-between gap-3 sm:gap-4'>
                                                        <div className='min-w-0'>
                                                            <div className='flex items-center gap-2 mb-1'>
                                                                <h4 className='text-sm sm:text-base font-semibold truncate'>{review?.userName || 'Anonymous'}</h4>
                                                                {/* <Badge variant='outline' className='text-xs'>Verified Purchase</Badge> */}
                                                            </div>
                                                            <div className='flex items-center gap-2 sm:gap-3'>
                                                                <div className='flex text-yellow-500'>
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className='w-3 h-3 sm:w-4 sm:h-4'
                                                                            fill={i < (review?.rating || 0) ? 'currentColor' : 'none'}
                                                                            stroke="currentColor"
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span className='text-xs sm:text-sm text-muted-foreground'>
                                                                    {review?.date ? new Date(review?.date).toLocaleDateString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'short',
                                                                        day: 'numeric'
                                                                    }) : 'N/A'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed break-words'>
                                                        {review?.comment || 'No comment provided'}
                                                    </p>
                                                </div>
                                            </div>
                                            {index < reviews?.length - 1 && <Separator className='my-4 sm:my-6' />}
                                        </React.Fragment>
                                    ))}
                                </div>
                            ) : (
                                <div className='flex flex-col items-center justify-center py-8 sm:py-12 text-center px-4'>
                                    <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted flex items-center justify-center mb-3 sm:mb-4'>
                                        <Star className='w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground/50' />
                                    </div>
                                    <h4 className='text-base sm:text-lg font-semibold mb-1.5 sm:mb-2'>No reviews yet</h4>
                                    <p className='text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4'>Be the first to share your experience with this preset!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
