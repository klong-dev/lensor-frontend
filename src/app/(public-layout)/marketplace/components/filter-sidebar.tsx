import React from 'react';
import { Card } from '@/components/ui/card';
import { Filter } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { FilterSidebarProps } from '@/types/marketplace';

export default function FilterSidebar({ searchInput, onSearchChange, searchQuery, resultsCount, filters, onFilterChange, resetFilter, onResetFilter }: FilterSidebarProps) {
    return (
        <div className="col-span-3 sticky top-20 self-start">
            <Card className="p-6 rounded-xl shadow-md border">
                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search presets..."
                        className="w-full text-sm p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />

                    {searchQuery && (
                        <div className="mt-4">
                            <p className='font-bold text-sm'>
                                Found <span className='text-purple-500'>{resultsCount}</span> result{resultsCount !== 1 ? 's' : ''} for &quot;<span className='text-purple-500'>{searchQuery}</span>&quot;
                            </p>
                            <div className='border-t border-gray-200 dark:border-gray-700 mt-3' />
                        </div>
                    )}
                </div>

                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filter By
                </h2>

                <div className="space-y-4">

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-muted-foreground">Compatibility</label>
                        <Select
                            value={filters.software}
                            onValueChange={(value) => onFilterChange({ ...filters, software: value })}>
                            <SelectTrigger className="w-full h-11">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="lightroom">Lightroom</SelectItem>
                                <SelectItem value="photoshop">Photoshop</SelectItem>
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

                {resetFilter &&
                    <Button
                        onClick={() => onResetFilter()}
                    >
                        Clear
                    </Button>}
                <Button>
                    <Filter className="w-5 h-5" />
                    Apply Filters
                </Button>
            </Card>
        </div>
    );
}
