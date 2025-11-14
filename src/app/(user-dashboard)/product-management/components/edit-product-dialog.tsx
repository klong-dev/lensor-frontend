"use client"

import { useState, useEffect } from "react"
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
import { marketplaceApi } from "@/lib/apis/marketplaceApi"
import { toast } from "sonner"

interface EditProductDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    product: {
        id: string
        title: string
        description?: string
        price: string
        category?: string
    }
    onSuccess?: () => void
}

export function EditProductDialog({ open, onOpenChange, product, onSuccess }: EditProductDialogProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: product.title,
        description: product.description || "",
        price: product.price,
        category: product.category || "Presets"
    })
    const [displayPrice, setDisplayPrice] = useState("")

    useEffect(() => {
        setFormData({
            title: product.title,
            description: product.description || "",
            price: product.price,
            category: product.category || "Presets"
        })
        setDisplayPrice(Number(product.price).toLocaleString('vi-VN'))
    }, [product])

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\./g, '')
        if (value === '' || /^\d+$/.test(value)) {
            setFormData({ ...formData, price: value })
            setDisplayPrice(value ? Number(value).toLocaleString('vi-VN') : '')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await marketplaceApi.update(product.id, {
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
            })

            toast.success("Product updated successfully")

            onOpenChange(false)
            onSuccess?.()
        } catch (error) {
            console.error("Error updating product:", error)
            toast.error("Failed to update product. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[525px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                            Make changes to your product here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Product title"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Product description"
                                rows={4}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price (₫)</Label>
                            <Input
                                id="price"
                                type="text"
                                value={displayPrice}
                                onChange={handlePriceChange}
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
