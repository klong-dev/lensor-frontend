import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function MarketplaceSkeleton() {
    return (
        <div className="w-full">
            <div className='flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8'>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6">
                    <div className='flex flex-col gap-1.5 sm:gap-2'>
                        <Skeleton className="w-full aspect-[3/2] rounded-lg sm:rounded-xl" />
                        <div className='flex justify-start items-center gap-1 sm:gap-1.5 md:gap-2'>
                            <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full" />
                            <Skeleton className="h-3 sm:h-3.5 md:h-4 w-1/4 sm:w-1/3" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1.5 sm:gap-2'>
                        <Skeleton className="w-full aspect-[3/2] rounded-lg sm:rounded-xl" />
                        <div className='flex justify-start items-center gap-1 sm:gap-1.5 md:gap-2'>
                            <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full" />
                            <Skeleton className="h-3 sm:h-3.5 md:h-4 w-1/4 sm:w-1/3" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1.5 sm:gap-2'>
                        <Skeleton className="w-full aspect-[3/2] rounded-lg sm:rounded-xl" />
                        <div className='flex justify-start items-center gap-1 sm:gap-1.5 md:gap-2'>
                            <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full" />
                            <Skeleton className="h-3 sm:h-3.5 md:h-4 w-1/4 sm:w-1/3" />
                        </div>
                    </div>
                    <div className='hidden lg:flex flex-col gap-1.5 sm:gap-2'>
                        <Skeleton className="w-full aspect-[3/2] rounded-lg sm:rounded-xl" />
                        <div className='flex justify-start items-center gap-1 sm:gap-1.5 md:gap-2'>
                            <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full" />
                            <Skeleton className="h-3 sm:h-3.5 md:h-4 w-1/4 sm:w-1/3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
