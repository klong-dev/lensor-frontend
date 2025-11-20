"use client"

import * as React from "react"
import {
     ColumnDef,
     ColumnFiltersState,
     flexRender,
     getCoreRowModel,
     getFilteredRowModel,
     getPaginationRowModel,
     getSortedRowModel,
     SortingState,
     useReactTable,
     VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
     DropdownMenu,
     DropdownMenuCheckboxItem,
     DropdownMenuContent,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table"

// Simple and flexible props - easy to extend
interface DataTableProps<TData> {
     columns: ColumnDef<TData>[]
     data: TData[]
     searchKey?: string
     searchPlaceholder?: string
     pageSize?: number
}

export function DataTable<TData>({
     columns,
     data,
     searchKey,
     searchPlaceholder = "Search...",
     pageSize = 10,
}: DataTableProps<TData>) {
     const [sorting, setSorting] = React.useState<SortingState>([])
     const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
     const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
     const [rowSelection, setRowSelection] = React.useState({})

     const table = useReactTable({
          data,
          columns,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
          getSortedRowModel: getSortedRowModel(),
          getFilteredRowModel: getFilteredRowModel(),
          onSortingChange: setSorting,
          onColumnFiltersChange: setColumnFilters,
          onColumnVisibilityChange: setColumnVisibility,
          onRowSelectionChange: setRowSelection,
          state: {
               sorting,
               columnFilters,
               columnVisibility,
               rowSelection,
          },
          initialState: {
               pagination: {
                    pageSize,
               },
          },
     })

     return (
          <div className="w-full space-y-4">
               {/* Toolbar */}
               <div className="flex items-center justify-between gap-4">
                    {searchKey && (
                         <Input
                              placeholder={searchPlaceholder}
                              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                              onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
                              className="max-w-sm"
                         />
                    )}

                    <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="ml-auto">
                                   Columns <ChevronDown className="ml-2 h-4 w-4" />
                              </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end">
                              {table
                                   .getAllColumns()
                                   .filter((column) => column.getCanHide())
                                   .map((column) => (
                                        <DropdownMenuCheckboxItem
                                             key={column.id}
                                             className="capitalize"
                                             checked={column.getIsVisible()}
                                             onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                             {column.id}
                                        </DropdownMenuCheckboxItem>
                                   ))}
                         </DropdownMenuContent>
                    </DropdownMenu>
               </div>

               {/* Table */}
               <div className="rounded-md border">
                    <Table>
                         <TableHeader>
                              {table.getHeaderGroups().map((headerGroup) => (
                                   <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                             <TableHead key={header.id}>
                                                  {header.isPlaceholder
                                                       ? null
                                                       : flexRender(header.column.columnDef.header, header.getContext())}
                                             </TableHead>
                                        ))}
                                   </TableRow>
                              ))}
                         </TableHeader>
                         <TableBody>
                              {table.getRowModel().rows?.length ? (
                                   table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                             {row.getVisibleCells().map((cell) => (
                                                  <TableCell key={cell.id}>
                                                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                  </TableCell>
                                             ))}
                                        </TableRow>
                                   ))
                              ) : (
                                   <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                             No results.
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
               </div>

               {/* Pagination */}
               <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                         {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                              <span>
                                   {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                   {table.getFilteredRowModel().rows.length} row(s) selected
                              </span>
                         ) : (
                              <span>
                                   Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                              </span>
                         )}
                    </div>
                    <div className="flex items-center gap-2">
                         <Button
                              variant="outline"
                              size="sm"
                              onClick={() => table.previousPage()}
                              disabled={!table.getCanPreviousPage()}
                         >
                              Previous
                         </Button>
                         <Button
                              variant="outline"
                              size="sm"
                              onClick={() => table.nextPage()}
                              disabled={!table.getCanNextPage()}
                         >
                              Next
                         </Button>
                    </div>
               </div>
          </div>
     )
}
