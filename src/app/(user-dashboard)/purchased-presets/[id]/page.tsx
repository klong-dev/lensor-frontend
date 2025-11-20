"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOrderProducts } from "@/lib/hooks/useOrderHooks"
import { ArrowLeft, Calendar, Package, Loader2, Download } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import OrderProductsList from "./components/order-products-list"
import ReportDialog from "../components/report-dialog"
import { toast } from "sonner"

export default function OrderDetailPage() {
    const params = useParams()
    const router = useRouter()
    const orderId = params.id as string

    const { data, isLoading, error } = useOrderProducts(orderId)
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005'

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500/10 text-green-600 border-green-500/20'
            case 'pending':
                return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
            case 'cancelled':
                return 'bg-red-500/10 text-red-600 border-red-500/20'
            case 'refunded':
                return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
            default:
                return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
        }
    }

    const handleDownloadAllOrderFiles = async () => {
        if (!data?.data?.products || data.data.products.length === 0) {
            toast.error('No products available')
            return
        }

        toast.loading('Preparing all files for download...', { id: 'order-zip-download' })

        try {
            const JSZip = (await import('jszip')).default
            const zip = new JSZip()

            for (const product of data.data.products) {
                const { productDetails } = product
                if (!productDetails.presetFiles || productDetails.presetFiles.length === 0) {
                    continue
                }

                const productFolderName = productDetails.name
                    .replace(/[^a-z0-9\s]/gi, '_')
                    .replace(/\s+/g, '_')
                    .toLowerCase()

                const fetchPromises = productDetails.presetFiles.map(async (file, index) => {
                    const fullFileUrl = file.startsWith('http') ? file : `${baseUrl}${file}`
                    const fileName = file.split('/').pop() || `preset-${index + 1}`

                    try {
                        const response = await fetch(fullFileUrl)
                        if (!response.ok) throw new Error(`Failed to fetch ${fileName}`)
                        const blob = await response.blob()
                        zip.file(`${productFolderName}/${fileName}`, blob)
                    } catch (error) {
                        console.error(`Error fetching ${fileName}:`, error)
                        toast.error(`Failed to fetch ${fileName}`, { id: 'order-zip-download' })
                    }
                })

                await Promise.all(fetchPromises)
            }

            const zipBlob = await zip.generateAsync({ type: 'blob' })

            const link = document.createElement('a')
            link.href = URL.createObjectURL(zipBlob)
            link.download = `order_${orderId.slice(0, 8)}_all_products.zip`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(link.href)

            const totalFiles = data.data.products.reduce(
                (sum, product) => sum + (product.productDetails.presetFiles?.length || 0),
                0
            )

            toast.success('Download completed', {
                id: 'order-zip-download',
                description: `Downloaded ${totalFiles} file(s) from ${data.data.products.length} product(s) as ZIP`,
            })
        } catch (error) {
            console.error('Download error:', error)
            toast.error('Download failed', {
                id: 'order-zip-download',
                description: 'Failed to create ZIP file. Please try again.',
            })
        }
    }

    if (isLoading) {
        return (
            <div className="p-5">
                <div className="text-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Loading order details...</p>
                </div>
            </div>
        )
    }

    if (error || !data?.data) {
        return (
            <div className="p-5">
                <div className="text-center py-12 border rounded-lg border-red-200 bg-red-50">
                    <p className="text-red-600 mb-4">Failed to load order details</p>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Retry
                    </Button>
                </div>
            </div>
        )
    }

    const orderData = data.data
    const firstProduct = orderData.products[0]

    return (
        <div className="p-5 space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push('/purchased-presets')}
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">Order Details</h1>
                    <p className="text-muted-foreground mt-1">
                        Order #{orderId.slice(0, 8)}
                    </p>
                </div>
            </div>

            <Card className="p-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="text-sm text-muted-foreground">Status</div>
                        <Badge className={getStatusColor(orderData.status)}>
                            {orderData.status}
                        </Badge>
                    </div>
                    {orderData.status === 'completed' && (
                        <ReportDialog
                            orderId={orderId}
                            products={orderData.products}
                        />
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                        <div className="text-xl font-bold">
                            {parseFloat(orderData.totalAmount).toLocaleString('vi-VN')} ₫
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                            <Package className="h-4 w-4" />
                            Products
                        </div>
                        <div className="text-xl font-semibold">
                            {orderData.products.length}
                        </div>
                    </div>

                    {firstProduct?.productDetails && (
                        <div>
                            <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Order Date
                            </div>
                            <div className="text-base font-medium">
                                {new Date(firstProduct.productDetails.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Products in this Order</h2>
                    {orderData.products.length > 1 && (
                        <Button
                            onClick={handleDownloadAllOrderFiles}
                            size="lg"
                            className="gap-2"
                        >
                            <Download className="h-5 w-5" />
                            Download All Product Files
                        </Button>
                    )}
                </div>
                <OrderProductsList products={orderData.products} />
            </div>
        </div>
    )
}