"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/path"
import { BASE_URL } from "@/constants"
import { DataTable } from '@/components/ui/data-table-advanced'
import { createProductColumns, Product } from "./components/columns"
import { useOwnProducts } from "@/lib/hooks/useMarketplaceHooks"
import { MarketplaceItem } from "@/types/marketplace"
import { EditProductDialog } from "./components/edit-product-dialog"
import { DeleteProductDialog } from "./components/delete-product-dialog"
import { BlockedProductDialog } from "./components/blocked-product-dialog"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProductManagement() {
     const router = useRouter()
     const { data: marketplaceData, error, isLoading, mutate } = useOwnProducts()
     const [editDialogOpen, setEditDialogOpen] = useState(false)
     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
     const [blockedDialogOpen, setBlockedDialogOpen] = useState(false)
     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
     const [selectedProductId, setSelectedProductId] = useState<string>("")
     const [blockedProductInfo, setBlockedProductInfo] = useState<{ id: string; title: string } | null>(null)

     const data: Product[] = marketplaceData?.data?.map((item: MarketplaceItem & {
          reviewCount?: number,
          sellCount?: number,
          originalPrice?: number,
          discount?: number,
          tags?: string[],
          compatibility?: string[],
          features?: string[],
          specifications?: {
               adjustments?: string[]
               bestFor?: string[]
               difficulty?: string
          },
          fileFormat?: string,
          fileSize?: string
     }) => ({
          id: item?.id,
          imageBefore: `${BASE_URL}${item?.thumbnail}`,
          imageAfter: `${BASE_URL}${item?.thumbnail}`,
          title: item?.title,
          price: item?.price.toString(),
          originalPrice: item?.originalPrice?.toString(),
          description: item?.description,
          category: item?.category,
          author: item?.author?.name,
          rating: item?.rating || 0,
          reviewCount: item?.reviewCount || 0,
          sellCount: item?.sellCount || 0,
          status: item?.status,
          discount: item?.discount,
          tags: item?.tags,
          compatibility: item?.compatibility,
          features: item?.features,
          specifications: item?.specifications,
          imagePairs: item?.imagePairs?.map(pair => ({
               before: `${BASE_URL}${pair.before}`,
               after: `${BASE_URL}${pair.after}`
          })),
          presetFiles: item?.presetFiles,
          fileFormat: item?.fileFormat,
          fileSize: item?.fileSize
     })) || []

     const handleEdit = (id: string) => {
          const product = data.find(p => p.id === id)
          if (product) {
               if (product.status === 'blocked') {
                    setBlockedProductInfo({ id: product.id, title: product.title })
                    setBlockedDialogOpen(true)
                    return
               }
               setSelectedProductId(id)
               setEditDialogOpen(true)
          }
     }

     const handleDelete = (id: string) => {
          const product = data.find(p => p.id === id)
          if (product) {
               if (product.status === 'blocked') {
                    setBlockedProductInfo({ id: product.id, title: product.title })
                    setBlockedDialogOpen(true)
                    return
               }
               setSelectedProduct(product)
               setDeleteDialogOpen(true)
          }
     }

     const handleBlockedProductClick = (id: string, title: string) => {
          setBlockedProductInfo({ id, title })
          setBlockedDialogOpen(true)
     }

     const handleEditSuccess = () => {
          mutate()
     }

     const handleDeleteSuccess = () => {
          mutate()
     }

     const handleViewProduct = (id: string) => {
          router.push(`${ROUTES.MARKETPLACE}/${id}`)
     }

     const columns = createProductColumns(
          handleEdit,
          handleDelete,
          handleViewProduct,
          handleBlockedProductClick
     )

     if (isLoading) {
          return (
               <div className="p-5">
                    <div className="bg-accent w-full p-5 rounded-2xl shadow-2xl border">
                         <h1 className="text-2xl font-bold mb-4">Product Management</h1>
                         <p className="text-muted-foreground">Loading products...</p>
                    </div>
               </div>
          )
     }

     if (error) {
          return (
               <div className="p-5">
                    <div className="bg-accent w-full p-5 rounded-2xl shadow-2xl border">
                         <h1 className="text-2xl font-bold mb-4">Product Management</h1>
                         <p className="text-red-500">Error loading products. Please try again.</p>
                    </div>
               </div>
          )
     }

     return (
          <div className="p-5">
               <div className="bg-accent w-full p-5 rounded-2xl shadow-2xl border">
                    <div className="flex justify-between items-center ">
                         <h1 className="text-2xl font-bold mb-4">Product Management</h1>
                         <Link href={'/create-product'}>
                              <Button>Create Product</Button>
                         </Link>
                    </div>
                    <DataTable
                         columns={columns}
                         data={data}
                         searchKey="title"
                         searchPlaceholder="Filter by product title..."
                         pageSize={10}
                    />
               </div>

               {selectedProductId && (
                    <EditProductDialog
                         open={editDialogOpen}
                         onOpenChange={setEditDialogOpen}
                         productId={selectedProductId}
                         onSuccess={handleEditSuccess}
                    />
               )}

               {selectedProduct && (
                    <DeleteProductDialog
                         open={deleteDialogOpen}
                         onOpenChange={setDeleteDialogOpen}
                         product={selectedProduct}
                         onSuccess={handleDeleteSuccess}
                    />
               )}

               {blockedProductInfo && (
                    <BlockedProductDialog
                         open={blockedDialogOpen}
                         onOpenChange={setBlockedDialogOpen}
                         productTitle={blockedProductInfo.title}
                    />
               )}
          </div>
     )
}


