"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ROUTES } from "@/constants/path"
import { CheckCircle, Wallet } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useWalletStore } from "@/stores/wallet-store"

export default function PaymentSuccess() {
     const router = useRouter()
     const searchParams = useSearchParams()
     const orderCode = searchParams.get('orderCode')
     const status = searchParams.get('status')
     const { fetchWallet } = useWalletStore()

     useEffect(() => {
          // Refetch wallet data to update balance
          fetchWallet()
     }, [fetchWallet])

     const handleBackToWallet = () => {
          router.push(ROUTES.WALLET)
     }

     return (
          <div className="min-h-screen flex items-center justify-center p-5 bg-muted/30">
               <Card className="max-w-md w-full">
                    <CardHeader className="text-center">
                         <div className="flex justify-center mb-4">
                              <CheckCircle className="h-20 w-20 text-green-500" />
                         </div>
                         <CardTitle className="text-2xl">Payment Successful!</CardTitle>
                         <CardDescription>
                              Your deposit has been processed successfully
                         </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                         <div className="bg-muted p-4 rounded-lg space-y-2">
                              {orderCode && (
                                   <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Order Code:</span>
                                        <span className="font-medium text-xs">{orderCode}</span>
                                   </div>
                              )}
                              {status && (
                                   <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Status:</span>
                                        <span className="font-medium uppercase text-green-600">{status}</span>
                                   </div>
                              )}
                         </div>

                         <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-4 rounded-lg">
                              <p className="text-sm text-green-800 dark:text-green-300">
                                   Your wallet balance has been updated. You can now use your funds.
                              </p>
                         </div>

                         <Button
                              className="w-full"
                              onClick={handleBackToWallet}
                              size="lg"
                         >
                              <Wallet className="mr-2 h-4 w-4" />
                              Back to Wallet
                         </Button>
                    </CardContent>
               </Card>
          </div>
     )
}
