'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Star, MessageSquare } from 'lucide-react'
import { useCreateReview } from '@/lib/hooks/useMarketplaceHooks'
import { toast } from 'sonner'
import { ReviewFormProps } from '@/types/marketplace'

export default function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { createReview } = useCreateReview()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (rating === 0) {
            toast.error('Please select a rating')
            return
        }

        if (comment.trim().length === 0) {
            toast.error('Please write a comment')
            return
        }

        setIsSubmitting(true)

        try {
            await createReview(productId, {
                rating,
                comment: comment.trim()
            })

            toast.success('Review submitted successfully!')
            setRating(0)
            setComment('')
            onSuccess?.()
        } catch (error) {
            console.error('Failed to submit review:', error)
            toast.error('Failed to submit review. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

    return (
        <form onSubmit={handleSubmit} className='border rounded-lg overflow-hidden'>
            <div className='bg-gradient-to-r from-primary/5 to-primary/10 p-6 border-b'>
                <div className='flex items-center gap-2 mb-2'>
                    <MessageSquare className='w-5 h-5 text-primary' />
                    <h3 className='text-xl font-semibold'>Share Your Experience</h3>
                </div>
                <p className='text-sm text-muted-foreground'>
                    Help others make informed decisions by sharing your thoughts
                </p>
            </div>

            <div className='p-6 space-y-6'>
                <div className='space-y-3'>
                    <label className='text-sm font-medium block'>Rate this preset</label>
                    <div className='flex items-center gap-4'>
                        <div className='flex gap-2'>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type='button'
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className='transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded'
                                >
                                    <Star
                                        className={`w-10 h-10 transition-colors ${star <= (hoveredRating || rating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-muted'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        {(hoveredRating || rating) > 0 && (
                            <span className='text-sm font-medium text-primary animate-in fade-in slide-in-from-left-2'>
                                {ratingLabels[(hoveredRating || rating) - 1]}
                            </span>
                        )}
                    </div>
                </div>

                <div className='space-y-2'>
                    <label htmlFor='comment' className='text-sm font-medium block'>
                        Your Review
                    </label>
                    <Textarea
                        id='comment'
                        placeholder='Tell us what you think about this preset. What did you like? How did it perform? Any tips for others?'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className='min-h-[140px] resize-none'
                        disabled={isSubmitting}
                    />
                    <div className='flex items-center justify-between text-xs text-muted-foreground'>
                        <span>{comment.length} characters</span>
                        <span>Minimum 10 characters</span>
                    </div>
                </div>

                <Button
                    type='submit'
                    disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
                    className='w-full h-11 text-base font-medium'
                    size='lg'
                >
                    {isSubmitting ? (
                        <>
                            <span className='animate-pulse'>Submitting...</span>
                        </>
                    ) : (
                        'Submit Review'
                    )}
                </Button>
            </div>
        </form>
    )
}
