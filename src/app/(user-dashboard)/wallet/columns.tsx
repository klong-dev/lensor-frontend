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
import { Transaction } from "@/types/wallet"

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
               <div className="font-medium max-w-[120px] truncate" title={row.getValue("transactionId") || "N/A"}>
                    {row.getValue("transactionId") || "N/A"}
               </div>
          ),
     },
     {
          accessorKey: "transactionType",
          header: "Type",
          cell: ({ row }) => (
               <div className="capitalize font-medium min-w-[80px]">{row.getValue("transactionType")}</div>
          ),
     },
     {
          accessorKey: "status",
          header: "Status",
          cell: ({ row }) => {
               const status = row.getValue("status") as string
               return (
                    <div
                         className={`capitalize font-medium min-w-[90px] ${status === "completed"
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
                    Payment
                    <ArrowUpDown className="ml-2 h-4 w-4" />
               </Button>
          ),
          cell: ({ row }) => (
               <div className="uppercase font-medium min-w-[80px]">{row.getValue("paymentMethod")}</div>
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
          cell: ({ row }) => (
               <div className="max-w-[200px] truncate" title={row.getValue("description")}>
                    {row.getValue("description")}
               </div>
          ),
     },
     {
          accessorKey: "amount",
          header: () => <div className="text-right">Amount</div>,
          cell: ({ row }) => {
               const amount = parseFloat(row.getValue("amount"))
               const formatted = amount.toLocaleString("vi-VN")

               return <div className="text-right font-bold min-w-[120px]">{formatted} ₫</div>
          },
     },
     {
          accessorKey: "createdAt",
          header: "Date",
          cell: ({ row }) => {
               const date = new Date(row.getValue("createdAt"))
               return (
                    <div className="min-w-[140px]" title={date.toLocaleString("vi-VN")}>
                         {date.toLocaleDateString("vi-VN")}
                    </div>
               )
          },
     },
]