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

interface DialogDepositProps {
     children: React.ReactNode
}

export default function DialogDeposit({ children }: DialogDepositProps) {
     const [amount, setAmount] = useState('')
     const [isLoading, setIsLoading] = useState(false)
     const [selectedMethod, setSelectedMethod] = useState<'paypal' | 'vnpay' | null>(null)

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
                    toast.success('Payment created successfully')
               }
          } catch (error) {
               console.error('Error creating payment:', error)
               toast.error('Failed to create payment')
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
                                   type="number"
                                   placeholder="Enter amount"
                                   value={amount}
                                   onChange={(e) => setAmount(e.target.value)}
                                   min="1000"
                                   step="1000"
                              />
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
