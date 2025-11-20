'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BASE_URL } from '@/constants'
import { cartApi } from '@/lib/apis/cartApi'
import { useCart } from '@/lib/hooks/useCartHooks'
import { CartItemData } from '@/types/cart'
import { ChevronLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { CartItem } from './components/cart-item'
import { OrderSummary } from './components/order-summary'

export default function Cart() {
  const { data: cartData, isLoading, error, mutate } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const handleRemoveItem = async (cartItemId: string) => {
    setIsUpdating(true)
    try {
      await cartApi.removeCartItem(cartItemId)
      setSelectedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(cartItemId);
        return newSet;
      });
      mutate()
      toast.success('Item removed from cart')
    } catch (error) {
      console.error('Failed to remove cart item:', error)
      toast.error('Failed to remove item')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSelectItem = (itemId: string, selected: boolean) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(itemId);
      } else {
        newSet.delete(itemId);
      }
      return newSet;
    });
  };

  const handleClearCart = async () => {
    setIsUpdating(true)
    try {
      await cartApi.clearCart()
      setSelectedItems(new Set());
      mutate()
      toast.success('Cart cleared successfully')
    } catch (error) {
      console.error('Failed to clear cart:', error)
      toast.error('Failed to clear cart')
    } finally {
      setIsUpdating(false)
    }
  }

  const cartItems = cartData?.items || []
  const activeItems = cartItems.filter((item: CartItemData) => item.product?.status === 'active')
  const selectedCartItems = cartItems.filter((item: CartItemData) => selectedItems.has(item.id))
  const subtotal = selectedCartItems.reduce((sum: number, item: CartItemData) => sum + parseFloat(item.price) * item.quantity, 0)

  if (isLoading) {
    return (
      <div className="min-h-screen container px-6">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading cart...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen container px-6">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">Failed to load cart. Please try again.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen container px-6">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <Link href={'/marketplace'} className="mb-6">
          <Button variant="ghost" className="mb-4 -ml-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart />
                    Shopping Cart ({cartItems.length} items)
                  </div>
                  {cartItems.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearCart}
                      disabled={isUpdating}
                      className="text-red-500 hover:text-red-600"
                    >
                      Clear All
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeItems.length < cartItems.length && (
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          Some products in your cart are currently unavailable and cannot be purchased.
                        </p>
                      </div>
                    )}
                    {cartItems.map((item: CartItemData) => {
                      const imagePath = item.product?.thumbnail || ''
                      const imageUrl = imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`

                      return (
                        <CartItem
                          key={item.id}
                          id={item.id}
                          productId={item.product?.id || ''}
                          image={imageUrl}
                          title={item.product?.title || 'Untitled'}
                          author={item.product?.owner?.name || 'Unknown'}
                          authorId={item?.product?.owner?.id || 'Unknown'}
                          price={parseFloat(item.product?.price || item.price)}
                          originalPrice={item.product?.originalPrice ? parseFloat(item.product.originalPrice) : undefined}
                          category={item.product?.category}
                          fileFormat={item.product?.fileFormat}
                          fileSize={item.product?.fileSize}
                          onRemove={handleRemoveItem}
                          disabled={isUpdating}
                          status={item.product?.status || 'active'}
                          onSelect={handleSelectItem}
                          isSelected={selectedItems.has(item.id)}
                        />
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <OrderSummary
                subtotal={subtotal}
                itemCount={selectedCartItems.reduce((sum: number, item: CartItemData) => sum + item.quantity, 0)}
                onCheckoutSuccess={mutate}
                disabled={selectedItems.size === 0 || selectedCartItems.some((item: CartItemData) => item.product?.status !== 'active')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
