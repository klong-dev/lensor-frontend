import React from 'react';
import MarketplaceItemCard from './MarketplaceItemCard';

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

interface MarketplaceGridProps {
    items: MarketplaceItem[];
    searchQuery: string;
}

export default function MarketplaceGrid({ items, searchQuery }: MarketplaceGridProps) {
    if (searchQuery && items.length === 0) {
        return (
            <div className='text-center py-10 text-gray-400'>
                <p className='text-lg mb-2'>No items found</p>
                <p>Try searching with different keywords</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
                <MarketplaceItemCard key={item.id} item={item} />
            ))}
        </div>
    );
}
