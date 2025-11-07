"use client"

import { Button } from "@/components/ui/button"
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PurchasedPreset } from '@/types/marketplace'
import { Download, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from 'react'
import { toast } from "sonner"
import PresetItem from "./preset-item"

export default function PurchasedPresets() {
     const router = useRouter()
     const [searchQuery, setSearchQuery] = useState("")
     const [reportDialogOpen, setReportDialogOpen] = useState(false)
     const [selectedPresetId, setSelectedPresetId] = useState("")
     const [reportMessage, setReportMessage] = useState("")

     // Mock data - replace with API call
     const [presets] = useState<PurchasedPreset[]>([
          {
               id: "preset_1",
               title: "Cinematic Portrait Pack",
               description: "Professional portrait presets with cinematic color grading for stunning photos",
               thumbnail: "/images/default-fallback-image.png",
               price: 24.99,
               category: "portrait",
               author: {
                    name: "John Doe",
                    avatar: undefined,
               },
               rating: 4.8,
               purchasedDate: "2024-10-15",
          },
          {
               id: "preset_2",
               title: "Moody Landscape Collection",
               description: "Dark and moody presets perfect for landscape and outdoor photography",
               thumbnail: "/images/default-fallback-image.png",
               price: 19.99,
               category: "landscape",
               author: {
                    name: "Jane Smith",
                    avatar: undefined,
               },
               rating: 4.9,
               purchasedDate: "2024-10-20",
          },
          {
               id: "preset_3",
               title: "Vintage Film Look",
               description: "Classic film-inspired presets for that nostalgic aesthetic",
               thumbnail: "/images/default-fallback-image.png",
               price: 15.99,
               category: "vintage",
               author: {
                    name: "Bob Wilson",
                    avatar: undefined,
               },
               rating: 4.7,
               purchasedDate: "2024-09-10",
          },
     ])

     // Filter presets by search
     const filteredPresets = presets.filter(preset =>
          preset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          preset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          preset.author.name.toLowerCase().includes(searchQuery.toLowerCase())
     )

     // Action handlers
     const handleDownload = (id: string) => {
          const preset = presets.find(p => p.id === id)
          toast.success("Download Started", {
               description: `Downloading "${preset?.title}"...`,
          })
          // TODO: Implement actual download logic
          console.log("Downloading preset:", id)
     }

     const handleReport = (id: string) => {
          setSelectedPresetId(id)
          setReportDialogOpen(true)
     }

     const handleSubmitReport = () => {
          if (!reportMessage.trim()) {
               toast.error("Error", {
                    description: "Please provide details about the issue.",
               })
               return
          }

          const preset = presets.find(p => p.id === selectedPresetId)
          toast.success("Report Submitted", {
               description: `Thank you for reporting an issue with "${preset?.title}".`,
          })

          // TODO: Send report to API
          console.log("Report submitted:", { presetId: selectedPresetId, message: reportMessage })

          setReportDialogOpen(false)
          setReportMessage("")
          setSelectedPresetId("")
     }

     return (
          <div className="p-5 space-y-6">
               {/* Header */}
               <div className="flex items-center justify-between">
                    <div>
                         <h1 className="text-3xl font-bold">Purchased Presets</h1>
                         <p className="text-muted-foreground mt-1">
                              Manage and download your purchased presets
                         </p>
                    </div>

                    <Button variant="outline">
                         <Download className="h-4 w-4 mr-2" />
                         Download All
                    </Button>
               </div>

               {/* Stats */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card p-4 rounded-lg border">
                         <div className="text-2xl font-bold">{presets.length}</div>
                         <div className="text-sm text-muted-foreground">Total Presets</div>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                         <div className="text-2xl font-bold">
                              ${presets.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                         </div>
                         <div className="text-sm text-muted-foreground">Total Spent</div>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                         <div className="text-2xl font-bold">
                              {new Set(presets.map(p => p.category)).size}
                         </div>
                         <div className="text-sm text-muted-foreground">Categories</div>
                    </div>
               </div>

               {/* Search */}
               <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                         placeholder="Search presets by title, description or author..."
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         className="pl-10"
                    />
               </div>

               {/* Presets List */}
               <div className="space-y-3">
                    {filteredPresets.length > 0 ? (
                         filteredPresets.map((preset) => (
                              <PresetItem
                                   key={preset.id}
                                   preset={preset}
                                   onDownload={handleDownload}
                                   onReport={handleReport}
                              />
                         ))
                    ) : (
                         <div className="text-center py-12 border rounded-lg">
                              <p className="text-muted-foreground mb-4">
                                   {searchQuery ? "No presets found matching your search." : "No purchased presets yet."}
                              </p>
                              {!searchQuery && (
                                   <Button onClick={() => router.push("/marketplace")}>
                                        Browse Marketplace
                                   </Button>
                              )}
                         </div>
                    )}
               </div>

               {/* Report Dialog */}
               <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
                    <DialogContent>
                         <DialogHeader>
                              <DialogTitle>Report Issue</DialogTitle>
                              <DialogDescription>
                                   Describe the issue you're experiencing with this preset.
                              </DialogDescription>
                         </DialogHeader>

                         <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                   <Label htmlFor="report-message">Issue Description</Label>
                                   <Textarea
                                        id="report-message"
                                        placeholder="Describe the problem in detail..."
                                        value={reportMessage}
                                        onChange={(e) => setReportMessage(e.target.value)}
                                        rows={5}
                                   />
                              </div>
                         </div>

                         <DialogFooter>
                              <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
                                   Cancel
                              </Button>
                              <Button onClick={handleSubmitReport}>
                                   Submit Report
                              </Button>
                         </DialogFooter>
                    </DialogContent>
               </Dialog>
          </div>
     )
}
