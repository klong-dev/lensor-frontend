'use client'

import React, { useEffect, useState } from 'react'
import SearchBar from './components/search-bar'
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchInput, setSearchInput] = useState('')

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
        const query = searchQuery.toLowerCase()
        return (
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.userName.toLowerCase().includes(query)
        )
    })

    const handleSearch = (query: string) => {
        setSearchInput(query)
    }

    useEffect(() => {
        setTimeout(() => {
            setSearchQuery(searchInput)
        }, 500)
    }, [searchInput])

    const handleSubmit = (query: string) => {
        setSearchInput(query)
    }

    return (
        <div className='min-h-screen'>
            <div className='container flex flex-col mx-auto  pt-13'>
                <div className='sticky top-10 z-20  p-5 py-8 rounded-2xl backdrop-blur-2xl'>
                    <h1 className='font-extrabold text-4xl uppercase mb-2'>Your <span className='text-purple-500'>Marketplace</span> for Creativity</h1>
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
                    <div className='border-t border-grey/10 my-3' />
                </div>
                <div className='p-5 bg-[var(--color-box-inside)] min-h-screen rounded-xl'>
                    {searchQuery && filteredItems.length === 0 && (
                        <div className='text-center py-10 text-gray-400'>
                            <p className='text-lg mb-2'>No items found</p>
                            <p>Try searching with different keywords</p>
                        </div>
                    )}

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {filteredItems.map((item) => (
                            <Link href={`/marketplace/${item.id}`} key={item.id}>
                                <Card
                                    key={item.id}
                                    className='bg-[var(--mantine-color-body)] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-fit cursor-pointer pt-0'
                                >
                                    <div className="relative w-full aspect-[3/2] flex justify-center items-center overflow-hidden bg-white rounded-2xl rounded-bl-none rounded-br-none">
                                        <Image
                                            src={item.image ?? '/camera1.jpg'}
                                            alt={item.title}
                                            fill
                                            sizes="100%"
                                            priority
                                            className="object-contain hover:opacity-90 transition-all duration-300 rounded-2xl rounded-bl-none rounded-br-none"
                                        />
                                    </div>

                                    <div className='p-4'>
                                        <h3 className='text-xl font-semibold text-white mb-3 line-clamp-2'>
                                            {item.title}
                                        </h3>

                                        <div className='flex items-center gap-2 mb-4'>
                                            <Avatar>
                                                <AvatarImage src={item.userAvatar} />
                                                <AvatarFallback>{'/camera1.jpg'}</AvatarFallback>
                                            </Avatar>
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
                                                    {item.rating} <Star fill='yellow' stroke='none' color='yellow' />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
