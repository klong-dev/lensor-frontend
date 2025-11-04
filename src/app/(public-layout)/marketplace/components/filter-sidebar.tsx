'use client'

import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FilterSidebarProps } from '@/types/marketplace';
import { Filter } from 'lucide-react';

export default function FilterSidebar({filters, onFilterChange, resetFilter, onResetFilter, categories }: FilterSidebarProps) {
    return (
        <div className="w-[10%] shrink-0">
            <Popover>
                <PopoverTrigger className='w-full'>
                    <Button variant={'secondary'}className='w-full'>
                        <Filter className="w-5 h-5" />
                        Filters
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-6 rounded-xl shadow-md border">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-muted-foreground">Category</label>
                            <Select
                                value={filters.category}
                                onValueChange={(value) => onFilterChange({ ...filters, category: value })}>
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
                            <label className="block text-sm font-semibold mb-2 text-muted-foreground">Price Range</label>
                            <Select
                                value={filters.price}
                                onValueChange={(value) => onFilterChange({ ...filters, price: value })}
                            >
                                <SelectTrigger className="w-full h-11">
                                    <SelectValue placeholder="All Prices" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Prices</SelectItem>
                                    <SelectItem value="under-15">Under $15</SelectItem>
                                    <SelectItem value="15-25">$15 - $25</SelectItem>
                                    <SelectItem value="25-50">$25 - $50</SelectItem>
                                    <SelectItem value="over-50">Over $50</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-muted-foreground">Rating</label>
                            <Select
                                value={filters.rating}
                                onValueChange={(value) => onFilterChange({ ...filters, rating: value })}
                            >
                                <SelectTrigger className="w-full h-11">
                                    <SelectValue placeholder="All Ratings" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Ratings</SelectItem>
                                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {resetFilter && (
                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                onClick={() => onResetFilter()}
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
    );
}
