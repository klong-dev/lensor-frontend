import { RelatedProductsType } from '@/types/marketplace'
import MarketplaceItemCard from '../../components/marketplace-item-card'

export default function RelatedProducts({ items }: RelatedProductsType) {
    return (
        <div className='mt-12'>
            <h2 className='text-2xl font-bold mb-6'>Related Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {items.map((product) => (
                    // <Link key={product?.id} href={`/marketplace/${product?.id}`}>
                    //     <div className="relative w-full aspect-square bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:opacity-80 transition-shadow">
                    //         <Image
                    //             src={product?.image || product?.thumbnail || product?.imagePairs?.[0]?.after || '/placeholder.jpg'}
                    //             alt={product?.title || 'Product image'}
                    //             fill
                    //             sizes="100%"
                    //             className="object-cover hover:opacity-90 transition-opacity"
                    //             unoptimized
                    //         />
                    //         <div className="p-4 absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
                    //             <h3 className="text-lg text-white font-semibold mb-2 truncate">{product?.title}</h3>

                    //             {product?.author && (
                    //                 <div className="flex items-center gap-2 mb-3">
                    //                     <Avatar className='size-6'>
                    //                         <AvatarImage src={product?.author?.avatar} alt={product?.author?.name} />
                    //                         <AvatarFallback className="bg-gray-700 text-white text-xs">
                    //                             {product?.author?.name?.charAt(0).toUpperCase()}
                    //                         </AvatarFallback>
                    //                     </Avatar>
                    //                     <span className="text-xs text-white">{product?.author?.name}</span>
                    //                 </div>
                    //             )}

                    //             <div className="flex items-end justify-between">
                    //                 <div>
                    //                     <p className="text-xs text-muted">Price</p>
                    //                     <div className='flex items-center gap-2'>
                    //                         <span className="text-lg text-white font-bold">${product?.salePrice || product?.price}</span>
                    //                         {product?.salePrice && (
                    //                             <span className='text-xs text-muted-foreground line-through'>${product?.price}</span>
                    //                         )}
                    //                     </div>
                    //                 </div>
                    //                 {product?.rating && (
                    //                     <div className='flex items-center gap-1 mb-2'>
                    //                         <Star fill="currentColor" stroke="currentColor" className="text-yellow-500 w-4 h-4" />
                    //                         <span className="text-sm text-white font-semibold">{product?.rating}</span>
                    //                     </div>
                    //                 )}
                    //             </div>
                    //         </div>
                    //     </div>
                    // </Link>
                    <MarketplaceItemCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    )
}
