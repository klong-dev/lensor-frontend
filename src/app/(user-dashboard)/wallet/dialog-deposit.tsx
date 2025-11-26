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
import { Wallet } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function DialogDeposit({ children }: { children: React.ReactNode }) {
     const [amount, setAmount] = useState('')
     const [displayAmount, setDisplayAmount] = useState('')
     const [isLoading, setIsLoading] = useState(false)

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

     const handleDeposit = async () => {
          if (!amount || Number(amount) <= 0) {
               toast.error('Please enter a valid amount')
               return
          }

          const amountNumber = Number(amount)
          if (amountNumber < 5000) {
               toast.error('Minimum deposit amount is 5,000 VNĐ')
               return
          }

          setIsLoading(true)
          try {
               const result = await paymentApi.createPayos(amountNumber)

               if (result?.data?.paymentUrl) {
                    window.location.href = result.data.paymentUrl
               } else {
                    toast.error('Failed to get payment URL')
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
                              <div className="border rounded-lg p-4 bg-muted/50">
                                   <div className="flex items-center gap-3">
                                        <Wallet className="h-8 w-8 text-primary" />
                                        <div>
                                             <p className="font-medium">PayOS</p>
                                             <p className="text-xs text-muted-foreground">Secure payment via PayOS</p>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         <Button
                              className="w-full"
                              onClick={handleDeposit}
                              disabled={isLoading || !amount}
                         >
                              {isLoading ? 'Processing...' : 'Continue to Payment'}
                         </Button>
                    </div>
               </DialogContent>
          </Dialog>
     )
}
