'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LoginRequiredDialog } from '@/components/ui/login-required-dialog'
import { ROUTES } from '@/constants/path'
import { cartApi } from '@/lib/apis/cartApi'
import { useCart } from '@/lib/hooks/useCartHooks'
import { useUserStore } from '@/stores/user-store'
import { CartItemData } from '@/types/cart'
import { MarketplaceDetail } from '@/types/marketplace'
import { CheckCircle2, ShoppingCart, Star } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

export default function ProductInfo({
    id,
    name,
    rating,
    reviewCount,
    price,
    originalPrice,
    features,
    author,
    isUserBought
}: MarketplaceDetail) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showLoginDialog, setShowLoginDialog] = useState(false)
    const { data: cartData, mutate: mutateCart } = useCart()


    const isInCart = useMemo(() => {
        if (!cartData?.items || !id) return false
        return cartData.items.some((item: CartItemData) => item.productId === id)
    }, [cartData?.items, id])

    const user = useUserStore(state => state.user)
    const router = useRouter()

    const handleAddToCart = async () => {
        if (!user) {
            // Nếu chưa login, hiển thị dialog yêu cầu login
            sessionStorage.setItem('tempCart', id)
            setShowLoginDialog(true)
            return
        }


        if (isInCart) {
            toast.info('This product is already in your cart')
            return
        }

        setIsSubmitting(true)
        try {
            const res = await cartApi.addItem({
                productId: id,
                quantity: 1
            })
            if (res) {
                toast.success('Product added successfully!')
                mutateCart()
            }
        } catch (error) {
            console.error('Error adding product:', error)
            toast.error('Failed to adding product. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='w-full lg:col-span-5 flex flex-col gap-4 sm:gap-6'>

            <h1 className='text-2xl sm:text-3xl font-bold'>{name}</h1>
            <Link href={ROUTES.PROFILE(author?.id)}>
                {author && (
                    <div className='flex items-center gap-2 sm:gap-3'>
                        <Avatar className='size-7 sm:size-8'>
                            <AvatarImage src={author?.avatar} alt={author?.name} />
                            <AvatarFallback>{author?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className='text-sm sm:text-base font-semibold hover:text-primary'>{author?.name}</p>
                        </div>
                    </div>
                )}
            </Link>
            {rating !== undefined && rating >= 1
                ?
                <div className='flex items-center gap-2'>
                    <div className='flex text-yellow-500'>
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className='w-4 h-4 sm:w-5 sm:h-5'
                                fill={i < Math.floor(rating || 0) ? 'currentColor' : 'none'}
                                stroke="currentColor"
                            />
                        ))}
                    </div>
                    <span className='text-sm sm:text-base font-medium'>{rating}</span>
                    <span className='text-sm sm:text-base text-muted-foreground'>({reviewCount} reviews)</span>
                </div>
                :
                <span className='text-sm sm:text-base text-muted-foreground italic'>( No reviews for this product yet )</span>
            }

            <div className='flex items-center gap-2 sm:gap-3'>
                <span className='text-2xl sm:text-3xl font-bold'>{price?.toLocaleString('vi-VN') || 0} ₫</span>
                {price != originalPrice && (
                    <span className='text-lg sm:text-xl text-muted-foreground line-through'>{originalPrice?.toLocaleString('vi-VN') || 0} ₫</span>
                )}
            </div>

            <div className='border-t pt-4 sm:pt-6'></div>

            {features && features.length > 0 &&
                <div className='mb-4'>
                    <label className='text-xs sm:text-sm font-medium mb-2 block'>Features:</label>
                    <div className='flex flex-wrap gap-2'>
                        {features?.map((feature, index) => (
                            <button
                                key={index}
                                className='px-3 sm:px-4 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm hover:bg-accent transition-colors'
                            >
                                {feature}
                            </button>
                        ))}
                    </div>
                </div>
            }

            {user && isInCart && (
                <div className='flex items-center gap-2 p-2.5 sm:p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg'>
                    <CheckCircle2 className='w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-500 shrink-0' />
                    <div className='flex-1 min-w-0'>
                        <p className='text-xs sm:text-sm font-medium text-green-900 dark:text-green-100'>Already in your cart</p>
                        <p className='text-[10px] sm:text-xs text-green-700 dark:text-green-300'>This preset is ready for checkout</p>
                    </div>
                    <Link href={ROUTES.CART}>
                        <Button variant='outline' size='sm' className='border-green-300 dark:border-green-700 text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3'>
                            View Cart
                        </Button>
                    </Link>
                </div>
            )}
            {user && isUserBought
                ?
                <div className='flex flex-col gap-2'>
                    <p className='text-muted-foreground text-sm italic'>You're already bought this product</p>
                    <div className='flex gap-2 sm:gap-3'>
                        <Button
                            onClick={() => {
                                router.push(ROUTES.PURCHASED_PRESETS)
                            }}
                            size={'lg'}
                            className='flex-1 bg-primary text-primary-foreground py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50'
                        >
                            Go to Purchased Presets
                        </Button>
                    </div>
                </div>
                :
                <div className='flex gap-2 sm:gap-3'>
                    <Button
                        onClick={handleAddToCart}
                        size={'lg'}
                        className='flex-1 bg-primary text-primary-foreground py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50'
                        disabled={isSubmitting || isInCart}
                    >
                        {isInCart ? (
                            <>
                                <CheckCircle2 className='w-4 h-4 sm:w-5 sm:h-5' />
                                In Cart
                            </>
                        ) : (
                            <>
                                <ShoppingCart className='w-4 h-4 sm:w-5 sm:h-5' />
                                {isSubmitting ? 'Adding...' : 'Add to Cart'}
                            </>
                        )}
                    </Button>
                </div>
            }

            <LoginRequiredDialog
                open={showLoginDialog}
                onOpenChange={setShowLoginDialog}
                title="Login Required"
                description="Product has been added to cart, please login to continue."
            />
        </div>
    )
}
