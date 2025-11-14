"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { OrderProductDetail } from "@/types/order"
import { Download, ExternalLink, Star, Check, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useState } from "react"

interface ProductDetailItemProps {
    product: OrderProductDetail
}

export default function ProductDetailItem({ product }: ProductDetailItemProps) {
    const { productDetails } = product
    const [showDetails, setShowDetails] = useState(false)
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005'

    const getFullImageUrl = (url: string) => {
        if (!url) return '/images/default-fallback-image.png'
        if (url.startsWith('http')) return url
        return `${baseUrl}${url}`
    }

    const handleDownload = async (fileUrl: string, fileName: string) => {
        try {
            const link = document.createElement('a')
            link.href = fileUrl
            link.download = fileName
            link.target = '_blank'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            toast.success('Download started', {
                description: `Downloading ${fileName}`,
            })
        } catch (error) {
            console.error('Download error:', error)
            toast.error('Download failed', {
                description: 'Failed to download the file. Please try again.',
            })
        }
    }

    const handleDownloadAll = async () => {
        if (!productDetails.presetFiles || productDetails.presetFiles.length === 0) {
            toast.error('No files available')
            return
        }

        toast.success('Download started', {
            description: `Downloading ${productDetails.presetFiles.length} file(s)`,
        })

        for (let i = 0; i < productDetails.presetFiles.length; i++) {
            const file = productDetails.presetFiles[i]
            const fullFileUrl = file.startsWith('http') ? file : `${baseUrl}${file}`
            const fileName = file.split('/').pop() || `preset-${i + 1}`

            setTimeout(() => {
                handleDownload(fullFileUrl, fileName)
            }, i * 300)
        }
    }

    return (
        <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-shrink-0">
                    <Link href={`/marketplace/${product.productId}`}>
                        <div className="relative w-full lg:w-48 h-48 rounded-lg overflow-hidden group">
                            <Image
                                src={getFullImageUrl(productDetails.thumbnail || productDetails.image)}
                                alt={productDetails.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                unoptimized
                            />
                        </div>
                    </Link>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                            <Link
                                href={`/marketplace/${product.productId}`}
                                className="text-2xl font-bold hover:text-primary transition-colors block mb-2"
                            >
                                {productDetails.name}
                            </Link>
                            <p className="text-muted-foreground line-clamp-2 mb-3">
                                {productDetails.description}
                            </p>

                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={productDetails.author.avatar} alt={productDetails.author.name} />
                                        <AvatarFallback>
                                            {productDetails.author.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{productDetails.author.name}</span>
                                </div>

                                {productDetails.category && (
                                    <Badge variant="secondary" className="capitalize">
                                        {productDetails.category}
                                    </Badge>
                                )}

                                {productDetails.rating > 0 && (
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium">{productDetails.rating}</span>
                                        <span className="text-sm text-muted-foreground">
                                            ({productDetails.reviewCount})
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                            <div className="text-2xl font-bold mb-1">
                                {product.price.toLocaleString('vi-VN')} ₫
                            </div>
                            {productDetails.originalPrice > productDetails.price && (
                                <div className="text-sm text-muted-foreground line-through">
                                    {productDetails.originalPrice.toLocaleString('vi-VN')} ₫
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Download Files</h3>
                                <p className="text-sm text-muted-foreground">
                                    {productDetails.presetFiles.length} file(s) available • {productDetails.fileSize}
                                </p>
                            </div>
                            <Button onClick={handleDownloadAll} size="lg">
                                <Download className="mr-2 h-5 w-5" />
                                Download All
                            </Button>
                        </div>

                        <div className="space-y-2">
                            {productDetails.presetFiles.map((file, index) => {
                                const fileName = file.split('/').pop() || `preset-${index + 1}`
                                const fullFileUrl = file.startsWith('http') ? file : `${baseUrl}${file}`
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-background rounded-md border"
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                                                <Download className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{fileName}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {productDetails.fileFormat}
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDownload(fullFileUrl, fileName)}
                                        >
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="border rounded-lg">
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                            <span className="font-semibold">Product Details & Specifications</span>
                            <ChevronDown className={`h-5 w-5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                        </button>

                        {showDetails && (
                            <div className="p-4 border-t">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {productDetails.compatibility && productDetails.compatibility.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-2">Compatibility</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {productDetails.compatibility.map((item, idx) => (
                                                    <Badge key={idx} variant="outline">{item}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {productDetails.features && productDetails.features.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-2">Features</h4>
                                            <ul className="space-y-1">
                                                {productDetails.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm">
                                                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {productDetails.specifications && (
                                        <>
                                            {productDetails.specifications.adjustments && productDetails.specifications.adjustments.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold mb-2">Adjustments</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {productDetails.specifications.adjustments.map((item, idx) => (
                                                            <Badge key={idx} variant="secondary">{item}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {productDetails.specifications.bestFor && productDetails.specifications.bestFor.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold mb-2">Best For</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {productDetails.specifications.bestFor.map((item, idx) => (
                                                            <Badge key={idx} variant="secondary">{item}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {productDetails.specifications.difficulty && (
                                                <div>
                                                    <h4 className="font-semibold mb-2">Difficulty Level</h4>
                                                    <Badge>{productDetails.specifications.difficulty}</Badge>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {productDetails.tags && productDetails.tags.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-2">Tags</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {productDetails.tags.map((tag, idx) => (
                                                    <Badge key={idx} variant="outline">{tag}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {productDetails.warranty && (
                                        <div className="md:col-span-2">
                                            <h4 className="font-semibold mb-3">Warranty & Support</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <p className="text-sm font-medium mb-1">Duration</p>
                                                    <p className="text-sm text-muted-foreground">{productDetails.warranty.duration}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium mb-1">Coverage</p>
                                                    <p className="text-sm text-muted-foreground">{productDetails.warranty.coverage}</p>
                                                </div>
                                                {productDetails.warranty.terms && productDetails.warranty.terms.length > 0 && (
                                                    <div>
                                                        <p className="text-sm font-medium mb-2">Terms</p>
                                                        <ul className="space-y-1">
                                                            {productDetails.warranty.terms.map((term, idx) => (
                                                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                                    <Check className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                                                                    <span>{term}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Button variant="outline" asChild className="flex-1">
                            <Link href={`/marketplace/${product.productId}`}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View in Marketplace
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}

