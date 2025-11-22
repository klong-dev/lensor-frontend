'use client'

import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FilterSidebarProps } from '@/types/marketplace'
import { Filter } from 'lucide-react'

const PRICE_RANGES = [
    { value: 'all', label: 'All Prices' },
    { value: 'under-50000', label: 'Under 50.000 ₫' },
    { value: '50000-200000', label: '50.000 - 200.000 ₫' },
    { value: '200000-500000', label: '200.000 - 500.000 ₫' },
    { value: 'over-500000', label: 'Over 500.000 ₫' },
]

const RATING_OPTIONS = [
    { value: 'all', label: 'All Ratings' },
    { value: '4.5', label: '4.5+ Stars' },
    { value: '4.0', label: '4.0+ Stars' },
    { value: '3.5', label: '3.5+ Stars' },
]

export default function FilterSidebar({
    filters,
    onFilterChange,
    resetFilter,
    onResetFilter,
    categories
}: FilterSidebarProps) {
    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        onFilterChange({ ...filters, [key]: value })
    }

    return (
        <div className="w-[10%] shrink-0">
            <Popover>
                <PopoverTrigger className='flex justify-center items-center gap-2 w-full border-1 border-accent bg-primary p-2 rounded-md hover:opacity-80 text-white transition-all'>
                    <Filter className="w-5 h-5" />
                    <p>Filters</p>
                </PopoverTrigger>
                <PopoverContent className="p-6 rounded-xl shadow-md border">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-muted-foreground">
                                Category
                            </label>
                            <Select
                                value={filters.category}
                                onValueChange={(value) => handleFilterChange('category', value)}
                            >
                                <SelectTrigger className="w-full h-11">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-muted-foreground">
                                Price Range
                            </label>
                            <Select
                                value={filters.price}
                                onValueChange={(value) => handleFilterChange('price', value)}
                            >
                                <SelectTrigger className="w-full h-11">
                                    <SelectValue placeholder="All Prices" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PRICE_RANGES.map((range) => (
                                        <SelectItem key={range.value} value={range.value}>
                                            {range.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-muted-foreground">
                                Rating
                            </label>
                            <Select
                                value={filters.rating}
                                onValueChange={(value) => handleFilterChange('rating', value)}
                            >
                                <SelectTrigger className="w-full h-11">
                                    <SelectValue placeholder="All Ratings" />
                                </SelectTrigger>
                                <SelectContent>
                                    {RATING_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {resetFilter && (
                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                onClick={onResetFilter}
                                variant="outline"
                                className="w-full"
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    )
}
