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
import { Badge } from '@/components/ui/badge'
import { FilterSidebarProps } from '@/types/marketplace'
import { Filter, X, DollarSign, Star, Tag } from 'lucide-react'

const PRICE_RANGES = [
    { value: 'all', label: 'All Prices', icon: DollarSign },
    { value: 'under-50000', label: 'Under 50K ₫', shortLabel: '< 50K' },
    { value: '50000-200000', label: '50K - 200K ₫', shortLabel: '50-200K' },
    { value: '200000-500000', label: '200K - 500K ₫', shortLabel: '200-500K' },
    { value: 'over-500000', label: 'Over 500K ₫', shortLabel: '> 500K' },
]

const RATING_OPTIONS = [
    { value: 'all', label: 'All Ratings', icon: Star },
    { value: '4.5', label: '4.5+ ⭐', shortLabel: '4.5+' },
    { value: '4.0', label: '4.0+ ⭐', shortLabel: '4.0+' },
    { value: '3.5', label: '3.5+ ⭐', shortLabel: '3.5+' },
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

    const getActiveFiltersCount = () => {
        let count = 0
        if (filters.category !== 'all') count++
        if (filters.price !== 'all') count++
        if (filters.rating !== 'all') count++
        return count
    }

    const activeCount = getActiveFiltersCount()

    return (
        <div className="w-full sm:w-auto shrink-0">
            <Popover>
                <PopoverTrigger className='relative flex justify-center items-center gap-2 w-full sm:min-w-[120px] border-2 border-primary/20 bg-gradient-to-r from-primary to-primary/90 px-4 py-2.5 sm:py-3 rounded-lg hover:shadow-lg hover:scale-[1.02] active:scale-95 text-white transition-all duration-200 text-sm font-semibold h-10 sm:h-11'>
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                    {activeCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-600 text-[10px] rounded-full border-2 border-background">
                            {activeCount}
                        </Badge>
                    )}
                </PopoverTrigger>
                <PopoverContent className="p-4 sm:p-5 rounded-2xl shadow-xl border-2 border-primary/10 w-[calc(100vw-1.5rem)] sm:w-[340px] bg-card/95 backdrop-blur-sm" align="end" sideOffset={8}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm sm:text-base font-bold flex items-center gap-2">
                            <Filter className="w-4 h-4 text-primary" />
                            Filter Options
                        </h3>
                        {activeCount > 0 && (
                            <Badge variant="secondary" className="text-[10px] sm:text-xs">
                                {activeCount} active
                            </Badge>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
                                <Tag className="w-3.5 h-3.5 text-primary" />
                                Category
                            </label>
                            <Select
                                value={filters.category}
                                onValueChange={(value) => handleFilterChange('category', value)}
                            >
                                <SelectTrigger className="w-full h-9 sm:h-10 text-xs sm:text-sm border-2 focus:border-primary transition-colors rounded-lg">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg">
                                    <SelectItem value="all" className="text-xs sm:text-sm">All Categories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category} className="text-xs sm:text-sm">
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
                                <DollarSign className="w-3.5 h-3.5 text-primary" />
                                Price Range
                            </label>
                            <Select
                                value={filters.price}
                                onValueChange={(value) => handleFilterChange('price', value)}
                            >
                                <SelectTrigger className="w-full h-9 sm:h-10 text-xs sm:text-sm border-2 focus:border-primary transition-colors rounded-lg">
                                    <SelectValue placeholder="All Prices" />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg">
                                    {PRICE_RANGES.map((range) => (
                                        <SelectItem key={range.value} value={range.value} className="text-xs sm:text-sm">
                                            {range.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                Minimum Rating
                            </label>
                            <Select
                                value={filters.rating}
                                onValueChange={(value) => handleFilterChange('rating', value)}
                            >
                                <SelectTrigger className="w-full h-9 sm:h-10 text-xs sm:text-sm border-2 focus:border-primary transition-colors rounded-lg">
                                    <SelectValue placeholder="All Ratings" />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg">
                                    {RATING_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value} className="text-xs sm:text-sm">
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {resetFilter && (
                        <div className="mt-4 pt-4 border-t-2 border-border/50">
                            <Button
                                onClick={onResetFilter}
                                variant="outline"
                                className="w-full h-9 sm:h-10 text-xs sm:text-sm font-semibold border-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all rounded-lg group"
                            >
                                <X className="w-3.5 h-3.5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                                Clear All Filters
                            </Button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    )
}
