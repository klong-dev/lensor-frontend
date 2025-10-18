import { Skeleton } from "@/components/ui/skeleton"

export default function PostSkeleton() {
     return (
          <div className="p-5 w-[720px]">
               <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-x-2 flex">
                         <Skeleton className="h-4 w-[100px]" />
                         <Skeleton className="h-4 w-[50px]" />
                    </div>
               </div>
               <div className="mt-3 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="w-full aspect-[3/2] rounded-xl mt-2" />
               </div>
          </div>
     )
}
