"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ROUTES } from "@/constants/path"
import { XCircle, Wallet } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function PaymentFailed() {
     const router = useRouter()
     const searchParams = useSearchParams()
     const orderCode = searchParams.get('orderCode')
     const code = searchParams.get('code')
     const status = searchParams.get('status')
     const cancel = searchParams.get('cancel')

     const handleBackToWallet = () => {
          router.push(ROUTES.WALLET)
     }

     return (
          <div className="min-h-screen flex items-center justify-center p-5 bg-muted/30">
               <Card className="max-w-md w-full">
                    <CardHeader className="text-center">
                         <div className="flex justify-center mb-4">
                              <XCircle className="h-20 w-20 text-red-500" />
                         </div>
                         <CardTitle className="text-2xl">Payment Failed</CardTitle>
                         <CardDescription>
                              Your payment could not be processed
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
                              {code && (
                                   <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Error Code:</span>
                                        <span className="font-medium">{code}</span>
                                   </div>
                              )}
                              {status && (
                                   <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Status:</span>
                                        <span className="font-medium uppercase text-red-600">{status}</span>
                                   </div>
                              )}
                         </div>

                         <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-4 rounded-lg">
                              <p className="text-sm text-red-800 dark:text-red-300">
                                   {cancel === 'true'
                                        ? 'Payment was cancelled. You can try again when ready.'
                                        : 'The payment was not successful. Please try again or contact support if the problem persists.'}
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
