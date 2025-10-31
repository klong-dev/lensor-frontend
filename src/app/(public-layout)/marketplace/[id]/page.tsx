'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import ImageGallery from './components/image-gallery'
import ProductDetailsTabs from './components/product-details-tabs'
import ProductInfo from './components/product-info'
import RelatedProducts from './components/related-products'
import { ROUTES } from "@/constants/path"
import ProductSkeleton from "./components/product-skeleton"
import { useEffect, useState } from "react"

export default function ProductDetail() {
    const [loading, setLoading] = useState(true)
    const demoProduct = {
        id: "preset-001",
        name: "Cinematic Orange & Teal",
        description: "Professional color grading preset inspired by blockbuster films. Creates dramatic orange and teal color separation with deep shadows and vibrant highlights.",
        price: 29.99,
        originalPrice: 49.99,
        discount: 40,
        rating: 4.8,
        reviewCount: 347,
        downloads: 2840,
        author: {
            name: "Alex Martinez",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
            verified: true,
            totalProducts: 24
        },
        images: [
            "https://i.pinimg.com/1200x/91/a5/61/91a5617f6bea6f3edfdc9ecefc819911.jpg",
            "https://i.pinimg.com/1200x/ff/92/35/ff9235cd827885e439aef1bb9e153754.jpg",
            "https://i.pinimg.com/1200x/3e/c8/25/3ec825e68f5f5c10878cdc11f83026d1.jpg",
            "https://i.pinimg.com/736x/71/0d/a4/710da45e47f2a3a144ce76530e0c7d55.jpg",
            'https://i.pinimg.com/1200x/51/7a/6d/517a6d0c1791afe28dc3bf4d48be9672.jpg',
            'https://i.pinimg.com/1200x/ce/75/c5/ce75c59f150eea18858b1b62c7e42ad3.jpg'
        ],
        category: "Color Grading",
        tags: ["Cinematic", "Film", "Orange & Teal", "Professional", "Portrait", "Landscape"],
        compatibility: ["Lightroom Classic", "Lightroom CC", "Photoshop ACR"],
        fileFormat: ".xmp",
        fileSize: "2.4 MB",
        includesCount: 15,
        features: [
            "15 premium presets",
            "Works with RAW and JPEG",
            "Mobile & Desktop compatible",
            "Lifetime updates",
            "Video tutorial included",
            "Instant download"
        ],
        specifications: {
            adjustments: ["Tone Curve", "HSL", "Color Grading", "Calibration"],
            bestFor: ["Portraits", "Lifestyle", "Urban", "Travel"],
            difficulty: "Beginner Friendly"
        },
        createdAt: "2024-08-15",
        updatedAt: "2025-01-10",
        warranty: {
            duration: "30 days",
            coverage: "Full refund if not satisfied",
            terms: [
                "Digital products are non-refundable after download",
                "Technical support included for 30 days",
                "Free updates for lifetime",
                "Money-back guarantee if presets don't work as described"
            ]
        },
        reviews: [
            {
                id: 1,
                userName: "Sarah Johnson",
                userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                rating: 5,
                date: "2025-01-15",
                comment: "These presets are absolutely stunning! The orange and teal color grading is exactly what I was looking for. Worth every penny!",
                helpful: 24
            },
            {
                id: 2,
                userName: "Michael Chen",
                userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                rating: 5,
                date: "2025-01-10",
                comment: "Professional quality presets. Easy to use and the results are fantastic. Highly recommend for portrait and lifestyle photography.",
                helpful: 18
            },
            {
                id: 3,
                userName: "Emma Davis",
                userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
                rating: 4,
                date: "2025-01-05",
                comment: "Great presets overall. Works well with most images, though some adjustments needed for certain lighting conditions.",
                helpful: 12
            }
        ]
    }
    const relatedProducts = [
        {
            id: "preset-002",
            name: "Moody Film Tones",
            price: 24.99,
            originalPrice: 39.99,
            image: "https://i.pinimg.com/736x/b9/6b/67/b96b678ca060a545fe78108db68da9cf.jpg",
            rating: 4.7,
            downloads: 1850,
            author: {
                name: "Sarah Williams",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            }
        },
        {
            id: "preset-003",
            name: "Vintage Summer Vibes",
            price: 19.99,
            originalPrice: 29.99,
            image: "https://i.pinimg.com/736x/3d/96/54/3d96548c8a3d31c0f0e88441c9c6f9de.jpg",
            rating: 4.9,
            downloads: 2340,
            author: {
                name: "Mike Johnson",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
            }
        },
        {
            id: "preset-004",
            name: "Dark & Moody Portrait",
            price: 34.99,
            originalPrice: 54.99,
            image: "https://i.pinimg.com/736x/2e/9b/8d/2e9b8d1a1ba8e2df6e2275feff4b5052.jpg",
            rating: 4.6,
            downloads: 1620,
            author: {
                name: "Alex Martinez",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            }
        },
        {
            id: "preset-005",
            name: "Bright & Airy Collection",
            price: 27.99,
            originalPrice: 44.99,
            image: "https://i.pinimg.com/1200x/dd/d1/57/ddd157d3da927f59baefed4b96cf9c0c.jpg",
            rating: 4.8,
            downloads: 2190,
            author: {
                name: "Emma Davis",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
            }
        }
    ]

    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            setLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [])
    return (
        <div className='container py-8'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={ROUTES.HOME}>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={ROUTES.MARKETPLACE}>Marketplace</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`${ROUTES.MARKETPLACE}/${demoProduct.id}`}>{demoProduct.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {loading
                ?
                <ProductSkeleton />
                :
                <>
                    <div className='mt-8 grid grid-cols-14 gap-6'>
                        {/* Image Gallery */}
                        <ImageGallery images={demoProduct.images} productName={demoProduct.name} />

                        {/* Product Info */}
                        <ProductInfo
                            name={demoProduct.name}
                            rating={demoProduct.rating}
                            reviewCount={demoProduct.reviewCount}
                            price={demoProduct.price}
                            originalPrice={demoProduct.originalPrice}
                            features={demoProduct.features}
                            author={{
                                name: demoProduct.author.name,
                                avatar: demoProduct.author.avatar
                            }}
                        />
                    </div>


                    <ProductDetailsTabs
                        description={demoProduct.description}
                        category={demoProduct.category}
                        fileFormat={demoProduct.fileFormat}
                        fileSize={demoProduct.fileSize}
                        includesCount={demoProduct.includesCount}
                        compatibility={demoProduct.compatibility}
                        warranty={demoProduct.warranty}
                        rating={demoProduct.rating}
                        reviewCount={demoProduct.reviewCount}
                        reviews={demoProduct.reviews}
                    />


                    <RelatedProducts products={relatedProducts} />
                </>
            }
        </div>
    )
}
