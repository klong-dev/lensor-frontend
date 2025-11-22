"use client"

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table-advanced'
import DialogDeposit from '@/app/(user-dashboard)/wallet/dialog-deposit'
import { useWallet, usePaymentHistory } from '@/lib/hooks/useWalletHooks'
import { useWalletStore } from '@/stores/wallet-store'
import { BanknoteArrowDown, Eye, EyeOff, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { transactionColumns } from "./columns"
import { Transaction } from '@/types/wallet'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/path'

export default function Wallet() {
     const [hideBallance, setHideBallance] = useState(true)
     const { data: walletData, isLoading } = useWallet()
     const { data: historyData, isLoading: historyLoading } = usePaymentHistory(1, 20)
     const { walletData: storeWalletData, setWalletData } = useWalletStore()
     const router = useRouter()

     useEffect(() => {
          if (walletData?.data) {
               setWalletData(walletData.data)
          }
     }, [walletData, setWalletData])

     const balance = storeWalletData?.balance || walletData?.data?.balance || 0

     const transactions: Transaction[] = historyData?.data || []

     const handleWithdraw = async () => {
          toast.info('System does not support user withdrawals yet. If you are a seller, please go to Sold Orders to withdraw funds from your completed sales.', {
               duration: 6000,
               action: {
                    label: 'Go to Sold Orders',
                    onClick: () => router.push(ROUTES.SOLD_ORDERS)
               }
          })
     }

     return (
          <div className='p-3 sm:p-5'>
               {/* Balance Card */}
               <div className='bg-primary/15 w-full flex flex-col sm:flex-row items-center justify-between py-6 sm:py-8 px-4 sm:px-12 rounded-2xl shadow-2xl border gap-4 sm:gap-0'>
                    <div className='flex flex-col gap-2 w-full sm:w-auto'>
                         <div className='flex items-center gap-2 justify-center sm:justify-start'>
                              {isLoading ? (
                                   <span className='text-3xl sm:text-5xl font-bold tracking-tight text-balance pb-0.5 select-none'>
                                        Loading...
                                   </span>
                              ) : (
                                   <span className='text-3xl sm:text-5xl font-bold tracking-tight text-balance pb-0.5 select-none'>
                                        {hideBallance ? '*******' : balance.toLocaleString('vi-VN')} ₫
                                   </span>
                              )}
                              <div className='cursor-pointer' onClick={() => setHideBallance(!hideBallance)}>
                                   {hideBallance ? <EyeOff className='h-5 w-5 sm:h-6 sm:w-6' /> : <Eye className='h-5 w-5 sm:h-6 sm:w-6' />}
                              </div>
                         </div>
                         <span className='select-none text-sm sm:text-base text-center sm:text-left'>Current Wallet Ballance</span>
                    </div>

                    <div className='flex gap-2 sm:gap-3 w-full sm:w-auto'>
                         <DialogDeposit>
                              <Button className='flex-1 sm:flex-none'>
                                   <Plus className='h-4 w-4' />
                                   Deposit
                              </Button>
                         </DialogDeposit>
                    </div>
               </div>

               {/* Transactions Table */}
               <div className='bg-accent w-full p-3 sm:p-5 rounded-2xl shadow-2xl border mt-3 sm:mt-5'>
                    <h1 className='text-xl sm:text-2xl font-bold mb-4'>Transaction History</h1>
                    <div className='overflow-x-auto'>
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
          </div>
     )
}
