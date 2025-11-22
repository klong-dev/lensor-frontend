'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { orderApi } from '@/lib/apis/orderApi'
import { useWallet } from '@/lib/hooks/useWalletHooks'
import { AlertCircle, CreditCard, Download, Shield, Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface OrderSummaryProps {
    subtotal: number
    itemCount: number
    selectedCartItemIds: string[]
    onCheckoutSuccess?: () => void
    disabled?: boolean
}

export function OrderSummary({ subtotal, itemCount, selectedCartItemIds, onCheckoutSuccess, disabled = false }: OrderSummaryProps) {
    const router = useRouter()
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [showCheckoutDialog, setShowCheckoutDialog] = useState(false)
    const { data: walletData, isLoading: isLoadingWallet } = useWallet()

    const walletBalance = parseFloat(walletData?.data?.balance || '0')
    const remainingBalance = walletBalance - subtotal
    const hasInsufficientFunds = remainingBalance < 0

    const handleOpenCheckoutDialog = () => {
        if (itemCount === 0) {
            toast.error('Your cart is empty')
            return
        }
        setShowCheckoutDialog(true)
    }

    const handleCheckout = async () => {
        setIsCheckingOut(true)
        setShowCheckoutDialog(false)

        try {
            const response = await orderApi.checkout(selectedCartItemIds)

            if (response.data) {
                toast.success('Order placed successfully!')
                await onCheckoutSuccess?.()
                router.push('/purchased-presets')
            } else {
                toast.error(response.message || 'Checkout failed')
            }
        } catch (error) {
            console.error('Checkout failed:', error)
            const errorMessage = (error as any)?.response?.data?.message
                || (error as Error)?.message
                || 'Failed to complete checkout. Please check your wallet balance.'
            toast.error(errorMessage)
        } finally {
            setIsCheckingOut(false)
        }
    }

    return (
        <div className="space-y-6">

            <Card>
                <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Order Summary</h3>

                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                            <span className="font-medium">{subtotal.toLocaleString('vi-VN')} ₫</span>
                        </div>
                    </div>

                    <div className="border-t pt-4 mb-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg">Total</span>
                            <span className="font-bold text-xl">{subtotal.toLocaleString('vi-VN')} ₫</span>
                        </div>
                    </div>

                    <Button
                        className="w-full"
                        size="lg"
                        onClick={handleOpenCheckoutDialog}
                        disabled={isCheckingOut || itemCount === 0 || disabled}
                    >
                        <CreditCard className="mr-2 h-4 w-4" />
                        {isCheckingOut ? 'Processing...' : disabled ? 'Select Items to Checkout' : 'Proceed to Checkout'}
                    </Button>
                </CardContent>
            </Card>

            <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirm Checkout</DialogTitle>
                        <DialogDescription>
                            Review your order details before proceeding
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Wallet className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Current Balance</span>
                            </div>
                            <span className="font-semibold text-lg">
                                {walletBalance.toLocaleString('vi-VN')} ₫
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Items ({itemCount})</span>
                                <span>{subtotal.toLocaleString('vi-VN')} ₫</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-semibold">
                                <span>Total Amount</span>
                                <span className="text-lg">{subtotal.toLocaleString('vi-VN')} ₫</span>
                            </div>
                        </div>

                        <div className={`flex items-center justify-between p-4 rounded-lg border-2 ${hasInsufficientFunds
                            ? 'bg-destructive/10 border-destructive'
                            : 'bg-green-50 dark:bg-green-950 border-green-500 dark:border-green-800'
                            }`}>
                            <div className="flex items-center gap-2">
                                {hasInsufficientFunds && <AlertCircle className="h-5 w-5 text-destructive" />}
                                <span className={`font-medium ${hasInsufficientFunds ? 'text-destructive' : ''}`}>
                                    {hasInsufficientFunds ? 'Insufficient Funds' : 'Balance After Purchase'}
                                </span>
                            </div>
                            <span className={`font-bold text-lg ${hasInsufficientFunds
                                ? 'text-destructive'
                                : 'text-green-600 dark:text-green-400'
                                }`}>
                                {remainingBalance.toLocaleString('vi-VN')} ₫
                            </span>
                        </div>

                        {hasInsufficientFunds && (
                            <p className="text-sm text-destructive text-center">
                                Please add funds to your wallet to complete this purchase
                            </p>
                        )}
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowCheckoutDialog(false)}
                            disabled={isCheckingOut}
                        >
                            Cancel
                        </Button>
                        {hasInsufficientFunds && (
                            <Button
                                onClick={() => {
                                    setShowCheckoutDialog(false)
                                    router.push('/wallet')
                                }}
                            >
                                Add Funds
                            </Button>
                        )}
                        <Button
                            onClick={handleCheckout}
                            disabled={isCheckingOut || hasInsufficientFunds || isLoadingWallet}
                        >
                            {isCheckingOut ? 'Processing...' : 'Confirm Purchase'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start gap-3">
                        <Download className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-sm">Instant Download</h4>
                            <p className="text-xs text-muted-foreground">Access your presets immediately after purchase</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-sm">Lifetime Access</h4>
                            <p className="text-xs text-muted-foreground">Download anytime from your library</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <div className="text-center p-4 rounded-lg">
                    <p className="text-sm italic text-muted-foreground">
                        &quot;Professional presets that transform your photos instantly.&quot;
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">— Lensor Community</p>
                </div>
            </Card>
        </div>
    )
}
