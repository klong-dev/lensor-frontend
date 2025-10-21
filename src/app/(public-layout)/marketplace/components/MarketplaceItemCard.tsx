import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface MarketplaceItem {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    userAvatar: string;
    userName: string;
    rating: number;
}

interface MarketplaceItemCardProps {
    item: MarketplaceItem;
}

export default function MarketplaceItemCard({ item }: MarketplaceItemCardProps) {
    return (
        <Link href={`/marketplace/${item.id}`}>

            <div className="relative w-full aspect-square bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:opacity-80 transition-shadow h-min-[442px] h-full">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="100%"
                    priority
                    className="object-cover hover:opacity-90 transition-opacity"
                />
                <div className="p-4 absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-lg font-semibold mb-2 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">Price</p>
                            <p className="text-lg font-bold">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star fill="yellow" stroke="none" color="yellow" />
                            <span className="text-lg font-semibold">{item.rating}</span>
                        </div>
                    </div>
                </div>
            </div>

        </Link>
    );
}
