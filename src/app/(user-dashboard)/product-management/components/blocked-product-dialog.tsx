"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, MessageSquare } from "lucide-react"
import { BlockedProductDialogProps } from "@/types/marketplace"
import { ROUTES } from "@/constants/path"
import { useRouter } from "next/navigation"

export function BlockedProductDialog({ open, onOpenChange, productTitle }: BlockedProductDialogProps) {
    const router = useRouter()

    const handleContactSupport = () => {
        onOpenChange(false)
        router.push(ROUTES.SUPPORT)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                        <AlertTriangle className="h-5 w-5" />
                        <DialogTitle>Product Blocked</DialogTitle>
                    </div>
                    <DialogDescription className="space-y-3 text-left">
                        <p className="font-semibold text-foreground text-base">
                            {productTitle}
                        </p>
                        <p className="text-sm">
                            This product has been blocked by the administrator based on recent negative reports.
                        </p>
                        <p className="text-sm">
                            You cannot edit or manage this product while it is in blocked status.
                            Please contact support if you believe this action was taken in error.
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={handleContactSupport}
                        className="w-full sm:w-auto"
                    >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact Support
                    </Button>
                    <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                        I Understand
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
