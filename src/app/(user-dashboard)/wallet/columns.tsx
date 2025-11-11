"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuLabel,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

// Type definition - easy to sync with API
export type Transaction = {
     id: string
     userId: string
     orderId: string
     paymentMethod: string
     transactionType: string
     amount: string
     currency: string
     status: string
     transactionId: string
     description: string
     metadata: any
     balanceBefore: string
     balanceAfter: string
     createdAt: string
     updatedAt: string
}

// Column definitions - easy to customize
export const transactionColumns: ColumnDef<Transaction>[] = [
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
               />
          ),
          enableSorting: false,
          enableHiding: false,
     },
     {
          accessorKey: "transactionId",
          header: "Transaction ID",
          cell: ({ row }) => (
               <div className="font-medium">{row.getValue("transactionId") || "N/A"}</div>
          ),
     },
     {
          accessorKey: "transactionType",
          header: "Type",
          cell: ({ row }) => (
               <div className="capitalize font-medium">{row.getValue("transactionType")}</div>
          ),
     },
     {
          accessorKey: "status",
          header: "Status",
          cell: ({ row }) => {
               const status = row.getValue("status") as string
               return (
                    <div
                         className={`capitalize font-medium ${status === "completed"
                              ? "text-green-600"
                              : status === "failed"
                                   ? "text-red-600"
                                   : status === "processing"
                                        ? "text-blue-600"
                                        : "text-yellow-600"
                              }`}
                    >
                         {status}
                    </div>
               )
          },
     },
     {
          accessorKey: "paymentMethod",
          header: ({ column }) => (
               <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               >
                    Payment Method
                    <ArrowUpDown className="ml-2 h-4 w-4" />
               </Button>
          ),
          cell: ({ row }) => (
               <div className="uppercase font-medium">{row.getValue("paymentMethod")}</div>
          ),
     },
     {
          accessorKey: "description",
          header: ({ column }) => (
               <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               >
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
               </Button>
          ),
          cell: ({ row }) => <div>{row.getValue("description")}</div>,
     },
     {
          accessorKey: "amount",
          header: () => <div className="text-right">Amount</div>,
          cell: ({ row }) => {
               const amount = parseFloat(row.getValue("amount"))
               const formatted = amount.toLocaleString("vi-VN")

               return <div className="text-right font-bold">{formatted} ₫</div>
          },
     },
     {
          accessorKey: "createdAt",
          header: "Date",
          cell: ({ row }) => {
               const date = new Date(row.getValue("createdAt"))
               return <div>{date.toLocaleString("vi-VN")}</div>
          },
     },
     {
          id: "actions",
          enableHiding: false,
          cell: ({ row }) => {
               const transaction = row.original

               return (
                    <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                   <span className="sr-only">Open menu</span>
                                   <MoreHorizontal className="h-4 w-4" />
                              </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                   onClick={() => navigator.clipboard.writeText(transaction.id)}
                              >
                                   Copy transaction ID
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Download receipt</DropdownMenuItem>
                         </DropdownMenuContent>
                    </DropdownMenu>
               )
          },
     },
]
