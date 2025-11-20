"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Upload, X, FileWarning, Loader2, Image as ImageIcon } from "lucide-react"
import { useCreateReport } from "@/lib/hooks/useReportHooks"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrderProductDetail } from "@/types/order"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"

type ReportDialogProps = {
    orderId: string
    products: OrderProductDetail[]
    disabled?: boolean
}

export default function ReportDialog({ orderId, products, disabled }: ReportDialogProps) {
    const [open, setOpen] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState<string>("")
    const [reason, setReason] = useState("")
    const [evidenceFiles, setEvidenceFiles] = useState<File[]>([])
    const [evidencePreviews, setEvidencePreviews] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { createReportWithFiles } = useCreateReport()

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length === 0) return

        if (evidenceFiles.length + files.length > 5) {
            toast.error("Maximum 5 evidence files allowed")
            return
        }

        const validFiles = files.filter(file => {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm']
            const maxSize = 10 * 1024 * 1024 // 10MB

            if (!validTypes.includes(file.type)) {
                toast.error(`Invalid file type: ${file.name}. Supported: JPG, PNG, GIF, WEBP, MP4, WEBM`)
                return false
            }

            if (file.size > maxSize) {
                toast.error(`File too large: ${file.name}. Maximum size: 10MB`)
                return false
            }

            return true
        })

        if (validFiles.length === 0) return

        const newPreviews = await Promise.all(
            validFiles.map(file => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader()
                    reader.onloadend = () => resolve(reader.result as string)
                    reader.readAsDataURL(file)
                })
            })
        )

        setEvidenceFiles(prev => [...prev, ...validFiles])
        setEvidencePreviews(prev => [...prev, ...newPreviews])

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleRemoveEvidence = (index: number) => {
        setEvidenceFiles(prev => prev.filter((_, i) => i !== index))
        setEvidencePreviews(prev => prev.filter((_, i) => i !== index))
    }

    const uploadFilesToSupabase = async (files: File[]): Promise<string[]> => {
        const uploadedUrls: string[] = []
        const supabase = createClient()

        for (const file of files) {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
            const filePath = `reports/${fileName}`

            const { error } = await supabase.storage
                .from('evidence')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) {
                console.error('Upload error:', error)
                throw new Error(`Failed to upload ${file.name}`)
            }

            const { data: { publicUrl } } = supabase.storage
                .from('evidence')
                .getPublicUrl(filePath)

            uploadedUrls.push(publicUrl)
        }

        return uploadedUrls
    }

    const handleSubmit = async () => {
        if (!selectedProductId) {
            toast.error("Please select a product to report")
            return
        }

        if (!reason.trim()) {
            toast.error("Please describe the issue")
            return
        }

        setIsSubmitting(true)

        try {
            // Use multipart/form-data upload (API handles file upload automatically)
            await createReportWithFiles({
                orderId,
                productId: selectedProductId,
                reason: reason.trim(),
                evidence: evidenceFiles.length > 0 ? evidenceFiles : undefined
            })

            toast.success("Report submitted successfully! We'll review it within 24-48 hours.")

            setSelectedProductId("")
            setReason("")
            setEvidenceFiles([])
            setEvidencePreviews([])
            setOpen(false)
        } catch (error) {
            console.log(error)
            const errorMessage = error instanceof Error && 'response' in error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || error.message
                : 'Failed to submit report. Please try again.'
            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" disabled={disabled}>
                    <FileWarning className="h-4 w-4 mr-2" />
                    Report Issue
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Report Issue with Product</DialogTitle>
                    <DialogDescription>
                        You can report issues within 3 days after order completion. Please provide detailed information about the problem.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md">
                        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-900 dark:text-amber-200">
                            Reports should only be filed for legitimate issues such as missing files, corrupted presets, or products not matching the description.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="product-select">
                            Select Product <span className="text-red-500">*</span>
                        </Label>
                        <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                            <SelectTrigger id="product-select">
                                <SelectValue placeholder="Choose the product you want to report" />
                            </SelectTrigger>
                            <SelectContent>
                                {products.map((product) => (
                                    <SelectItem key={product.productId} value={product.productId}>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{product.productDetails?.name || product.productTitle}</span>
                                            <span className="text-xs text-muted-foreground">
                                                ({parseFloat(product.price.toString()).toLocaleString('vi-VN')} ₫)
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="report-reason">
                            Issue Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="report-reason"
                            placeholder="Describe the problem in detail (e.g., preset files are corrupted, product doesn't match description, files are missing)..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={5}
                            className="resize-none"
                        />
                        <p className="text-sm text-muted-foreground">
                            {reason.length} characters
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="evidence-files">
                            Evidence (Optional)
                        </Label>
                        <p className="text-sm text-muted-foreground mb-2">
                            Upload images or videos as proof (max 5 files, 10MB each)
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                            Supported formats: JPG, PNG, GIF, WEBP, MP4, WEBM
                        </p>

                        <input
                            ref={fileInputRef}
                            type="file"
                            id="evidence-files"
                            className="hidden"
                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,video/mp4,video/webm"
                            multiple
                            onChange={handleFileSelect}
                            disabled={evidenceFiles.length >= 5}
                        />

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={evidenceFiles.length >= 5 || isSubmitting}
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            {evidenceFiles.length >= 5 ? "Maximum files reached" : "Upload Evidence Files"}
                        </Button>

                        {evidenceFiles.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                {evidenceFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative group border rounded-lg overflow-hidden bg-muted"
                                    >
                                        {file.type.startsWith('image/') ? (
                                            <div className="aspect-video relative">
                                                <Image
                                                    src={evidencePreviews[index]}
                                                    alt={`Evidence ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="aspect-video flex items-center justify-center bg-muted">
                                                <div className="text-center">
                                                    <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                                    <p className="text-xs text-muted-foreground">
                                                        Video: {file.name.substring(0, 20)}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => handleRemoveEvidence(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>

                                        <div className="p-2 bg-background/80 backdrop-blur-sm">
                                            <p className="text-xs truncate">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !selectedProductId || !reason.trim()}
                    >
                        {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        Submit Report
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
