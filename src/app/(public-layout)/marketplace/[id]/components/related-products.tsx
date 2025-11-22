import { RelatedProductsType } from '@/types/marketplace'
import MarketplaceItemCard from '../../components/marketplace-item-card'
import { PackageX } from 'lucide-react'

export default function RelatedProducts({ items }: RelatedProductsType) {
    return (
        <div className='mt-8 sm:mt-12'>
            <h2 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Related Products</h2>
            {items?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {items.map((product) => (
                        product?.status === 'active' &&
                        <MarketplaceItemCard key={product.id} {...product} />
                    ))}
                </div>
            ) : (
                <p className="flex justify-start items-center gap-2 text-sm sm:text-base text-accent-foreground mt-3 sm:mt-4">
                    No related products found <PackageX className='w-4 h-4 sm:w-5 sm:h-5' />
                </p>
            )}
        </div>
    )
}
