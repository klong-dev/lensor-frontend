'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { ROUTES } from "@/constants/path"
import { useMarketplace, useMarketplaceDetail } from "@/lib/hooks/useMarketplaceHooks"
import { useParams } from "next/navigation"
import ProductSkeleton from "../../../../components/marketplace/product-skeleton"
import ImageGallery from './components/image-gallery'
import ProductDetailsTabs from './components/product-details-tabs'
import ProductInfo from './components/product-info'
import { useMemo } from "react"
import { MarketplaceItem } from "@/types/marketplace"
import RelatedProducts from "./components/related-products"
import MarketplaceSkeleton from "@/components/marketplace/marketplace-skeleton"

export default function ProductDetail() {
    const param = useParams()
    const id = param.id as string
    const { data: item, isLoading, error, mutate } = useMarketplaceDetail(id)
    const { data: allItems } = useMarketplace()


    const relatedProducts = useMemo(() => {
        if (!allItems?.data || !item?.category) return []

        return allItems?.data?.filter((products: MarketplaceItem) => (
            products?.category === item?.category &&
            products?.id !== item?.id
        )).slice(0, 4)

    }, [allItems?.data, item?.category, item?.id])


    return (
        <div className='container px-3 sm:px-4 md:px-6 pt-4 pb-8'>
            <Breadcrumb className='mb-3 sm:mb-4'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={ROUTES.HOME} className='text-xs sm:text-sm'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={ROUTES.MARKETPLACE} className='text-xs sm:text-sm'>Marketplace</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`${ROUTES.MARKETPLACE}/${item?.id}`} className='text-xs sm:text-sm'>{item?.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {isLoading ? (
                <ProductSkeleton />
            ) : error ? (
                <div className='mt-6 sm:mt-8 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] text-center px-4'>
                    <div className='max-w-md'>
                        <h2 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>Something Went Wrong</h2>
                        <p className='text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6'>
                            We couldn&apos;t load the product details. Please try again later.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className='px-4 sm:px-6 py-2 text-sm sm:text-base bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'
                        >
                            Retry
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className='mt-3 flex flex-col lg:grid lg:grid-cols-14 gap-4 sm:gap-6'>
                        <ImageGallery imagePairs={item?.imagePairs} name={item?.name} />

                        <ProductInfo {...item} />
                    </div>

                    <ProductDetailsTabs {...item} onReviewSuccess={mutate} />

                    {relatedProducts.length > 0 || relatedProducts !== null || relatedProducts !== undefined
                        ?
                        <RelatedProducts items={relatedProducts} />
                        :
                        <MarketplaceSkeleton />
                    }
                </>
            )}
        </div>
    )
}
