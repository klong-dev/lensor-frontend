'use client'

import MarketplaceSkeleton from "@/components/marketplace/marketplace-skeleton";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ROUTES } from '@/constants/path';
import { useMarketplace } from '@/lib/hooks/useMarketplaceHooks';
import { MarketplaceItem } from "@/types/marketplace";
import { useEffect, useState } from 'react';
import FilterSidebar from './components/filter-sidebar';
import MarketplaceItemCard from "./components/marketplace-item-card";

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [filters, setFilters] = useState({
        category: 'all',
        price: 'all',
        rating: 'all',
    });
    const [resetFilter, setResetFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 12

    const { data: marketplaceItems, isLoading } = useMarketplace()

    const categories: string[] = marketplaceItems?.data
        ? Array.from(new Set(marketplaceItems.data.map((item: MarketplaceItem) => item.category)))
        : [];

    const validItems = marketplaceItems?.data?.filter((item: MarketplaceItem) => {
        const hasValidThumbnail = item?.thumbnail &&
            typeof item.thumbnail === 'string' &&
            item.thumbnail.trim() !== '';

        const hasValidImage = item?.image &&
            typeof item.image === 'string' &&
            item.image.trim() !== '';

        const isActive = item?.status === 'active';

        return hasValidThumbnail && hasValidImage && isActive;
    }) || []


    const filteredItems = validItems?.filter((item: MarketplaceItem) => {
        const query = searchQuery.toLowerCase();

        const matchesSearch =
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query);

        const matchesCategory = filters.category === 'all' || item.category === filters.category;

        const matchesRating = filters.rating === 'all' || (item.rating !== undefined && item.rating >= parseFloat(filters.rating));

        const priceValue = item.price
        let matchesPrice = true;
        if (filters.price === 'under-50000') matchesPrice = priceValue < 50000;
        else if (filters.price === '50000-200000') matchesPrice = priceValue >= 50000 && priceValue <= 200000;
        else if (filters.price === '200000-500000') matchesPrice = priceValue > 200000 && priceValue <= 500000;
        else if (filters.price === 'over-500000') matchesPrice = priceValue > 500000;
        return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });


    const totalPages = Math.ceil(filteredItems.length / itemPerPage)
    const startIndex = (currentPage - 1) * itemPerPage
    const endIndex = startIndex + itemPerPage
    const paginationItems = filteredItems.slice(startIndex, endIndex)


    const handleResetFilter = () => {
        if (resetFilter) {
            setSearchInput('')
            setSearchQuery('')
            setFilters({
                category: 'all',
                price: 'all',
                rating: 'all'
            })
        }
        setResetFilter(false)
    }

    useEffect(() => {
        const isDefault =
            searchInput === '' &&
            searchQuery === '' &&
            filters.category === 'all' &&
            filters.price === 'all' &&
            filters.rating === 'all';

        setResetFilter(!isDefault);
    }, [filters, searchInput, searchQuery])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchQuery(searchInput);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchInput]);

    useEffect(() => {
        setCurrentPage(1)
    }, [filters, searchQuery])

    return (
        <div className="min-h-screen">

            <div className="container mx-auto py-3">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={ROUTES.HOME}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={ROUTES.MARKETPLACE}>Marketplace</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="mb-10 mt-3 border-b-1">
                    <h1 className='font-extrabold text-3xl uppercase mb-2'>
                        Your <span className='text-primary'>Marketplace</span> for Creativity
                    </h1>
                    <p className='mb-6 text-muted-foreground text-sm'>Buy, sell, and showcase stunning photos & professional presets in one place</p>

                    <div className="flex gap-2 mb-6 justify-between items-center">
                        <div className="w-[90%]">
                            <Input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search presets..."
                                className="w-full focus:ring-2 focus:ring-purple-500 transition-all"
                            />

                            {searchQuery && (
                                <div className="mt-4">
                                    <p className='font-bold text-sm'>
                                        Found <span className='text-purple-500'>{filteredItems?.length}</span> result{filteredItems?.length !== 1 ? 's' : ''} for &quot;<span className='text-purple-500'>{searchQuery}</span>&quot;
                                    </p>
                                    <div className='border-t border-gray-200 dark:border-gray-700 mt-3' />
                                </div>
                            )}
                        </div>

                        <FilterSidebar
                            filters={filters}
                            onFilterChange={setFilters}
                            resetFilter={resetFilter}
                            onResetFilter={handleResetFilter}
                            categories={categories}
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-8'>
                    {isLoading ?
                        <MarketplaceSkeleton />
                        :

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {paginationItems?.map((item: MarketplaceItem) => (
                                <MarketplaceItemCard {...item} key={item.id} />
                            ))}
                        </div>
                    }
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                                    }}
                                />
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === 1}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setCurrentPage(1)
                                    }}
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>

                            {currentPage > 3 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(
                                    (page) =>
                                        page !== 1 &&
                                        page !== totalPages &&
                                        page >= currentPage - 1 &&
                                        page <= currentPage + 1
                                )
                                .map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            isActive={page === currentPage}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setCurrentPage(page)
                                            }}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                            {currentPage < totalPages - 2 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {totalPages > 1 && (
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === totalPages}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setCurrentPage(totalPages)
                                        }}
                                    >
                                        {totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div >
            </div>
        </div>
    );
}
