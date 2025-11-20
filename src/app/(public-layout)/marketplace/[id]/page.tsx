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
        <div className='container pt-4 pb-8'>
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
                        <BreadcrumbLink href={`${ROUTES.MARKETPLACE}/${item?.id}`}>{item?.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {isLoading ? (
                <ProductSkeleton />
            ) : error ? (
                <div className='mt-8 flex flex-col items-center justify-center min-h-[400px] text-center'>
                    <div className='max-w-md'>
                        <h2 className='text-2xl font-bold mb-4'>Something Went Wrong</h2>
                        <p className='text-muted-foreground mb-6'>
                            We couldn&apos;t load the product details. Please try again later.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className='px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'
                        >
                            Retry
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className='mt-3 grid grid-cols-14 gap-6'>
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
