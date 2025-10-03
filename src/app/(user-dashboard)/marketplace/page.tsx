'use client'

import React, { useState } from 'react'
import SearchBar from './components/search-bar'
import { Divider, Image, Avatar } from '@mantine/core'
import { FaStar } from "react-icons/fa"

export default function MarketplacePage() {
    const [failedImages, setFailedImages] = useState<Set<number>>(new Set())
    const [failedAvatars, setFailedAvatars] = useState<Set<number>>(new Set())
    const [searchQuery, setSearchQuery] = useState('')

    const marketplaceItems = [
        {
            id: 1,
            title: "Urban Photography Preset",
            description: "Professional preset pack for urban street photography with moody tones",
            price: "$15.99",
            image: "https://images.unsplash.com/photo-1508051123996-69f8caf4891e?w=600",
            userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
            userName: "Alex Chen",
            rating: 4.8
        },
        {
            id: 2,
            title: "Nature Portrait Collection",
            description: "Beautiful nature portraits with natural lighting and vibrant colors",
            price: "$24.99",
            image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600",
            userAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100",
            userName: "Sarah Martinez",
            rating: 4.9
        },
        {
            id: 3,
            title: "Vintage Film Presets",
            description: "Classic film look presets for that authentic vintage aesthetic",
            price: "$12.99",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600",
            userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
            userName: "Mike Johnson",
            rating: 4.7
        },
        {
            id: 4,
            title: "Happy Robot 032",
            description: "Cute robot character for digital art projects",
            price: "$300.00",
            image: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=600",
            userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
            userName: "BeKind2Robots",
            rating: 4.6
        },
        {
            id: 5,
            title: "Cinematic LUT Pack",
            description: "Transform your videos with cinematic LUTs for professional-grade color grading",
            price: "$19.99",
            image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=600",
            userAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100",
            userName: "Emma Watson",
            rating: 4.9
        },
        {
            id: 6,
            title: "Abstract 3D Models",
            description: "Pack of 10 abstract 3D models perfect for motion design and concept art",
            price: "$45.00",
            image: "https://images.unsplash.com/photo-1602526212306-29a7b3f69c3c?w=600",
            userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
            userName: "David Kim",
            rating: 4.8
        },
        {
            id: 7,
            title: "Moody Landscape Presets",
            description: "Dark and dramatic tones for stunning landscape photography",
            price: "$17.99",
            image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
            userAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
            userName: "Liam Brown",
            rating: 4.7
        },
        {
            id: 8,
            title: "Minimal Portrait Pack",
            description: "Clean and soft presets for minimalistic portrait photography",
            price: "$21.00",
            image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600",
            userAvatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=100",
            userName: "Sophia Lee",
            rating: 4.8
        },
        {
            id: 9,
            title: "Golden Hour Magic",
            description: "Warm presets to enhance golden hour and sunset photos",
            price: "$18.50",
            image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
            userAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100",
            userName: "Olivia Green",
            rating: 4.9
        },
        {
            id: 10,
            title: "Black & White Mastery",
            description: "High-contrast black and white presets for timeless photography",
            price: "$14.00",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
            userAvatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100",
            userName: "Ethan White",
            rating: 4.6
        },
        {
            id: 11,
            title: "Travel Explorer Presets",
            description: "Vibrant presets perfect for travel bloggers and explorers",
            price: "$22.00",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
            userAvatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100",
            userName: "Isabella Cruz",
            rating: 4.8
        }
    ];

    const filteredItems = marketplaceItems.filter(item => {
        const query = searchQuery.toLowerCase()
        return (
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.userName.toLowerCase().includes(query)
        )
    })

    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }

    const handleSubmit = (query: string) => {
        setSearchQuery(query)
    }

    const handleImageError = (itemId: number) => {
        setFailedImages(prev => new Set(prev).add(itemId))
    }

    const handleAvatarError = (itemId: number) => {
        setFailedAvatars(prev => new Set(prev).add(itemId))
    }

    return (
        <div className='min-h-screen'>
            <div className='container flex flex-col mx-auto p-8 pt-13'>
                <h1 className='font-extrabold text-4xl uppercase mb-2'>Your Marketplace for Creativity</h1>
                <p className='mb-10'>Buy, sell, and showcase stunning photos & professional presets in one place</p>
                <SearchBar
                    placeholder="Search for presets..."
                    onSearch={handleSearch}
                    onSubmit={handleSubmit}
                    className='mb-5'
                />

                {searchQuery && (
                    <div>
                        <p className='font-bold text-lg'>Found <span className='text-purple-500'>{filteredItems.length}</span> resul{filteredItems.length !== 1 ? 's' : ''} for &quot;<span className='text-purple-500'>{searchQuery}</span>&quot;</p>
                    </div>
                )}
                <Divider my='xl' />

                <div className='p-5 bg-[var(--color-box-inside)] min-h-screen rounded-xl'>
                    {searchQuery && filteredItems.length === 0 && (
                        <div className='text-center py-10 text-gray-400'>
                            <p className='text-lg mb-2'>No items found</p>
                            <p>Try searching with different keywords</p>
                        </div>
                    )}

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className='bg-[var(--mantine-color-body)] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-fit cursor-pointer'
                            >
                                <div className="aspect-[2/3] overflow-hidden">
                                    <Image
                                        src={failedImages.has(item.id) ? "/camera1.jpg" : item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                                        onError={() => handleImageError(item.id)}
                                    />
                                </div>

                                <div className='p-4'>
                                    <h3 className='text-xl font-semibold text-white mb-3 line-clamp-2'>
                                        {item.title}
                                    </h3>

                                    <div className='flex items-center gap-2 mb-4'>
                                        <Avatar
                                            src={failedAvatars.has(item.id) ? "/camera1.jpg" : item.userAvatar}
                                            alt={item.userName}
                                            size="sm"
                                            onError={() => handleAvatarError(item.id)}
                                        />
                                        <span className='text-sm text-gray-300'>
                                            {item.userName}
                                        </span>
                                    </div>

                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <p className='text-xs text-gray-400 mb-1'>
                                                Price
                                            </p>
                                            <p className='text-lg font-bold text-white'>
                                                {item.price}
                                            </p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='text-xs text-gray-400 mb-1'>
                                                Rating
                                            </p>
                                            <p className='flex justify-end items-center gap-1 text-lg font-semibold'>
                                                {item.rating} <FaStar className='h-[24] text-amber-200' />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
