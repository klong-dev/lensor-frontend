"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Ban, MoreHorizontal, Star } from "lucide-react"
import Image from "next/image"

export type Product = {
     id: string
     imageBefore: string
     imageAfter: string
     title: string
     price: string
     description?: string
     category?: string
     author?: string
     rating?: number
     reviewCount?: number
     sellCount?: number
     originalPrice?: string
     discount?: number
     status?: 'active' | 'inactive' | 'blocked'
     tags?: string[]
     compatibility?: string[]
     features?: string[]
     specifications?: {
          adjustments?: string[]
          bestFor?: string[]
          difficulty?: string
     }
     imagePairs?: Array<{ before: string; after: string }>
     presetFiles?: Array<{ url: string; fileName: string; fileSize?: number; format: string }>
     fileFormat?: string
     fileSize?: string
     thumbnail?: string
}

export const createProductColumns = (
     onEdit: (id: string) => void,
     onDelete: (id: string) => void,
     onViewProduct: (id: string) => void,
     onBlockedProductClick: (id: string, title: string) => void
): ColumnDef<Product>[] => [
          {
               id: "select",
               header: ({ table }) => (
                    <Checkbox
                         checked={
                              table.getIsAllPageRowsSelected() ||
                              (table.getIsSomePageRowsSelected() && "indeterminate")
                         }
                         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                         aria-label="Select all"
                    />
               ),
               cell: ({ row }) => (
                    <Checkbox
                         checked={row.getIsSelected()}
                         onCheckedChange={(value) => row.toggleSelected(!!value)}
                         aria-label="Select row"
                         disabled={row.original.status === 'blocked'}
                    />
               ),
               enableSorting: false,
               enableHiding: false,
          },
          {
               accessorKey: "id",
               header: ({ column }) => (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         ID
                         <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
               ),
               cell: ({ row }) => (
                    <div className={`font-medium ${row.original.status === 'blocked' ? 'opacity-40' : ''}`}>
                         {row.getValue("id")}
                    </div>
               ),
          },
          {
               accessorKey: "imageAfter",
               header: "Image",
               cell: ({ row }) => {
                    const isBlocked = row.original.status === 'blocked'
                    return (
                         <div className={`w-25 h-20 relative ${isBlocked ? 'opacity-40' : ''}`}>
                              <Image
                                   src={row.getValue("imageAfter")}
                                   alt="After"
                                   fill
                                   className="object-cover rounded"
                              />
                         </div>
                    )
               },
          },
          {
               accessorKey: "title",
               header: ({ column }) => (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Title
                         <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
               ),
               cell: ({ row }) => (
                    <div className={`truncate w-36 ${row.original.status === 'blocked' ? 'opacity-40' : ''}`}>
                         {row.getValue("title")}
                    </div>
               ),
          },
          {
               accessorKey: "price",
               header: ({ column }) => (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Price
                         <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
               ),
               cell: ({ row }) => (
                    <div className={`font-medium ${row.original.status === 'blocked' ? 'opacity-40' : ''}`}>
                         {Number(row.getValue("price")).toLocaleString('vi-VN')} ₫
                    </div>
               ),
          },
          {
               accessorKey: "rating",
               header: ({ column }) => (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Rating
                         <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
               ),
               cell: ({ row }) => (
                    <div className={`flex items-center gap-1 ${row.original.status === 'blocked' ? 'opacity-40' : ''}`}>
                         <span className="text-yellow-500"><Star fill="yellow" stroke="none" size={18} /></span>
                         <span>{row.getValue("rating") || 0}</span>
                    </div>
               ),
          },
          {
               accessorKey: "reviewCount",
               header: ({ column }) => (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Reviews
                         <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
               ),
               cell: ({ row }) => (
                    <div className={row.original.status === 'blocked' ? 'opacity-40' : ''}>
                         {row.getValue("reviewCount") || 0}
                    </div>
               ),
          },
          {
               accessorKey: "sellCount",
               header: ({ column }) => (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Sold
                         <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
               ),
               cell: ({ row }) => (
                    <div className={row.original.status === 'blocked' ? 'opacity-40' : ''}>
                         {row.getValue("sellCount") || 0}
                    </div>
               ),
          },
          {
               id: "actions",
               header: "Actions",
               cell: ({ row }) => {
                    const product = row.original
                    const isBlocked = product.status === 'blocked'

                    if (isBlocked) {
                         return (
                              <Button
                                   variant="secondary"
                                   size="sm"
                                   className="bg-red-500 hover:bg-red-600"
                                   onClick={() => onBlockedProductClick(product.id, product.title)}
                              >
                                   <Ban />
                              </Button>
                         )
                    }

                    return (
                         <DropdownMenu>
                              <DropdownMenuTrigger asChild className="cursor-pointer">
                                   <MoreHorizontal className="h-4 w-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                   <DropdownMenuItem
                                        onClick={() => onViewProduct(product.id)}
                                        className="cursor-pointer"
                                   >
                                        View product
                                   </DropdownMenuItem>
                                   <DropdownMenuItem
                                        onClick={() => onEdit(product.id)}
                                        className="cursor-pointer"
                                   >
                                        Edit
                                   </DropdownMenuItem>
                                   <DropdownMenuItem
                                        className="text-red-600 cursor-pointer"
                                        onClick={() => onDelete(product.id)}
                                   >
                                        Delete
                                   </DropdownMenuItem>
                              </DropdownMenuContent>
                         </DropdownMenu>
                    )
               },
          },
     ]
