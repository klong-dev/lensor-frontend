import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function MarketplaceSkeleton() {
    return (
        <div className="w-full">
            <div className='flex flex-col gap-8'>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div className='flex flex-col gap-2'>
                        <Skeleton className="w-full aspect-[3/2] rounded-xl mt-2" />
                        <div className='flex justify-start items-center gap-2'>
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Skeleton className="w-full aspect-[3/2] rounded-xl mt-2" />
                        <div className='flex justify-start items-center gap-2'>
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Skeleton className="w-full aspect-[3/2] rounded-xl mt-2" />
                        <div className='flex justify-start items-center gap-2'>
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Skeleton className="w-full aspect-[3/2] rounded-xl mt-2" />
                        <div className='flex justify-start items-center gap-2'>
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
