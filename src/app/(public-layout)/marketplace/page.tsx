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

const ITEMS_PER_PAGE = 12

const DEFAULT_FILTERS = {
    category: 'all',
    price: 'all',
    rating: 'all',
}

// Helper functions
const isValidItem = (item: MarketplaceItem) => {
    const hasValidThumbnail = item?.thumbnail?.trim() !== ''
    const hasValidImage = item?.image?.trim() !== ''
    const isActive = item?.status === 'active'
    return hasValidThumbnail && hasValidImage && isActive
}

const matchesPriceRange = (price: number, range: string) => {
    switch (range) {
        case 'under-50000': return price < 50000
        case '50000-200000': return price >= 50000 && price <= 200000
        case '200000-500000': return price > 200000 && price <= 500000
        case 'over-500000': return price > 500000
        default: return true
    }
}

const matchesFilters = (item: MarketplaceItem, searchQuery: string, filters: typeof DEFAULT_FILTERS) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch = !searchQuery ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)

    const matchesCategory = filters.category === 'all' || item.category === filters.category
    const matchesRating = filters.rating === 'all' || (item.rating !== undefined && item.rating >= parseFloat(filters.rating))
    const matchesPrice = matchesPriceRange(item.price, filters.price)

    return matchesSearch && matchesCategory && matchesPrice && matchesRating
}

const getUniqueCategories = (items: MarketplaceItem[]) =>
    Array.from(new Set(items.map(item => item.category)))

const isFiltersDefault = (searchInput: string, searchQuery: string, filters: typeof DEFAULT_FILTERS) =>
    !searchInput && !searchQuery &&
    filters.category === 'all' &&
    filters.price === 'all' &&
    filters.rating === 'all'

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [filters, setFilters] = useState(DEFAULT_FILTERS)
    const [currentPage, setCurrentPage] = useState(1)

    const { data: marketplaceItems, isLoading } = useMarketplace()

    // Process data
    const allItems = marketplaceItems?.data || []
    const validItems = allItems.filter(isValidItem)
    const categories = getUniqueCategories(allItems)
    const filteredItems = validItems.filter((item: MarketplaceItem) => matchesFilters(item, searchQuery, filters))

    // Pagination
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const isFilterActive = !isFiltersDefault(searchInput, searchQuery, filters)

    // Handlers
    const handleResetFilter = () => {
        setSearchInput('')
        setSearchQuery('')
        setFilters(DEFAULT_FILTERS)
    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    // Effects
    useEffect(() => {
        const timeout = setTimeout(() => setSearchQuery(searchInput), 500)
        return () => clearTimeout(timeout)
    }, [searchInput])

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
                            resetFilter={isFilterActive}
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
                            {paginatedItems.map((item: MarketplaceItem) => (
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
                                        handlePageChange(currentPage - 1)
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
                                .filter(page =>
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
                                        handlePageChange(currentPage + 1)
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
