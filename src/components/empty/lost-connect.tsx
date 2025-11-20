import {
     Avatar,
     AvatarFallback,
     AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
     Empty,
     EmptyContent,
     EmptyDescription,
     EmptyHeader,
     EmptyMedia,
     EmptyTitle,
} from "@/components/ui/empty"
import { useTranslations } from "next-intl"

export function LostConnect({ refecth }: { refecth: () => void }) {
     const t = useTranslations()
     return (
          <Empty>
               <EmptyHeader>
                    <EmptyMedia variant="default">
                         <Avatar className="size-12">
                              <AvatarImage
                                   src="https://github.com/shadcn.png"
                                   className="grayscale"
                              />
                              <AvatarFallback>LR</AvatarFallback>
                         </Avatar>
                    </EmptyMedia>
                    <EmptyTitle>Lost Connection</EmptyTitle>
                    <EmptyDescription>
                         Whoops ... no internet connection found. Check your connection
                    </EmptyDescription>
               </EmptyHeader>
               <EmptyContent>
                    <Button size="sm" variant='destructive' onClick={refecth}>Try Again</Button>
               </EmptyContent>
          </Empty>
     )
}
