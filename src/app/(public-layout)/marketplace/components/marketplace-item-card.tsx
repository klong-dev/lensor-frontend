import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MarketplaceItem {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    author: {
        name: string;
        avatar: string;
    };
    rating: number;
}

interface MarketplaceItemCardProps {
    item: MarketplaceItem;
}

export default function MarketplaceItemCard({ item }: MarketplaceItemCardProps) {
    return (
        <Link href={`/marketplace/${item.id}`}>

            <div className="relative w-full aspect-square bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:opacity-80 transition-shadow h-min-[442px] h-full group">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="100%"
                    priority
                    className="object-cover hover:opacity-90 transition-opacity"
                />
                <div className="p-4 absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black to-transparent transition-transform transform translate-y-0 duration-500 group-hover:translate-y-full">
                    <h3 className="text-lg text-white font-semibold mb-2 truncate">{item.title}</h3>
                    <p className="text-sm text-white mb-4 line-clamp-2">{item.description}</p>
                </div>

                <div className='absolute p-4 inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black to-transparent transition-transform transform translate-y-full duration-500 group-hover:translate-y-0'>
                    <h3 className="text-lg text-white font-semibold mb-2 truncate">{item.title}</h3>
                    <p className="text-sm text-white mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                        <Avatar className='size-8'>
                            <AvatarImage src={item.author.avatar} alt={item.author.name} />
                            <AvatarFallback className="bg-gray-700 text-white text-xs">
                                {item.author.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-white">{item.author.name}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted">Price</p>
                            <p className="text-lg text-white font-bold">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star fill="yellow" stroke="none" color="yellow" />
                            <span className="text-lg text-white font-semibold">{item.rating}</span>
                        </div>
                    </div>
                </div>

            </div>

        </Link>
    );
}
