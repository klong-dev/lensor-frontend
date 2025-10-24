'use client'

import React, { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CartItem } from './components/cart-item'
import { OrderSummary } from './components/order-summary'
import { SpecialInstructions } from './components/special-instructions'
import Link from 'next/link'

interface CartItemType {
  id: string
  image: string
  title: string
  author: string
  price: number
  originalPrice?: number
  quantity: number
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: '1',
      image: 'https://i.pinimg.com/736x/ec/09/19/ec09199edeabd5175406361756f80c27.jpg',
      title: 'Monstera Deliciosa Study',
      author: 'Elena Botanical',
      price: 85.0,
      quantity: 1,
    },
    {
      id: '2',
      image: 'https://i.pinimg.com/736x/d0/8d/16/d08d168165ce14dcac8da86e93fa044a.jpg',
      title: 'Eucalyptus Branch',
      author: 'Elena Botanical',
      price: 75.0,
      originalPrice: 150.0,
      quantity: 2,
    },
    {
      id: '3',
      image: 'https://i.pinimg.com/736x/1c/6b/f0/1c6bf09253e1819425a2e58ebcf5988d.jpg',
      title: 'Fern Collection',
      author: 'Elena Botanical',
      price: 120.0,
      quantity: 1,
    },
    {
      id: '4',
      image: 'https://i.pinimg.com/1200x/1b/08/af/1b08af4eab12bd921dc3541ccf6a10b1.jpg',
      title: 'Desert Succulent',
      author: 'Elena Botanical',
      price: 60.0,
      quantity: 1,
    },
    {
      id: '5',
      image: 'https://i.pinimg.com/736x/0a/20/fc/0a20fcc7bfacc5a20151f9e791e6b0f8.jpg',
      title: 'Golden Barrel Cactus',
      author: 'Elena Botanical',
      price: 95.0,
      originalPrice: 120.0,
      quantity: 1,
    },
    {
      id: '6',
      image: 'https://i.pinimg.com/736x/75/06/6c/75066c010f5e93d186cce8584270a14d.jpg',
      title: 'Phalaenopsis Orchid',
      author: 'Elena Botanical',
      price: 130.0,
      quantity: 2,
    },
  ])

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 15.00

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
                <CardTitle className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Shopping Cart ({cartItems.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </div>
                ) : (
                  <div>
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        {...item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <SpecialInstructions />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                itemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
