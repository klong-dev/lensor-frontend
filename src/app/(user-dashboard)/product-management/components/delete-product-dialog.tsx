"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { marketplaceApi } from "@/lib/apis/marketplaceApi"
import { toast } from "sonner"

interface DeleteProductDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    product: {
        id: string
        title: string
    }
    onSuccess?: () => void
}

export function DeleteProductDialog({ open, onOpenChange, product, onSuccess }: DeleteProductDialogProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () => {
        setIsLoading(true)

        try {
            await marketplaceApi.delete(product.id)
            toast.success("Product deleted successfully")

            onOpenChange(false)
            onSuccess?.()
        } catch (error) {
            console.error("Error deleting product:", error)
            toast.error("Failed to delete product. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Product</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete &quot;{product.title}&quot;? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
