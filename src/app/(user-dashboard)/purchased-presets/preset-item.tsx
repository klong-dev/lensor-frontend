"use client"

import { Button } from "@/components/ui/button"
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Download, Flag, ExternalLink, MoreVertical } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Type definition
type PurchasedPreset = {
     id: string
     title: string
     description: string
     thumbnail: string
     price: number
     category: string
     author: {
          name: string
          avatar?: string
     }
     rating?: number
     purchasedDate: string
}

interface PresetItemProps {
     preset: PurchasedPreset
     onDownload: (id: string) => void
     onReport: (id: string) => void
}

export default function PresetItem({ preset, onDownload, onReport }: PresetItemProps) {
     return (
          <div className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
               {/* Preview Image */}
               <Link href={`/marketplace/${preset.id}`} className="flex-shrink-0">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden group">
                         <Image
                              src={preset.thumbnail || '/images/default-fallback-image.png'}
                              alt={preset.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                         />
                    </div>
               </Link>

               {/* Content */}
               <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                         <div className="flex-1 min-w-0">
                              <Link
                                   href={`/marketplace/${preset.id}`}
                                   className="font-semibold text-lg hover:text-primary transition-colors truncate block"
                              >
                                   {preset.title}
                              </Link>
                              <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                                   {preset.description}
                              </p>
                         </div>

                         {/* Actions Dropdown */}
                         <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                   <Button variant="ghost" size="icon" className="flex-shrink-0">
                                        <MoreVertical className="h-4 w-4" />
                                   </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                   <DropdownMenuItem onClick={() => onDownload(preset.id)}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                   </DropdownMenuItem>
                                   <DropdownMenuItem asChild>
                                        <Link href={`/marketplace/${preset.id}`}>
                                             <ExternalLink className="mr-2 h-4 w-4" />
                                             View Product
                                        </Link>
                                   </DropdownMenuItem>
                                   <DropdownMenuSeparator />
                                   <DropdownMenuItem
                                        onClick={() => onReport(preset.id)}
                                        className="text-red-600"
                                   >
                                        <Flag className="mr-2 h-4 w-4" />
                                        Report Issue
                                   </DropdownMenuItem>
                              </DropdownMenuContent>
                         </DropdownMenu>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mt-3">
                         {/* Author */}
                         <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                   <AvatarImage src={preset.author.avatar} alt={preset.author.name} />
                                   <AvatarFallback className="text-xs">
                                        {preset.author.name.charAt(0).toUpperCase()}
                                   </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">{preset.author.name}</span>
                         </div>

                         {/* Category */}
                         <Badge variant="secondary" className="capitalize">
                              {preset.category}
                         </Badge>

                         {/* Price */}
                         <span className="text-sm font-semibold">
                              ${preset.price.toFixed(2)}
                         </span>

                         {/* Purchase Date */}
                         <span className="text-sm text-muted-foreground">
                              {new Date(preset.purchasedDate).toLocaleDateString("en-US", {
                                   month: "short",
                                   day: "numeric",
                                   year: "numeric",
                              })}
                         </span>
                    </div>
               </div>
          </div>
     )
}
