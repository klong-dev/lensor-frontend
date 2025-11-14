'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Trash2, Package, FileType, HardDrive } from 'lucide-react'
import { CartItemProps } from '@/types/cart'
import Link from 'next/link'
import { ROUTES } from '@/constants/path'
import { Badge } from '@/components/ui/badge'

export function CartItem({
    id,
    productId,
    image,
    title,
    author,
    authorId,
    price,
    originalPrice,
    category,
    fileFormat,
    fileSize,
    onRemove,
    disabled = false,
}: CartItemProps) {

    return (
        <div className="group flex gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200">
            <div className="relative h-28 w-28 flex-shrink-0 rounded-lg overflow-hidden border bg-muted">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
            </div>

            <div className="flex-1 flex flex-col gap-3">
                <div className="space-y-1.5">
                    <Link href={`/marketplace/${productId}`}>
                        <h3 className="font-semibold text-base hover:text-primary transition-colors line-clamp-1">
                            {title}
                        </h3>
                    </Link>
                    <Link href={ROUTES.PROFILE(authorId)}>
                        <p className="text-sm text-muted-foreground">
                            by <span className='hover:text-primary hover:underline transition-colors'>{author}</span>
                        </p>
                    </Link>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {category && (
                        <Badge variant="secondary" className="text-xs font-normal">
                            <Package className="h-3 w-3 mr-1" />
                            {category}
                        </Badge>
                    )}
                    {fileFormat && (
                        <Badge variant="outline" className="text-xs font-normal">
                            <FileType className="h-3 w-3 mr-1" />
                            {fileFormat}
                        </Badge>
                    )}
                    {fileSize && (
                        <Badge variant="outline" className="text-xs font-normal">
                            <HardDrive className="h-3 w-3 mr-1" />
                            {fileSize}
                        </Badge>
                    )}
                </div>

                <div className="mt-auto">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(id)}
                        disabled={disabled}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 -ml-2"
                    >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-end justify-between flex-shrink-0">
                <div className="text-right space-y-1">
                    <p className="font-bold text-xl">{price.toLocaleString('vi-VN')} ₫</p>
                    {originalPrice && (
                        <div className="space-y-0.5">
                            <p className="text-sm text-muted-foreground line-through">
                                {originalPrice.toLocaleString('vi-VN')} ₫
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
