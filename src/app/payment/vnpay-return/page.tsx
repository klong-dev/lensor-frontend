"use client"

import { Card, CardContent } from "@/components/ui/card"
import { paymentApi } from "@/lib/apis/paymentApi"
import { useWalletStore } from "@/stores/wallet-store"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function VNPayReturn() {
     const router = useRouter()
     const searchParams = useSearchParams()
     const { fetchWallet } = useWalletStore()

     useEffect(() => {
          const processPayment = async () => {
               const vnp_Amount = searchParams.get('vnp_Amount')
               const vnp_BankCode = searchParams.get('vnp_BankCode')
               const vnp_BankTranNo = searchParams.get('vnp_BankTranNo')
               const vnp_CardType = searchParams.get('vnp_CardType')
               const vnp_OrderInfo = searchParams.get('vnp_OrderInfo')
               const vnp_PayDate = searchParams.get('vnp_PayDate')
               const vnp_ResponseCode = searchParams.get('vnp_ResponseCode')
               const vnp_TmnCode = searchParams.get('vnp_TmnCode')
               const vnp_TransactionNo = searchParams.get('vnp_TransactionNo')
               const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus')
               const vnp_TxnRef = searchParams.get('vnp_TxnRef')
               const vnp_SecureHash = searchParams.get('vnp_SecureHash')

               if (!vnp_ResponseCode || !vnp_TxnRef) return

               try {
                    const result = await paymentApi.vnpayCallback({
                         vnp_Amount: vnp_Amount || '',
                         vnp_BankCode: vnp_BankCode || '',
                         vnp_BankTranNo: vnp_BankTranNo || '',
                         vnp_CardType: vnp_CardType || '',
                         vnp_OrderInfo: vnp_OrderInfo || '',
                         vnp_PayDate: vnp_PayDate || '',
                         vnp_ResponseCode: vnp_ResponseCode,
                         vnp_TmnCode: vnp_TmnCode || '',
                         vnp_TransactionNo: vnp_TransactionNo || '',
                         vnp_TransactionStatus: vnp_TransactionStatus || '',
                         vnp_TxnRef: vnp_TxnRef,
                         vnp_SecureHash: vnp_SecureHash || ''
                    })

                    if (result?.data?.success) {
                         // Cập nhật lại số dư ví sau khi thanh toán thành công
                         await fetchWallet()
                         router.push(`/payment/success?orderId=${vnp_TxnRef}`)
                    } else {
                         router.push(`/payment/failed?orderId=${vnp_TxnRef}&code=${vnp_ResponseCode}`)
                    }
               } catch (error) {
                    console.log('Payment error:', error)
                    router.push(`/payment/failed?orderId=${vnp_TxnRef}&code=${vnp_ResponseCode}`)
               }
          }

          processPayment()
     }, [searchParams, router])

     return (
          <div className="min-h-screen flex items-center justify-center p-5 bg-muted/30">
               <Card className="max-w-md w-full">
                    <CardContent className="py-12">
                         <div className="text-center space-y-4">
                              <div className="flex justify-center">
                                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                              </div>
                              <p className="text-muted-foreground">Processing payment...</p>
                         </div>
                    </CardContent>
               </Card>
          </div>
     )
}


