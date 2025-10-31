'use client'

import React, { useEffect, useState } from 'react';
import MarketplaceHeader from './components/marketplace-header';
import FilterSidebar from './components/filter-sidebar';
import MarketplaceGrid from './components/marketplace-grid';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ROUTES } from '@/constants/path';
import { MarketplaceItem } from '@/types/marketplace';

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [filters, setFilters] = useState({
        software: 'all',
        price: 'all',
        rating: 'all',
    });
    const [resetFilter, setResetFilter] = useState(false)

    const marketplaceItems: MarketplaceItem[] = [
        {
            id: 1,
            title: "Urban Photography Preset",
            description: "Professional preset pack for urban street photography with moody tones.",
            price: 15.99,
            imagePairs: [
                {
                    before: "https://i.pinimg.com/1200x/3e/d5/5b/3ed55b7a8edad9e811900cd55ca50f05.jpg",
                    after: "https://i.pinimg.com/1200x/3e/d5/5b/3ed55b7a8edad9e811900cd55ca50f05.jpg",
                },
            ],
            author: {
                name: "Alex Chen",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            rating: 3.8,
            software: "lightroom",
            presetFile: {
                url: "/presets/urban-photography.xmp",
                fileName: "urban-photography.xmp",
                format: "XMP",
                fileSize: 18000,
            },
        },
        {
            id: 2,
            title: "Nature Portrait Collection",
            description: "Beautiful nature portraits with natural lighting and vibrant colors.",
            price: 24.99,
            imagePairs: [
                {
                    before: "https://i.pinimg.com/1200x/d9/b2/97/d9b29715b473dd0a5b37e1bc9929907b.jpg",
                    after: "https://i.pinimg.com/1200x/d9/b2/97/d9b29715b473dd0a5b37e1bc9929907b.jpg",
                },
            ],
            author: {
                name: "Sarah Martinez",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            rating: 4.9,
            software: "lightroom",
            presetFile: {
                url: "/presets/nature-portrait.dng",
                fileName: "nature-portrait.dng",
                format: "DNG",
                fileSize: 24500,
            },
        },
        {
            id: 3,
            title: "Vintage Film Presets",
            description: "Classic film look presets for that authentic vintage aesthetic.",
            price: 12.99,
            imagePairs: [
                {
                    before: "https://i.pinimg.com/736x/3f/93/c6/3f93c61810a9a68442366031087841a9.jpg",
                    after: "https://i.pinimg.com/736x/3f/93/c6/3f93c61810a9a68442366031087841a9.jpg",
                },
            ],
            author: {
                name: "Mike Johnson",
                avatar: "https://randomuser.me/api/portraits/men/65.jpg",
            },
            rating: 4.7,
            software: "lightroom",
            presetFile: {
                url: "/presets/vintage-film.xmp",
                fileName: "vintage-film.xmp",
                format: "XMP",
                fileSize: 16300,
            },
        },
        {
            id: 4,
            title: "Happy Robot 032",
            description: "Cute robot character for digital art projects.",
            price: 300.0,
            imagePairs: [
                {
                    before: "https://i.pinimg.com/1200x/7d/66/04/7d6604111a2fb44b73a4bc8b643e479d.jpg",
                    after: "https://i.pinimg.com/1200x/7d/66/04/7d6604111a2fb44b73a4bc8b643e479d.jpg",
                },
            ],
            author: {
                name: "BeKind2Robots",
                avatar: "https://randomuser.me/api/portraits/men/12.jpg",
            },
            rating: 4.6,
            software: "photoshop",
            presetFile: {
                url: "/presets/happy-robot.atn",
                fileName: "happy-robot.atn",
                format: "ATN",
                fileSize: 32000,
            },
        },
        {
            id: 5,
            title: "Cinematic LUT Pack",
            description: "Transform your videos with cinematic LUTs for professional-grade color grading.",
            price: 19.99,
            imagePairs: [
                {
                    before: "https://i.pinimg.com/1200x/95/5b/43/955b437d7a0a91f60b944abf6a99a544.jpg",
                    after: "https://i.pinimg.com/1200x/95/5b/43/955b437d7a0a91f60b944abf6a99a544.jpg",
                },
            ],
            author: {
                name: "Emma Watson",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            },
            rating: 4.9,
            software: "photoshop",
            presetFile: {
                url: "/presets/cinematic-lut.cube",
                fileName: "cinematic-lut.cube",
                format: "CUBE",
                fileSize: 28000,
            },
        },
        {
            id: 6,
            title: "Abstract 3D Models",
            description: "Pack of 10 abstract 3D models perfect for motion design and concept art.",
            price: 45.0,
            imagePairs: [
                {
                    before: "https://i.pinimg.com/1200x/b4/fe/42/b4fe428c83502f66bbd2af43ae20b1dc.jpg",
                    after: "https://i.pinimg.com/1200x/b4/fe/42/b4fe428c83502f66bbd2af43ae20b1dc.jpg",
                },
            ],
            author: {
                name: "David Kim",
                avatar: "https://randomuser.me/api/portraits/men/23.jpg",
            },
            rating: 4.8,
            software: "photoshop",
            presetFile: {
                url: "/presets/abstract-3d.obj",
                fileName: "abstract-3d.obj",
                format: "OBJ",
                fileSize: 120000,
            },
        },
        {
            id: 7,
            title: "Moody Landscape Presets",
            description: "Dark and dramatic tones for stunning landscape photography.",
            price: 45.0,
            imagePairs: [
                {
                    before: "https://i.pinimg.com/736x/fd/ac/3c/fdac3cc7c47d3fa7a0df6bce7be249eb.jpg",
                    after: "https://i.pinimg.com/736x/fd/ac/3c/fdac3cc7c47d3fa7a0df6bce7be249eb.jpg",
                },
            ],
            author: {
                name: "Liam Brown",
                avatar: "https://randomuser.me/api/portraits/men/41.jpg",
            },
            rating: 4.7,
            software: "lightroom",
            presetFile: {
                url: "/presets/moody-landscape.xmp",
                fileName: "moody-landscape.xmp",
                format: "XMP",
                fileSize: 19000,
            },
        },
        {
            id: 8,
            title: "Minimal Portrait Pack",
            description: "Clean and soft presets for minimalistic portrait photography.",
            price: 21.0,
            imagePairs: [
                {
                    before: "https://i.pinimg.com/736x/f7/80/44/f780449c1d678dcc7474cb20fb075ff8.jpg",
                    after: "https://i.pinimg.com/736x/f7/80/44/f780449c1d678dcc7474cb20fb075ff8.jpg",
                },
            ],
            author: {
                name: "Sophia Lee",
                avatar: "https://randomuser.me/api/portraits/women/55.jpg",
            },
            rating: 4.8,
            software: "lightroom",
            presetFile: {
                url: "/presets/minimal-portrait.xmp",
                fileName: "minimal-portrait.xmp",
                format: "XMP",
                fileSize: 17600,
            },
        },
        {
            id: 9,
            title: "Golden Hour Magic",
            description: "Warm presets to enhance golden hour and sunset photos.",
            price: 18.5,
            imagePairs: [
                {
                    before: "https://i.pinimg.com/1200x/29/fd/cc/29fdccf1df70d964d1b1be7ef163b594.jpg",
                    after: "https://i.pinimg.com/1200x/29/fd/cc/29fdccf1df70d964d1b1be7ef163b594.jpg",
                },
            ],
            author: {
                name: "Olivia Green",
                avatar: "https://randomuser.me/api/portraits/women/33.jpg",
            },
            rating: 4.9,
            software: "lightroom",
            presetFile: {
                url: "/presets/golden-hour.xmp",
                fileName: "golden-hour.xmp",
                format: "XMP",
                fileSize: 21000,
            },
        },
        {
            id: 10,
            title: "Black & White Mastery",
            description: "High-contrast black and white presets for timeless photography.",
            price: 14.0,
            imagePairs: [
                {
                    before: "https://i.pinimg.com/1200x/da/01/9c/da019c2984b8381140b07c17ca3fb353.jpg",
                    after: "https://i.pinimg.com/1200x/da/01/9c/da019c2984b8381140b07c17ca3fb353.jpg",
                },
            ],
            author: {
                name: "Ethan White",
                avatar: "https://randomuser.me/api/portraits/men/77.jpg",
            },
            rating: 4.6,
            software: "lightroom",
            presetFile: {
                url: "/presets/black-white-mastery.xmp",
                fileName: "black-white-mastery.xmp",
                format: "XMP",
                fileSize: 15000,
            },
        },
        {
            id: 11,
            title: "Travel Explorer Presets",
            description: "Vibrant presets perfect for travel bloggers and explorers.",
            price: 22.0,
            imagePairs: [
                {
                    before: "https://i.pinimg.com/736x/39/b3/be/39b3be05e8e691e67032df91f831225e.jpg",
                    after: "https://i.pinimg.com/736x/39/b3/be/39b3be05e8e691e67032df91f831225e.jpg",
                },
            ],
            author: {
                name: "Isabella Cruz",
                avatar: "https://randomuser.me/api/portraits/women/21.jpg",
            },
            rating: 4.8,
            software: "photoshop",
            presetFile: {
                url: "/presets/travel-explorer.atn",
                fileName: "travel-explorer.atn",
                format: "ATN",
                fileSize: 27000,
            },
        },
    ];


    const filteredItems = marketplaceItems.filter(item => {
        const query = searchQuery.toLowerCase();

        const matchesSearch =
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query);

        const matchesSoftware =
            filters.software === 'all' || item.software === filters.software;

        const matchesRating =
            filters.rating === 'all' || (item.rating !== undefined && item.rating >= parseFloat(filters.rating));

        const priceValue = item.price
        let matchesPrice = true;
        if (filters.price === 'under-15') matchesPrice = priceValue < 15;
        else if (filters.price === '15-25') matchesPrice = priceValue >= 15 && priceValue <= 25;
        else if (filters.price === '25-50') matchesPrice = priceValue > 25 && priceValue <= 50;
        else if (filters.price === 'over-50') matchesPrice = priceValue > 50;
        return matchesSearch && matchesSoftware && matchesPrice && matchesRating;
    });

    const handleResetFilter = () => {
        if (resetFilter) {
            setSearchInput('')
            setSearchQuery('')
            setFilters({
                software: 'all',
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
            filters.software === 'all' &&
            filters.price === 'all' &&
            filters.rating === 'all';

        setResetFilter(!isDefault);
    }, [filters, searchInput, searchQuery])

    //delay o day ne
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchQuery(searchInput);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchInput]);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-10">
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
                <MarketplaceHeader />

                <div className="grid grid-cols-1 md:grid-cols-14 gap-6">
                    <FilterSidebar
                        searchInput={searchInput}
                        onSearchChange={setSearchInput}
                        searchQuery={searchQuery}
                        resultsCount={filteredItems.length}
                        filters={filters}
                        onFilterChange={setFilters}
                        resetFilter={resetFilter}
                        onResetFilter={handleResetFilter}
                    />

                    <div className="col-span-11">
                        <MarketplaceGrid
                            items={filteredItems}
                            searchQuery={searchQuery}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
