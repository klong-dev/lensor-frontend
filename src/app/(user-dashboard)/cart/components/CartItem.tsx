'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'

interface CartItemProps {
    id: string
    image: string
    title: string
    author: string
    price: number
    originalPrice?: number
    quantity: number
    onQuantityChange: (id: string, quantity: number) => void
    onRemove: (id: string) => void
}

export function CartItem({
    id,
    image,
    title,
    author,
    price,
    originalPrice,
    quantity,
    onQuantityChange,
    onRemove,
}: CartItemProps) {
    const handleIncrease = () => {
        onQuantityChange(id, quantity + 1)
    }

    const handleDecrease = () => {
        if (quantity > 1) {
            onQuantityChange(id, quantity - 1)
        }
    }

    return (
        <div className="flex gap-4 py-6 border-b last:border-b-0">
            <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-semibold text-base">{title}</h3>
                    <p className="text-sm text-gray-600">by {author}</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-md">
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={handleDecrease}
                            disabled={quantity <= 1}
                            className="h-8 w-8 rounded-r-none"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 text-sm font-medium min-w-[40px] text-center">
                            {quantity}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={handleIncrease}
                            className="h-8 w-8 rounded-l-none"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                    <p className="font-semibold text-lg">${price.toFixed(2)}</p>
                    {originalPrice && (
                        <p className="text-sm text-gray-500 line-through">
                            ${originalPrice.toFixed(2)} total
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
