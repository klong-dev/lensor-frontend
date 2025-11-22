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

            <div className="container mx-auto py-2 sm:py-3 px-2 sm:px-4 md:px-6">
                <Breadcrumb className="mb-2 sm:mb-3 md:mb-4">
                    <BreadcrumbList className="text-[10px] sm:text-xs md:text-sm">
                        <BreadcrumbItem>
                            <BreadcrumbLink href={ROUTES.HOME} className="hover:text-primary">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="mx-1 sm:mx-2" />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={ROUTES.MARKETPLACE} className="hover:text-primary">Marketplace</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-10 mt-1 sm:mt-2 md:mt-3 border-b pb-3 sm:pb-4">
                    <h1 className='font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase mb-1 leading-tight'>
                        Your <span className='text-primary'>Marketplace</span>
                        <span className="hidden sm:inline"> for Creativity</span>
                    </h1>
                    <p className='mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-muted-foreground text-[10px] sm:text-xs md:text-sm leading-relaxed'>Buy, sell & showcase stunning photos & presets</p>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4 lg:mb-6 items-stretch">
                        <div className="flex-1">
                            <div className="relative">
                                <Input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Search products, presets..."
                                    className="w-full focus:ring-2 focus:ring-primary transition-all text-xs sm:text-sm h-10 sm:h-11 pl-4 pr-4 border-2 rounded-lg"
                                />
                            </div>

                            {searchQuery && (
                                <div className="mt-2 sm:mt-3">
                                    <p className='font-bold text-[10px] sm:text-xs md:text-sm'>
                                        Found <span className='text-purple-500'>{filteredItems?.length}</span> result{filteredItems?.length !== 1 ? 's' : ''} for &quot;<span className='text-purple-500 truncate inline-block max-w-[100px] sm:max-w-none'>{searchQuery}</span>&quot;
                                    </p>
                                    <div className='border-t border-gray-200 dark:border-gray-700 mt-1.5 sm:mt-2' />
                                </div>
                            )}
                        </div>

                        <div className="sm:w-auto shrink-0">
                            <FilterSidebar
                                filters={filters}
                                onFilterChange={setFilters}
                                resetFilter={isFilterActive}
                                onResetFilter={handleResetFilter}
                                categories={categories}
                            />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 pb-3 sm:pb-4 md:pb-6'>
                    {isLoading ?
                        <MarketplaceSkeleton />
                        :

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6">
                            {paginatedItems.map((item: MarketplaceItem) => (
                                <MarketplaceItemCard {...item} key={item.id} />
                            ))}
                        </div>
                    }
                    <Pagination className="mt-2 sm:mt-4">
                        <PaginationContent className="gap-1 sm:gap-2">
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handlePageChange(currentPage - 1)
                                    }}
                                    className="h-8 sm:h-9 px-2 sm:px-4 text-xs sm:text-sm"
                                />
                            </PaginationItem>

                            {/* Desktop: Show full pagination */}
                            <PaginationItem className="hidden md:block">
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
                                <PaginationItem className="hidden md:block">
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
                                    <PaginationItem key={page} className="hidden md:block">
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
                                <PaginationItem className="hidden md:block">
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {totalPages > 1 && (
                                <PaginationItem className="hidden md:block">
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

                            {/* Mobile: Show current page only */}
                            <PaginationItem className="md:hidden">
                                <span className="flex h-8 items-center justify-center px-3 text-xs font-medium">
                                    {currentPage} / {totalPages}
                                </span>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handlePageChange(currentPage + 1)
                                    }}
                                    className="h-8 sm:h-9 px-2 sm:px-4 text-xs sm:text-sm"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div >
            </div>
        </div>
    );
}
