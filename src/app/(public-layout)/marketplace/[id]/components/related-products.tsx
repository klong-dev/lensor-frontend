import { RelatedProductsType } from '@/types/marketplace'
import MarketplaceItemCard from '../../components/marketplace-item-card'
import { PackageX } from 'lucide-react'

export default function RelatedProducts({ items }: RelatedProductsType) {
    return (
        <div className='mt-12'>
            <h2 className='text-2xl font-bold mb-6'>Related Products</h2>
            {items?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((product) => (
                        <MarketplaceItemCard key={product.id} {...product} />
                    ))}
                </div>
            ) : (
                <p className="flex justify-start items-center gap-2 text-accent-foreground mt-4">
                    No related products found <PackageX />
                </p>
            )}
        </div>
    )
}
