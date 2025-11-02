import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BASE_URL } from '@/constants';
import { MarketplaceItem } from '@/types/marketplace';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MarketplaceItemCard(item: MarketplaceItem) {
    return (
        <Link href={`/marketplace/${item?.id}`}>
            <div className="relative w-full aspect-square bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:opacity-80 transition-shadow h-min-[442px] h-full group">
                <Image
                    src={`${BASE_URL}${item?.thumbnail}` || '/images/default-fallback-image.png'}
                    alt={item?.title}
                    fill
                    sizes="100%"
                    priority
                    className="object-cover hover:opacity-90 transition-opacity"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/default-fallback-image.png';
                    }}
                />
                <div className="p-4 absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/40 to-transparent opacity-100 transition duration-200 ease-in-out group-hover:opacity-0">
                    <h3 className="text-lg text-white font-semibold mb-2 truncate">{item?.title}</h3>
                    <p className="text-lg text-white font-bold">${item?.price}</p>
                </div>

                <div className='absolute p-4 inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black to-transparent transition opacity-0 duration-200 ease-in-out group-hover:opacity-100'>
                    <h3 className="text-lg text-white font-semibold mb-2 truncate">{item?.title}</h3>
                    <p className="text-sm text-white mb-4 line-clamp-2">{item?.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                        <Avatar className='size-8'>
                            <AvatarImage src={item?.author.avatar} alt={item?.author.name} />
                            <AvatarFallback className="bg-card text-xs">
                                {item?.author.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-white">{item?.author.name}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-white">Price</p>
                            <p className="text-lg text-white font-bold">${item?.price}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star fill="currentColor" stroke="currentColor" className="text-yellow-500 w-5 h-5" />
                            <span className="text-lg text-white font-semibold">{item?.rating}</span>
                        </div>
                    </div>
                </div>

            </div>

        </Link>
    );
}
