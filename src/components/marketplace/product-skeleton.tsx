import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function ProductSkeleton() {
    return (
        <div className="w-full">
            <div className='flex flex-col gap-8'>
                <div className='mt-8 grid grid-cols-14 gap-6'>
                    <div className='col-span-9 flex flex-col gap-2'>
                        <Skeleton className="w-full aspect-[3/2] h-[500px] rounded-xl mt-2" />
                    </div>
                    <div className='col-span-5 flex flex-col gap-6'>
                        <Skeleton className="w-full aspect-[3/2] h-10 rounded-xl mt-2" />
                        <div className='flex justify-start items-center gap-2'>
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-6 w-2/3" />
                        <div className='flex flex-col border-t pt-6 gap-2'>
                            <div className='flex gap-2'>
                                <Skeleton className="h-6 w-3/6" />
                                <Skeleton className="h-6 w-3/6" />
                            </div>
                            <div className='flex gap-2'>
                                <Skeleton className="h-6 w-4/6" />
                                <Skeleton className="h-6 w-2/6" />
                            </div>
                            <div className='flex gap-2'>
                                <Skeleton className="h-6 w-3/6" />
                                <Skeleton className="h-6 w-3/6" />
                            </div>
                        </div>
                        <div className='flex gap-4 mt-6'>
                            <Skeleton className="h-14 w-1/2" />
                            <Skeleton className="h-14 w-1/2" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
