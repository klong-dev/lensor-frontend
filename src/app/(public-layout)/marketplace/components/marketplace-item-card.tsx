import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BASE_URL } from '@/constants';
import { ROUTES } from '@/constants/path';
import { useCart } from '@/lib/hooks/useCartHooks';
import { MarketplaceItem } from '@/types/marketplace';
import { CartItemData } from '@/types/cart';
import { Star, ShoppingCart, Ban } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';

export default function MarketplaceItemCard(item: MarketplaceItem) {
    const [imageError, setImageError] = useState(false);
    const [avatarError, setAvatarError] = useState(false);
    const router = useRouter();
    const { data: cartData } = useCart();

    // Check if this product is in cart
    const isInCart = useMemo(() => {
        if (!cartData?.items || !item?.id) return false;
        return cartData.items.some((cartItem: CartItemData) => cartItem.productId === item.id);
    }, [cartData?.items, item?.id]);

    const getImageSrc = () => {
        if (imageError) return '/images/default-fallback-image.png';
        if (!item?.thumbnail) return '/images/default-fallback-image.png';

        if (item?.thumbnail.startsWith('http')) {
            return item?.thumbnail;
        }
        return `${BASE_URL}${item?.thumbnail}`;
    };

    const getAvatarSrc = () => {
        if (avatarError) return undefined;
        if (!item?.author?.avatar) return undefined;

        if (item?.author.avatar.startsWith('http')) {
            return item?.author.avatar;
        }
        return `${BASE_URL}${item?.author.avatar}`;
    };

    if (!item?.id || !item?.title) {
        return null;
    }

    const handleCardClick = () => {
        if (item?.status !== 'active') {
            toast.error('This product is currently unavailable for purchase');
            return;
        }
        router.push(`/marketplace/${item?.id}`);
    };

    const handleProfileClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(ROUTES.PROFILE(item?.author?.id));
    };

    return (
        <div
            onClick={handleCardClick}
            className={`relative w-full aspect-square bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:opacity-80 transition-shadow h-min-[442px] h-full group ${item?.status === 'active' ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                }`}
        >

            {isInCart && (
                <Badge className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3 z-30 bg-green-600 hover:bg-green-700 text-white flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs">
                    <ShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span className="hidden xs:inline">In Cart</span>
                </Badge>
            )}

            <Image
                src={getImageSrc()}
                alt={item?.title || 'Product image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                loading='lazy'
                className="object-cover hover:opacity-90 transition-opacity"
                onError={() => {
                    if (!imageError) {
                        console.error(`Failed to load thumbnail for item ${item?.id}:`, item?.thumbnail);
                        setImageError(true);
                    }
                }}
                unoptimized={imageError}
            />

            <div className="p-2 sm:p-3 md:p-4 absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 transition duration-200 ease-in-out group-hover:opacity-0">
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-semibold mb-0.5 sm:mb-1 md:mb-2 truncate">{item?.title}</h3>
                <p className="text-sm sm:text-base md:text-lg text-white font-bold">{item?.price ? item.price.toLocaleString('vi-VN') : '0'} ₫</p>
            </div>

            <div className='absolute p-2 sm:p-3 md:p-4 inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent transition opacity-0 duration-200 ease-in-out group-hover:opacity-100'>
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-semibold mb-1 sm:mb-2 truncate hover:opacity-80">{item?.title}</h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-white/90 mb-2 sm:mb-3 md:mb-4 line-clamp-2">{item?.description}</p>

                {item?.author && (
                    <div
                        onClick={handleProfileClick}
                        className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mb-1.5 sm:mb-2 md:mb-3 cursor-pointer w-fit"
                    >
                        <Avatar className='size-5 sm:size-6 md:size-8'>
                            <AvatarImage
                                src={getAvatarSrc()}
                                alt={item?.author.name}
                                onError={() => {
                                    if (!avatarError) {
                                        setAvatarError(true);
                                    }
                                }}
                            />
                            <AvatarFallback className="bg-card text-[8px] sm:text-[10px] md:text-xs">
                                {item?.author.name?.charAt(0).toUpperCase() || '?'}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-[10px] sm:text-xs md:text-sm text-white hover:opacity-80 truncate max-w-[100px] sm:max-w-none">{item?.author.name}</span>
                    </div>
                )}

                <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <p className="text-[8px] sm:text-[10px] md:text-xs text-white/80">Price</p>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-bold truncate">{item?.price ? item.price.toLocaleString('vi-VN') : '0'} ₫</p>
                    </div>
                    {item?.rating !== null && item?.rating !== undefined && item?.rating >= 1 && (
                        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                            <Star fill="currentColor" stroke="currentColor" className="text-yellow-500 w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                            <span className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-semibold">{item?.rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
