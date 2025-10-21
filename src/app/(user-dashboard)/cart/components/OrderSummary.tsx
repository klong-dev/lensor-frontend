'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { CreditCard, Package, Truck } from 'lucide-react'

interface OrderSummaryProps {
    subtotal: number
    tax: number
    shipping: number
    itemCount: number
}

export function OrderSummary({ subtotal, tax, shipping, itemCount }: OrderSummaryProps) {
    const [promoCode, setPromoCode] = useState('')
    const total = subtotal + tax + shipping

    const handleApplyPromo = () => {
        console.log('Applying promo code:', promoCode)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
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
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                        </svg>
                        <h3 className="font-semibold">Promo Code</h3>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1"
                        />
                        <Button variant="outline" onClick={handleApplyPromo}>
                            Apply
                        </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Try: BOTANICAL10, SPRING15 or FIRST20
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Order Summary</h3>

                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                            <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tax</span>
                            <span className="font-medium">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-medium">${shipping.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="border-t pt-4 mb-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg">Total</span>
                            <span className="font-bold text-xl">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <Button className="w-full" size="lg">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Proceed to Checkout
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start gap-3">
                        <Truck className="h-5 w-5 text-gray-600 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-sm">Free Shipping</h4>
                            <p className="text-xs text-gray-500">On orders over $200</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Package className="h-5 w-5 text-gray-600 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-sm">Secure Packaging</h4>
                            <p className="text-xs text-gray-500">Art safely packed & insured</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <div className="text-center p-4 rounded-lg">
                    <p className="text-sm italic text-gray-600">
                        &quot;Each piece is carefully created with love and attention to botanical detail.&quot;
                    </p>
                    <p className="text-xs text-gray-500 mt-2">— Elena, Botanical Artist</p>
                </div>
            </Card>
        </div>
    )
}
