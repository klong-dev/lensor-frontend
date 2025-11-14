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
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProductManagement() {
     const router = useRouter()
     const { data: marketplaceData, error, isLoading, mutate } = useOwnProducts()
     const [editDialogOpen, setEditDialogOpen] = useState(false)
     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

     const data: Product[] = marketplaceData?.data?.map((item: MarketplaceItem & { reviewCount?: number, sellCount?: number }) => ({
          id: item?.id,
          imageBefore: `${BASE_URL}${item?.thumbnail}`,
          imageAfter: `${BASE_URL}${item?.image}`,
          title: item?.title,
          price: item?.price.toString(),
          description: item?.description,
          category: item?.category,
          author: item?.author?.name,
          rating: item?.rating || 0,
          reviewCount: item?.reviewCount || 0,
          sellCount: item?.sellCount || 0
     })) || []

     const handleEdit = (id: string) => {
          const product = data.find(p => p.id === id)
          if (product) {
               setSelectedProduct(product)
               setEditDialogOpen(true)
          }
     }

     const handleDelete = (id: string) => {
          const product = data.find(p => p.id === id)
          if (product) {
               setSelectedProduct(product)
               setDeleteDialogOpen(true)
          }
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
          handleViewProduct
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

               {selectedProduct && (
                    <>
                         <EditProductDialog
                              open={editDialogOpen}
                              onOpenChange={setEditDialogOpen}
                              product={selectedProduct}
                              onSuccess={handleEditSuccess}
                         />
                         <DeleteProductDialog
                              open={deleteDialogOpen}
                              onOpenChange={setDeleteDialogOpen}
                              product={selectedProduct}
                              onSuccess={handleDeleteSuccess}
                         />
                    </>
               )}
          </div>
     )
}


