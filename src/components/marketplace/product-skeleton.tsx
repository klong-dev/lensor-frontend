import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function ProductSkeleton() {
    return (
        <div className="w-full">
            <div className='flex flex-col gap-4 sm:gap-8'>
                <div className='mt-3 flex flex-col lg:grid lg:grid-cols-14 gap-4 sm:gap-6'>
                    <div className='w-full flex flex-col gap-2'>
                        <Skeleton className="w-full aspect-video rounded-xl mt-2" />
                        <div className='flex gap-2'>
                            <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-md" />
                            <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-md" />
                            <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-md" />
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-4 sm:gap-6'>
                        <Skeleton className="h-8 sm:h-10 w-4/5 rounded-xl" />
                        <div className='flex justify-start items-center gap-2'>
                            <Skeleton className="h-7 w-7 sm:h-10 sm:w-10 rounded-full" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                        <Skeleton className="h-3 sm:h-4 w-2/3" />
                        <Skeleton className="h-5 sm:h-6 w-2/3" />
                        <div className='flex flex-col border-t pt-4 sm:pt-6 gap-2'>\n                            <div className='flex gap-2'>\n                                <Skeleton className="h-5 sm:h-6 w-3/6" />
                            <Skeleton className="h-5 sm:h-6 w-3/6" />
                        </div>
                            <div className='flex gap-2'>
                                <Skeleton className="h-5 sm:h-6 w-4/6" />
                                <Skeleton className="h-5 sm:h-6 w-2/6" />
                            </div>
                            <div className='flex gap-2'>
                                <Skeleton className="h-5 sm:h-6 w-3/6" />
                                <Skeleton className="h-5 sm:h-6 w-3/6" />
                            </div>
                        </div>
                        <div className='flex gap-2 sm:gap-4 mt-4 sm:mt-6'>
                            <Skeleton className="h-10 sm:h-14 w-1/2" />
                            <Skeleton className="h-10 sm:h-14 w-1/2" />
                        </div>
                        <Skeleton className="h-3 sm:h-4 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
