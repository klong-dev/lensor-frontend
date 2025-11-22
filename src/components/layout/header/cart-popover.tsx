'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { BASE_URL } from '@/constants'
import { ROUTES } from '@/constants/path'
import { useCartStore } from '@/stores/cart-store'
import { CartItemData } from '@/types/cart'
import { ExternalLink, Package, ShoppingCart, Ban, AlertCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export function CartPopover() {
     const t = useTranslations('Header')
     const { cart, itemCount } = useCartStore()
     const cartItems = cart?.items || []
     const displayItems = cartItems.slice(0, 5) // Show only 5 latest items

     const subtotal = cartItems.reduce(
          (sum: number, item: CartItemData) => sum + parseFloat(item.price) * item.quantity,
          0
     )

     return (
          <div className="flex flex-col w-full max-h-[calc(100vh-100px)]">
               {/* Header */}
               <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0 bg-background">
                    <div className="flex items-center gap-2">
                         <ShoppingCart className="h-4 w-4" />
                         <h3 className="font-semibold">{t('shoppingCart')}</h3>
                         {itemCount > 0 && (
                              <Badge variant="secondary" className="rounded-full h-5 min-w-5 flex items-center justify-center px-1.5">
                                   {itemCount}
                              </Badge>
                         )}
                    </div>
                    <Link href={ROUTES.CART}>
                         <Button variant="ghost" size="sm" className="h-8 text-xs">
                              {t('viewCart')}
                              <ExternalLink className="h-3 w-3 ml-1" />
                         </Button>
                    </Link>
               </div>

               {/* Cart Items List */}
               <div className="flex-1 overflow-y-auto min-h-0">
                    {displayItems.length === 0 ? (
                         <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                              <ShoppingCart className="h-12 w-12 text-muted-foreground/50 mb-3" />
                              <p className="text-sm text-muted-foreground">{t('cartEmpty')}</p>
                              <Link href={ROUTES.MARKETPLACE} className="mt-4">
                                   <Button variant="outline" size="sm">
                                        {t('continueShopping')}
                                   </Button>
                              </Link>
                         </div>
                    ) : (
                         <div className="divide-y">
                              {displayItems.map((item: CartItemData, index: number) => {
                                   const thumbnail = item.product?.thumbnail || ''
                                   const imageUrl = thumbnail.startsWith('http') ? thumbnail : `${BASE_URL}${thumbnail}`
                                   const isUnavailable = item.product?.status !== 'active'
                                   const price = parseFloat(item.product?.price || item.price)

                                   return (
                                        <div key={item.id}>
                                             <Link href={ROUTES.CART}>
                                                  <div
                                                       className={`flex gap-3 px-4 py-3 hover:bg-accent transition-colors cursor-pointer ${isUnavailable ? 'opacity-60' : ''
                                                            }`}
                                                  >
                                                       <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden border bg-muted">
                                                            {isUnavailable && (
                                                                 <div className="absolute inset-0 z-10 bg-black/60 flex items-center justify-center">
                                                                      <Ban className="w-5 h-5 text-red-500" />
                                                                 </div>
                                                            )}
                                                            <Image
                                                                 src={imageUrl}
                                                                 alt={item.product?.title || 'Product'}
                                                                 fill
                                                                 className="object-cover"
                                                            />
                                                       </div>
                                                       <div className="flex-1 min-w-0 space-y-1">
                                                            {isUnavailable && (
                                                                 <Badge variant="destructive" className="mb-1 text-[10px] h-4">
                                                                      <AlertCircle className="h-2 w-2 mr-1" />
                                                                      {t('unavailable')}
                                                                 </Badge>
                                                            )}
                                                            <h4 className="text-sm font-medium line-clamp-1">
                                                                 {item.product?.title || t('untitled')}
                                                            </h4>
                                                            <p className="text-xs text-muted-foreground line-clamp-1">
                                                                 {t('by')} {item.product?.owner?.name || t('unknown')}
                                                            </p>
                                                            <div className="flex items-center justify-between gap-2">
                                                                 {item.product?.category && (
                                                                      <Badge variant="outline" className="text-[10px] h-5">
                                                                           <Package className="h-2.5 w-2.5 mr-1" />
                                                                           {item.product.category}
                                                                      </Badge>
                                                                 )}
                                                                 <p className="text-sm font-bold">
                                                                      {price.toLocaleString('vi-VN')} ₫
                                                                 </p>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </Link>
                                             {index < displayItems.length - 1 && <Separator />}
                                        </div>
                                   )
                              })}
                         </div>
                    )}
               </div>

               {/* Footer */}
               {displayItems.length > 0 && (
                    <>
                         <Separator className="flex-shrink-0" />
                         <div className="px-4 py-3 space-y-3 flex-shrink-0 bg-background">
                              <div className="flex items-center justify-between">
                                   <span className="text-sm text-muted-foreground">{t('subtotal')}:</span>
                                   <span className="text-base font-bold">{subtotal.toLocaleString('vi-VN')} ₫</span>
                              </div>
                              <Link href={ROUTES.CART} className="block">
                                   <Button className="w-full">
                                        {t('goToCart')}
                                   </Button>
                              </Link>
                         </div>
                    </>
               )}
          </div>
     )
}
