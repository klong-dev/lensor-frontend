'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CreditCard, Download, Shield } from 'lucide-react'

interface OrderSummaryProps {
    subtotal: number
    itemCount: number
}

export function OrderSummary({ subtotal, itemCount }: OrderSummaryProps) {
    const total = subtotal

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
                            <span className="font-bold text-xl">{total.toLocaleString('vi-VN')} ₫</span>
                        </div>
                    </div>

                    <Button className="w-full" size="lg">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Proceed to Checkout
                    </Button>
                </CardContent>
            </Card>

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
