import { RelatedProductsType } from '@/types/marketplace'
import MarketplaceItemCard from '../../components/marketplace-item-card'

export default function RelatedProducts({ items }: RelatedProductsType) {
    return (
        <div className='mt-12'>
            <h2 className='text-2xl font-bold mb-6'>Related Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {items.map((product) => (
                    <MarketplaceItemCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    )
}
