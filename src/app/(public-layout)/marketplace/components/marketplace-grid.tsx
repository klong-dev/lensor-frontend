'use client'

import React, { useState } from 'react';
import MarketplaceItemCard from './marketplace-item-card';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

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
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 9
    const totalPage = Math.ceil(items.length / itemsPerPage)

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const handleNext = () => {
        if (currentPage < totalPage) setCurrentPage(currentPage + 1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    if (searchQuery && items.length === 0) {
        return (
            <div className='text-center py-10 text-muted-foreground'>
                <p className='text-lg mb-2'>No items found</p>
                <p>Try searching with different keywords</p>
            </div>
        );
    }

    //Cai nay de filter item moi trang
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentItems = items.slice(startIndex, endIndex)

    return (
        <div className='flex flex-col gap-8'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map(item => (
                    <MarketplaceItemCard key={item.id} item={item} />
                ))}
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={handlePrevious} />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            isActive={currentPage === 1}
                            onClick={() => handlePageChange(1)}
                        >
                            1
                        </PaginationLink>
                    </PaginationItem>

                    {currentPage > 3 && <PaginationEllipsis />}
                    
                    {Array.from({ length: totalPage }, (_, i) => i + 1)
                        .filter(
                            (page) =>
                                page !== 1 &&
                                page !== totalPage &&
                                page >= currentPage - 1 &&
                                page <= currentPage + 1
                        )
                        .map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                    
                    {currentPage < totalPage - 2 && <PaginationEllipsis />}
                    
                    {totalPage > 1 && (
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === totalPage}
                                onClick={() => handlePageChange(totalPage)}
                            >
                                {totalPage}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationNext href="#" onClick={handleNext} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
    );
}
