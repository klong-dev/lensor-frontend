"use client"

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table-advanced'
import DialogDeposit from '@/app/(user-dashboard)/wallet/dialog-deposit'
import { useWallet, usePaymentHistory } from '@/lib/hooks/useWalletHooks'
import { useWalletStore } from '@/stores/wallet-store'
import { BanknoteArrowDown, Eye, EyeOff, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { transactionColumns, Transaction } from "./columns"

export default function Wallet() {
     const [hideBallance, setHideBallance] = useState(true)
     const { data: walletData, isLoading } = useWallet()
     const { data: historyData, isLoading: historyLoading } = usePaymentHistory(1, 20)
     const { walletData: storeWalletData, setWalletData } = useWalletStore()

     useEffect(() => {
          if (walletData?.data) {
               setWalletData(walletData.data)
          }
     }, [walletData, setWalletData])

     const balance = storeWalletData?.balance || walletData?.data?.balance || 0
     const formattedBalance = balance.toLocaleString('vi-VN')

     const transactions: Transaction[] = historyData?.data || []

     const handleWithdraw = async () => {
          // TODO: Implement withdraw logic
     }

     return (
          <div className='p-5'>
               {/* Balance Card */}
               <div className='bg-primary/15 w-full flex items-center justify-between py-8 px-12 rounded-2xl shadow-2xl border'>
                    <div className='flex flex-col gap-2'>
                         <div className='flex items-center gap-2'>
                              {isLoading ? (
                                   <span className='text-5xl font-bold tracking-tight text-balance pb-0.5 select-none'>
                                        Loading...
                                   </span>
                              ) : (
                                   <span className='text-5xl font-bold tracking-tight text-balance pb-0.5 select-none'>
                                        {hideBallance ? '*.***.***' : formattedBalance} ₫
                                   </span>
                              )}
                              <div className='cursor-pointer' onClick={() => setHideBallance(!hideBallance)}>
                                   {hideBallance ? <EyeOff /> : <Eye />}
                              </div>
                         </div>
                         <span className='select-none'>Current Wallet Ballance</span>
                    </div>

                    <div className='flex gap-3'>
                         <DialogDeposit>
                              <Button>
                                   <Plus />
                                   Deposit
                              </Button>
                         </DialogDeposit>

                         <Button variant='outline' onClick={handleWithdraw}>
                              <BanknoteArrowDown />
                              Withdraw
                         </Button>
                    </div>
               </div>

               {/* Transactions Table */}
               <div className='bg-accent w-full p-5 rounded-2xl shadow-2xl border mt-5'>
                    <h1 className='text-2xl font-bold mb-4'>Transaction History</h1>
                    {historyLoading ? (
                         <p className="text-muted-foreground text-sm">Loading transactions...</p>
                    ) : (
                         <DataTable
                              columns={transactionColumns}
                              data={transactions}
                              searchKey="description"
                              searchPlaceholder="Filter by description..."
                              pageSize={10}
                         />
                    )}
               </div>
          </div>
     )
}
