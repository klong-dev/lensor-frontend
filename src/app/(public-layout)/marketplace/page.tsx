'use client'

import React, { useEffect, useState } from 'react';
import MarketplaceHeader from './components/MarketplaceHeader';
import FilterSidebar from './components/FilterSidebar';
import MarketplaceGrid from './components/MarketplaceGrid';

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const marketplaceItems = [
        {
            id: 1,
            title: "Urban Photography Preset",
            description: "Professional preset pack for urban street photography with moody tones.",
            price: "$15.99",
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop",
            userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
            userName: "Alex Chen",
            rating: 4.8
        },
        {
            id: 2,
            title: "Nature Portrait Collection",
            description: "Beautiful nature portraits with natural lighting and vibrant colors.",
            price: "$24.99",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
            userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
            userName: "Sarah Martinez",
            rating: 4.9
        },
        {
            id: 3,
            title: "Vintage Film Presets",
            description: "Classic film look presets for that authentic vintage aesthetic.",
            price: "$12.99",
            image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&h=400&fit=crop",
            userAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
            userName: "Mike Johnson",
            rating: 4.7
        },
        {
            id: 4,
            title: "Happy Robot 032",
            description: "Cute robot character for digital art projects.",
            price: "$300.00",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
            userAvatar: "https://randomuser.me/api/portraits/men/12.jpg",
            userName: "BeKind2Robots",
            rating: 4.6
        },
        {
            id: 5,
            title: "Cinematic LUT Pack",
            description: "Transform your videos with cinematic LUTs for professional-grade color grading.",
            price: "$19.99",
            image: "https://i.pinimg.com/736x/d8/74/88/d874880a4d2cdb3269a4b4aad38f2fd7.jpg",
            userAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
            userName: "Emma Watson",
            rating: 4.9
        },
        {
            id: 6,
            title: "Abstract 3D Models",
            description: "Pack of 10 abstract 3D models perfect for motion design and concept art.",
            price: "$45.00",
            image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop",
            userAvatar: "https://randomuser.me/api/portraits/men/23.jpg",
            userName: "David Kim",
            rating: 4.8
        },
        {
            id: 7,
            title: "Moody Landscape Presets",
            description: "Dark and dramatic tones for stunning landscape photography.",
            price: "$17.99",
            image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&h=400&fit=crop",
            userAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
            userName: "Liam Brown",
            rating: 4.7
        },
        {
            id: 8,
            title: "Minimal Portrait Pack",
            description: "Clean and soft presets for minimalistic portrait photography.",
            price: "$21.00",
            image: "https://i.pinimg.com/736x/14/23/d9/1423d9df0525e953942e8b930646a371.jpg",
            userAvatar: "https://randomuser.me/api/portraits/women/55.jpg",
            userName: "Sophia Lee",
            rating: 4.8
        },
        {
            id: 9,
            title: "Golden Hour Magic",
            description: "Warm presets to enhance golden hour and sunset photos.",
            price: "$18.50",
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop",
            userAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
            userName: "Olivia Green",
            rating: 4.9
        },
        {
            id: 10,
            title: "Black & White Mastery",
            description: "High-contrast black and white presets for timeless photography.",
            price: "$14.00",
            image: "https://i.pinimg.com/1200x/05/d4/ae/05d4ae13fb7927b9de80f61e1b77b8ae.jpg",
            userAvatar: "https://randomuser.me/api/portraits/men/77.jpg",
            userName: "Ethan White",
            rating: 4.6
        },
        {
            id: 11,
            title: "Travel Explorer Presets",
            description: "Vibrant presets perfect for travel bloggers and explorers.",
            price: "$22.00",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
            userAvatar: "https://randomuser.me/api/portraits/women/21.jpg",
            userName: "Isabella Cruz",
            rating: 4.8
        }
    ];

    const filteredItems = marketplaceItems.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchQuery(searchInput);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchInput]);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-10">
                <MarketplaceHeader />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <FilterSidebar
                        searchInput={searchInput}
                        onSearchChange={setSearchInput}
                        searchQuery={searchQuery}
                        resultsCount={filteredItems.length}
                    />

                    <div className="col-span-3">
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
