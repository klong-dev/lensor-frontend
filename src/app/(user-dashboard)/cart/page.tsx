'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BASE_URL } from '@/constants'
import { cartApi } from '@/lib/apis/cartApi'
import { useCart } from '@/lib/hooks/useCartHooks'
import { CartItemData } from '@/types/cart'
import { ChevronLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CartItem } from './components/cart-item'
import { OrderSummary } from './components/order-summary'

export default function Cart() {
  const { data: cartData, isLoading, error, mutate } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const cartItems = cartData?.items || []
  const selectedCartItems = cartItems.filter((item: CartItemData) => selectedItems.has(item.id))
  const activeItems = cartItems.filter((item: CartItemData) => item.product?.status === 'active')
  const hasUnavailableItems = activeItems.length < cartItems.length

  const subtotal = selectedCartItems.reduce(
    (sum: number, item: CartItemData) => sum + parseFloat(item.price) * item.quantity,
    0
  )
  const totalQuantity = selectedCartItems.reduce(
    (sum: number, item: CartItemData) => sum + item.quantity,
    0
  )

  const handleRemoveItem = async (cartItemId: string) => {
    setIsUpdating(true)
    try {
      await cartApi.removeCartItem(cartItemId)
      const newSelected = new Set(selectedItems)
      newSelected.delete(cartItemId)
      setSelectedItems(newSelected)
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
    const newSelected = new Set(selectedItems)
    if (selected) {
      newSelected.add(itemId)
    } else {
      newSelected.delete(itemId)
    }
    setSelectedItems(newSelected)
  }

  const handleClearCart = async () => {
    setIsUpdating(true)
    try {
      await cartApi.clearCart()
      setSelectedItems(new Set())
      mutate()
      toast.success('Cart cleared successfully')
    } catch (error) {
      console.error('Failed to clear cart:', error)
      toast.error('Failed to clear cart')
    } finally {
      setIsUpdating(false)
    }
  }

  const addToCart = async (id: string) => {
    try {
      const res = await cartApi.addItem({
        productId: id,
        quantity: 1
      })
      if (res) {
        mutate()
      }
    } catch (error) {
      console.error('Error adding product:', error)
    } finally {
      sessionStorage.removeItem('tempCart')
    }
  }

  useEffect(() => {
    const tempCartItem = sessionStorage.getItem('tempCart')
    if (tempCartItem) {
      addToCart(tempCartItem)
    }
  }, [])

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
        <Link href="/marketplace">
          <Button variant="ghost" className="mb-10 -ml-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
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
                    {hasUnavailableItems && (
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          Some products in your cart are currently unavailable and cannot be purchased.
                        </p>
                      </div>
                    )}
                    {cartItems.map((item: CartItemData) => {
                      const thumbnail = item.product?.thumbnail || ''
                      const imageUrl = thumbnail.startsWith('http') ? thumbnail : `${BASE_URL}${thumbnail}`

                      return (
                        <CartItem
                          key={item.id}
                          id={item.id}
                          productId={item.product?.id || ''}
                          image={imageUrl}
                          title={item.product?.title || 'Untitled'}
                          author={item.product?.owner?.name || 'Unknown'}
                          authorId={item.product?.owner?.id || 'Unknown'}
                          price={parseFloat(item.product?.price || item.price)}
                          originalPrice={item.product?.originalPrice ? parseFloat(item.product.originalPrice) : undefined}
                          category={item.product?.category}
                          fileFormat={item.product?.fileFormat}
                          fileSize={item.product?.fileSize}
                          status={item.product?.status || 'active'}
                          onRemove={handleRemoveItem}
                          onSelect={handleSelectItem}
                          isSelected={selectedItems.has(item.id)}
                          disabled={isUpdating}
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
                itemCount={totalQuantity}
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
