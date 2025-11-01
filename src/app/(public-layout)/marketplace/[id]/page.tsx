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
import { useMarketplace, useMarketplaceDetail } from "@/lib/hooks/useMarketplaceHooks"
import { useParams } from "next/navigation"

export default function ProductDetail() {
    const { id } = useParams()
    
    const [loading, setLoading] = useState(true)
    const { data: demoProduct } = useMarketplaceDetail(Array.isArray(id) ? id[0] : id || '')
    
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
                        <BreadcrumbLink href={`${ROUTES.MARKETPLACE}/${demoProduct?.id}`}>{demoProduct?.name}</BreadcrumbLink>
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
                        <ImageGallery images={demoProduct?.imagePairs} productName={demoProduct?.name} />

                        {/* Product Info */}
                        <ProductInfo
                            name={demoProduct?.name}
                            rating={demoProduct?.rating}
                            reviewCount={demoProduct?.reviewCount}
                            price={demoProduct?.price}
                            originalPrice={demoProduct?.originalPrice}
                            features={demoProduct?.features}
                            author={{
                                name: demoProduct?.author.name,
                                avatar: demoProduct?.author.avatar
                            }}
                        />
                    </div>


                    <ProductDetailsTabs
                        description={demoProduct?.description}
                        category={demoProduct?.category}
                        fileFormat={demoProduct?.fileFormat}
                        fileSize={demoProduct?.fileSize}
                        includesCount={demoProduct?.includesCount}
                        compatibility={demoProduct?.compatibility}
                        warranty={demoProduct?.warranty}
                        rating={demoProduct?.rating}
                        reviewCount={demoProduct?.reviewCount}
                        reviews={demoProduct?.reviews}
                    />


                    <RelatedProducts products={relatedProducts} />
                </>
            }
        </div>
    )
}
