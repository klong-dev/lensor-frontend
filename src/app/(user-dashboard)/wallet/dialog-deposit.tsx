import { Button } from "@/components/ui/button"
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { paymentApi } from "@/lib/apis/paymentApi"
import { CreditCard, Wallet } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function DialogDeposit({ children }: { children: React.ReactNode }) {
     const [amount, setAmount] = useState('')
     const [displayAmount, setDisplayAmount] = useState('')
     const [isLoading, setIsLoading] = useState(false)
     const [selectedMethod, setSelectedMethod] = useState<'paypal' | 'vnpay' | null>(null)

     const formatCurrency = (value: string): string => {
          // Remove all non-digit characters
          const numericValue = value.replace(/\D/g, '')
          if (!numericValue) return ''

          // Format with thousand separators
          const formatted = Number(numericValue).toLocaleString('vi-VN')
          return formatted
     }

     const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const rawValue = e.target.value.replace(/\D/g, '') // Keep only numbers
          setAmount(rawValue)
          setDisplayAmount(formatCurrency(rawValue))
     }

     const handleDeposit = async (method: 'paypal' | 'vnpay') => {
          if (!amount || Number(amount) <= 0) {
               toast.error('Please enter a valid amount')
               return
          }

          setIsLoading(true)
          try {
               const amountNumber = Number(amount)
               const orderInfo = `Deposit_${amountNumber.toLocaleString('vi-VN')}_VND_to_Lensor_wallet`
               let result

               if (method === 'paypal') {
                    result = await paymentApi.createPaypal(amountNumber, orderInfo)
                    if (result?.data?.url) {
                         window.location.href = result.data.url
                    }
               } else {
                    result = await paymentApi.createVnpay(amountNumber, orderInfo)
                    if (result?.data?.paymentUrl) {
                         window.location.href = result.data.paymentUrl
                    }
               }

               if (!result?.data?.url && !result?.data?.paymentUrl) {
                    toast.success('Deposit successful')
               }
          } catch (error) {
               console.error('Error creating payment:', error)
               toast.error('Deposit failed, please try again later')
          } finally {
               setIsLoading(false)
          }
     }

     return (
          <Dialog>
               <DialogTrigger asChild>{children}</DialogTrigger>

               <DialogContent className="max-w-md">
                    <DialogHeader>
                         <DialogTitle>Deposit Money</DialogTitle>
                         <DialogDescription>
                              Choose a payment method and enter the amount you want to deposit
                         </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                         <div className="space-y-2">
                              <Label htmlFor="amount">Amount (VNĐ)</Label>
                              <Input
                                   id="amount"
                                   type="text"
                                   placeholder="Enter amount"
                                   value={displayAmount}
                                   onChange={handleAmountChange}
                              />
                              <p className="text-xs text-muted-foreground">
                                   Minimum: 5,000 VNĐ
                              </p>
                         </div>

                         <div className="space-y-2">
                              <Label>Payment Method</Label>
                              <div className="grid grid-cols-2 gap-3">
                                   <Button
                                        variant={selectedMethod === 'paypal' ? 'default' : 'outline'}
                                        className="h-20 flex flex-col gap-2"
                                        onClick={() => setSelectedMethod('paypal')}
                                        type="button"
                                   >
                                        <CreditCard className="h-6 w-6" />
                                        <span>PayPal</span>
                                   </Button>

                                   <Button
                                        variant={selectedMethod === 'vnpay' ? 'default' : 'outline'}
                                        className="h-20 flex flex-col gap-2"
                                        onClick={() => setSelectedMethod('vnpay')}
                                        type="button"
                                   >
                                        <Wallet className="h-6 w-6" />
                                        <span>VNPay</span>
                                   </Button>
                              </div>
                         </div>

                         <Button
                              className="w-full"
                              onClick={() => selectedMethod && handleDeposit(selectedMethod)}
                              disabled={isLoading || !selectedMethod || !amount}
                         >
                              {isLoading ? 'Processing...' : 'Continue to Payment'}
                         </Button>
                    </div>
               </DialogContent>
          </Dialog>
     )
}
