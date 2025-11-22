import { Skeleton } from "@/components/ui/skeleton"

export default function PostSkeleton() {
     return (
          <div className="p-2 sm:p-3 md:p-5 w-full max-w-[720px]">
               <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                    <Skeleton className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full" />
                    <div className="space-x-1 sm:space-x-2 flex">
                         <Skeleton className="h-3 sm:h-3.5 md:h-4 w-[80px] sm:w-[90px] md:w-[100px]" />
                         <Skeleton className="h-3 sm:h-3.5 md:h-4 w-[40px] sm:w-[45px] md:w-[50px]" />
                    </div>
               </div>
               <div className="mt-2 sm:mt-2.5 md:mt-3 space-y-1.5 sm:space-y-2">
                    <Skeleton className="h-3 sm:h-3.5 md:h-4 w-2/3 sm:w-1/2 md:w-1/3" />
                    <Skeleton className="h-3 sm:h-3.5 md:h-4 w-full" />
                    <Skeleton className="w-full aspect-[3/2] rounded-lg sm:rounded-xl mt-2" />
               </div>
          </div>
     )
}
